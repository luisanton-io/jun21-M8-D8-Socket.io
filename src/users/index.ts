import express from 'express'
import { UserModel } from './model';
import jwt from "jsonwebtoken"

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Missing email or password');
    }

    const user = new UserModel({ email, password });

    await user.save()

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })

    res.status(201).send({ user, token });

})

export default userRouter