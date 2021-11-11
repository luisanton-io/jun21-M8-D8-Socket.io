import express from 'express'
import { UserModel } from './model';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Missing email or password');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new UserModel({ email, password: hashedPassword });

    await user.save()

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })

    res.status(201).send({ user, token });

})

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) throw new Error('Missing email or password')

        const user = await UserModel.findOne({ email })

        if (!user) { throw new Error('No valid email/password match') }

        const isMatch = bcrypt.compare(password, user.password)

        if (!isMatch) { throw new Error('No valid email/password match') }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
        res.status(200).send({ token })
    } catch (error: unknown) {
        res.status(401).send((error as Error).message);
    }
})

userRouter.get('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)

    if (user) {
        res.send(200).send(user)
    } else {
        res.status(404).send()
    }
})

export default userRouter