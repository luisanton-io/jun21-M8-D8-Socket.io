import dotenv from "dotenv"
dotenv.config()

import { app } from "../app"
import supertest from "supertest"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const request = supertest(app)

describe("Testing the testing environment", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    })
})

describe("Testing the endpoints", () => {

    beforeAll(done => {
        mongoose.connect(process.env.MONGO_TEST_URL!).then(() => {
            console.log('Connected to Mongo')
            done()
        })
    })

    const validCredentials = {
        email: "hello@luisanton.io",
        password: "password"
    }

    it("should test that sending valid credentials the POST /users/register is creating a new account", async () => {
        const response = await request.post("/users/register").send(validCredentials)

        console.log(response.body)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("token")


        const { _id } = jwt.verify(response.body.token, process.env.JWT_SECRET!) as any as { _id: string }
        expect(_id).toBe(response.body.user._id)
    })

    it("should test that sending a registered user credentials is returning a valid token", async () => {
        const response = await request.post("/users/login").send(validCredentials)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")

        expect(jwt.verify(response.body.token, process.env.JWT_SECRET!)).toHaveProperty("_id")
    })

    const unregisteredUser = {
        email: "diego@strive.school",
        password: "password"
    }

    it("should test that sending unregistered user credentials is returning a 401", async () => {
        const response = await request.post("/users/login").send(unregisteredUser)

        expect(response.status).toBe(401)
    })

    afterAll(done => {
        // mongoose.connection.close().then(() => { done() })

        mongoose.connection.dropDatabase()
            .then(() => {
                return mongoose.connection.close()
            })
            .then(() => done())
    })
})