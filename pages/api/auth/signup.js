// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from 'bcryptjs';
import nextConnect from 'next-connect';
import dbMiddleware from '../../../middlewares/mongodb-connect';

const handler = nextConnect();

handler.use(dbMiddleware);

handler.post(async (req, res) => {
  const { name, email, password } = req.body
  console.log(req.body)

  // Check if user already exists
  let existingUser = await req.db.collection('Users').findOne({ email })
  if(existingUser) {
    return res.status(400).json({ status: false, message: 'User already exists' })
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Save new user
  const newUser = await req.db.collection('Users').insertOne({ name, email, hashedPassword })
  
  res.status(200).json({ status: true, data: newUser, message: 'User created successfully' })
})

export default handler
