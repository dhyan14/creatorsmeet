import mongoose from 'mongoose';

interface CachedMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: CachedMongoose;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize the cached connection
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (global.mongoose.conn) {
    // Check if the connection is still alive
    if (global.mongoose.conn.connection.readyState === 1) {
      return global.mongoose.conn;
    }
    // If connection is not alive, reset it
    global.mongoose.conn = null;
    global.mongoose.promise = null;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        mongoose.connection.on('error', (err) => {
          console.error('MongoDB connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
          console.warn('MongoDB disconnected');
          global.mongoose.conn = null;
          global.mongoose.promise = null;
        });
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        global.mongoose.promise = null;
        throw err;
      });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
  } catch (e) {
    global.mongoose.promise = null;
    console.error('Failed to establish MongoDB connection:', e);
    throw e;
  }

  return global.mongoose.conn;
}

export default dbConnect;

// Export a function to get the current connection status
export function getConnectionStatus() {
  if (!global.mongoose.conn) return 'Not connected';
  return ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'][global.mongoose.conn.connection.readyState];
} 