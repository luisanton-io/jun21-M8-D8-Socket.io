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

const validCredentials = {
    email: "hello@luisanton.io",
    password: "password"
}

describe("Testing the endpoints", () => {

    beforeAll(done => {
        mongoose.connect(process.env.MONGO_TEST_URL!).then(() => {
            console.log('Connected to Mongo')
            done()
        })
    })

    it("should test that sending valid credentials the POST /users/register is creating a new account", async () => {
        const response = await request.post("/users/register").send(validCredentials)

        console.log(response.body)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("token")

        expect(jwt.verify(response.body.token, process.env.JWT_SECRET!)).toHaveProperty("_id")

    })

    afterAll(done => {
        mongoose.connection.dropDatabase()
            .then(() => {
                return mongoose.connection.close()
            })
            .then(() => done())
    })
})