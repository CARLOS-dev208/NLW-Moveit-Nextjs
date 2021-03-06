import { MongoClient, Db } from "mongodb";
import { NowRequest, NowResponse } from "@vercel/node";
import url from "url";

let cachedDb: Db = null;

async function connectToDataBase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);
  cachedDb = db;

  return db;
}

export default async (request: NowRequest, response: NowResponse) => {
  const db = await connectToDataBase(process.env.MONGODB_URI);

  const { user_id } = request.body;

  const collection = db.collection("challenges");

  const user = await collection.findOne({ user_id: user_id });

  try {
    if (!user) {
      await collection.insertOne({ ...request.body });
      return response.json({ status: "created" });
    } else {
      await collection.updateOne(
        { user_id: user_id },
        { $set: { ...request.body } }
      );
      return response.json({ status: "updated" });
    }
  } catch (erro) {
    console.log("erro", erro);
    return response.status(400).json({ erro: erro.message });
  }
};
