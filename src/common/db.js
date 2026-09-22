import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://christianmedina_db_user:oRWF0BNqiup2TaBo@cluster-express.1iohwgj.mongodb.net/';

export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
}); 