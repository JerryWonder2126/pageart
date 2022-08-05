import {pgPool} from '../db';

export class BaseModel {
  async queryDB(query: string) {
    const newClient = await pgPool.connect();
    const response = await newClient.query(query);
    newClient.release();
    return response;
  }
}
