import mongoose from 'mongoose';
import nextConnect from 'next-connect';

// Initialize next middleware
const middleware = nextConnect();

// Use new db connection
const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
});

const database = async (req, res, next) => {
    if (!db.isConnected()) await db.connect();
    req.dbClient = client;
    req.db = client.db('MCT');
    return next();
}

middleware.use(database);

export default middleware;