import 'reflect-metadata';
import {Connection} from 'typeorm';
import connectDB from './connectDB';

let db: Connection;

beforeAll(async () => {
  db = await connectDB();
  await db.synchronize(true);
});

beforeEach(async () => {
  if (!db.isConnected) {
    db = await connectDB();
  }
  await db.synchronize(true);
});

afterEach(async () => {
  jest.clearAllMocks();
});

afterAll(async () => {
  if (db && db.isConnected) {
    await db.synchronize(true);
    await db.close();
  }
});
