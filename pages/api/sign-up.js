import { connectToDatabase } from "../../utils/mongodb";
import UserDB from '../../models/user-model';
import Bcrypt from 'bcryptjs';

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        const { db } = await connectToDatabase();

        //Getting email and password from body
        const { email, password } = req.body;
        
        //Validate
        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        
        //Check existing 
        const userExists = await db.collection('user').findOne({email: email});
        console.log('checkExisting',userExists);
        if (userExists) {
            res.status(422).json({ message: 'User already exists' });
            return;
        }
        
        // !!!!! Hash password !!!!! 
        const newUser = await db.collection('user').insertOne({email: email, password: Bcrypt.hashSync(password, 10)});

        //Send success response
        res.status(201).json({ message: 'User created' });
        //Close DB connection
         
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;