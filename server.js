import express from 'express';
import cors from 'cors';
import { client } from './src/common/db.js';

// Importamos Rutas solicitadas
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ruta por defecto solicitada
app.get('/', (req, res) => {
    res.status(200).send('Bienvenido al cine Iplacex');
});

// Configuramos rutas personalizadas
app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

// Lógica de conexión a MongoDB Atlas y levantamiento del servidor
await client.connect()
    .then(() => {
        console.log('Conexión exitosa a clúster de MongoDB Atlas');
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo con éxito en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error al intentar conectar con MongoDB Atlas:', error);
    });