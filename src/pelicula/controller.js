import { client } from '../common/db.js';
import { ObjectId } from 'mongodb';

// Constante que nos permite acceder a la base de datos cine-db
const peliculaCollection = client.db('cine-db').collection('peliculas');

// POST
export const handleInsertPeliculaRequest = async (req, res) => {
    let data = req.body;
    
    await peliculaCollection.insertOne(data)
        .then((result) => {
            if (result.acknowledged) {
                return res.status(201).send({ message: 'Película insertada con éxito', id: result.insertedId });
            }
            return res.status(500).send({ message: 'Error al insertar la película' });
        })
        .catch((error) => {
            return res.status(500).send({ error: error.message });
        });
};

// GET
export const handleGetPeliculasRequest = async (req, res) => {
    await peliculaCollection.find().toArray()
        .then((peliculas) => {
            return res.status(200).send(peliculas);
        })
        .catch((error) => {
            return res.status(500).send({ error: error.message });
        });
};

// GET por ID
export const handleGetPeliculaByIdRequest = async (req, res) => {
    let id = req.params.id;

    try {
        let objectId = ObjectId.createFromHexString(id);
        
        await peliculaCollection.findOne({ _id: objectId })
            .then((pelicula) => {
                if (pelicula) {
                    return res.status(200).send(pelicula);
                }
                return res.status(404).send({ message: 'Película no encontrada' });
            })
            .catch((error) => {
                return res.status(500).send({ error: error.message });
            });
    } catch (error) {
        return res.status(400).send({ message: 'Id mal formado' });
    }
};

// PUT/UPDATE
export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    let id = req.params.id;
    let data = req.body;

    try {
        let objectId = ObjectId.createFromHexString(id);
        
        await peliculaCollection.updateOne({ _id: objectId }, { $set: data })
            .then((result) => {
                if (result.matchedCount > 0) {
                    return res.status(200).send({ message: 'Película actualizada con éxito' });
                }
                return res.status(404).send({ message: 'Película no encontrada' });
            })
            .catch((error) => {
                return res.status(500).send({ error: error.message });
            });
    } catch (error) {
        return res.status(400).send({ message: 'Id mal formado' });
    }
};

// DELETE
export const handleDeletePeliculaByIdRequest = async (req, res) => {
    let id = req.params.id;

    try {
        let objectId = ObjectId.createFromHexString(id);
        
        await peliculaCollection.deleteOne({ _id: objectId })
            .then((result) => {
                if (result.deletedCount > 0) {
                    return res.status(200).send({ message: 'Película eliminada con éxito' });
                }
                return res.status(404).send({ message: 'Película no encontrada' });
            })
            .catch((error) => {
                return res.status(500).send({ error: error.message });
            });
    } catch (error) {
        return res.status(400).send({ message: 'Id mal formado' });
    }
};