import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URI || '';

let connectDB: Promise<MongoClient>

if(process.env.NODE_ENV === 'development') {
    //개발 중 재실행 방지
    if(!global._mongo) {
        global._mongo = new MongoClient(url).connect()
    }
    connectDB = global._mongo
} else {
    connectDB = new MongoClient(url).connect();
}

// DB 초기 설정
connectDB.then(async (client) => {
    const db = client.db(process.env.DB_NAME);

    //TTL
    await db.collection('users').createIndex(
        { id: 1 },
        { unique: true }
    );

    await db.collection('payments_temp').createIndex(
        { createdAt: 1 }, 
        { 
            expireAfterSeconds: 7200, // 만료 시간 (2시간)
        }
    );
});

export {connectDB};