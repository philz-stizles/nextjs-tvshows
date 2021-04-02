// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs';
import nextConnect from 'next-connect';
// import connectDB from '../../../middlewares/db';
// import User from '../../../models/User';
import dbMiddleware from '../../../middlewares/mongodb-connect';

const handler = nextConnect();

handler.use(dbMiddleware);

handler.post(async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    // Generate token
    const token = jwt.sign({ id: uuidv4 }, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '30m'})

    res.status(200).json({ token: token })
})

export default handler
