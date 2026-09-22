import { client } from '../common/db.js';
import { ObjectId } from 'mongodb';

// Constante que nos permite acceder a las colecciones
const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('peliculas');

// POST
export const handleInsertActorRequest = async (req, res) => {
    let data = req.body;

    try {
        let peliculaObjectId = ObjectId.createFromHexString(data.idPelicula);
        let peliculaExistente = await peliculaCollection.findOne({ _id: peliculaObjectId });

        if (!peliculaExistente) {
            return res.status(404).send({ message: 'La película asignada no existe en el registro' });
        }

        await actorCollection.insertOne(data)
            .then((result) => {
                if (result.acknowledged) {
                    return res.status(201).send({ message: 'Actor insertado con éxito', id: result.insertedId });
                }
                return res.status(500).send({ message: 'Error al insertar el actor' });
            })
            .catch((error) => {
                return res.status(500).send({ error: error.message });
            });

    } catch (error) {
        return res.status(400).send({ message: 'El formato de idPelicula es inválido' });
    }
};

// GET
export const handleGetActoresRequest = async (req, res) => {
    await actorCollection.find().toArray()
        .then((actores) => {
            return res.status(200).send(actores);
        })
        .catch((error) => {
            return res.status(500).send({ error: error.message });
        });
};

// GET por ID
export const handleGetActorByIdRequest = async (req, res) => {
    let id = req.params.id;

    try {
        let objectId = ObjectId.createFromHexString(id);
        
        await actorCollection.findOne({ _id: objectId })
            .then((actor) => {
                if (actor) {
                    return res.status(200).send(actor);
                }
                return res.status(404).send({ message: 'Actor no encontrado' });
            })
            .catch((error) => {
                return res.status(500).send({ error: error.message });
            });
    } catch (error) {
        return res.status(400).send({ message: 'Id mal formado' });
    }
};

export const handleGetActoresByPeliculaRequest = async (req, res) => {
    let idPelicula = req.params.pelicula;

    await actorCollection.find({ idPelicula: idPelicula }).toArray()
        .then((actores) => {
            return res.status(200).send(actores);
        })
        .catch((error) => {
            return res.status(500).send({ error: error.message });
        });
};