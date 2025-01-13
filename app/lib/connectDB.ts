import mongoose from 'mongoose';

const MONGO_URI: string = process.env.MONGODB_URI ?? "";

if (!MONGO_URI) {
  throw new Error('MONGODB_URI is not set');
}

const globalWithMongoose = global as typeof global & { mongoose?: { conn: mongoose.Mongoose | null, promise: Promise<mongoose.Mongoose> | null } };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

async function connectDB() {
  console.log('connectDB called');
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;