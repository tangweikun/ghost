require('dotenv').config();

import { MongoClient } from 'mongodb';

// test for conect mongo
export async function getDataFromMongo() {
  let result = [];

  await MongoClient.connect(process.env.MONGO_URL).then(async (db) => {
    result = await db.collection('soap').find().toArray();
    console.log('--->', result);
    db.close();
  }).catch(error => console.error(error));

  return result;
}
