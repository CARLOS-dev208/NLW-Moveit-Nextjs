import {MongoClient, Db} from 'mongodb';
import {NowRequest, NowResponse} from '@vercel/node';
import url from 'url';

let cachedDb: Db = null;

async function connectToDataBase(uri:string) {
    if(cachedDb){
      return cachedDb;
    }

    const client = await MongoClient.connect(uri,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    });

    const dbName = url.parse(uri).pathname.substr(1);

   const db = client.db(dbName);
   cachedDb = db;

   return db;
}

export default async (request:NowRequest, response:NowResponse) =>{
  const db = await connectToDataBase(process.env.MONGODB_URI);

  const {user_id} = request.query

  const userCollection = db.collection('challenges');

  const user = await userCollection.findOne({ user_id: user_id })

  if (user) {
    const { level, currentExperience, challengesComplited } = user

    return response.json({ 
      level,
      currentExperience, 
      challengesComplited 
    });
  } else {
    return response.json({ 
      level: 1,
      currentExperience: 0, 
      challengesComplited: 0
      
    });
  }

}