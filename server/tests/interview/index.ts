import supertest from 'supertest';
import express, { json } from 'express';
import router from '../../interview/routes/interviewRoutes';
import { MongoDBContainer } from 'testcontainers';
import { Types, connect, isValidObjectId, mongo } from 'mongoose';
import { afterAll, beforeAll } from 'vitest';

export async function setupMongoConnection() {
    const mongoDb = await new MongoDBContainer('mongodb/mongodb-community-server:6.0-ubi8')
        .withLogConsumer(stream => stream.pipe(process.stdout))
        .start();

    beforeAll(async () => {
        await connect(mongoDb.getConnectionString(), { directConnection: true, });
    });

    afterAll(async () => {
        await mongoDb.stop();
    });

    return {
        createId: () => new Types.ObjectId(),
        isValidId: isValidObjectId
    };
}

export function createServer() {
    const app = express()
        .use(json())
        .use('/', router);

    return supertest(app.listen());
}