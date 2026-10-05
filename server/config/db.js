import mongoose from 'mongoose';
import dns from 'dns';

let isConnected = false;

// Configure public DNS servers to resolve MongoDB Atlas SRV records reliably
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr) {
  // Non-fatal if runtime does not permit custom DNS servers
}

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoURI) {
    console.warn('⚠️  [MongoDB] No MONGODB_URI found in environment variables (.env).');
    return false;
  }

  // Safe URI for logging without exposing credentials
  const sanitizedURI = mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');

  try {
    console.log(`📡 [MongoDB] Attempting connection to Atlas cluster...`);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 8000,
    });

    isConnected = true;
    console.log(`✅ [MongoDB Atlas] Connected successfully!`);
    console.log(`   Host:     ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ [MongoDB Atlas] Connection failed: ${error.message}`);
    console.warn(`   Target:   ${sanitizedURI}`);
    console.log('ℹ️  Operating in resilient in-memory mode so operations continue.');
    isConnected = false;
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isConnected || mongoose.connection.readyState === 1,
  host: mongoose.connection?.host || null,
  database: mongoose.connection?.name || 'study-resource-finder-1',
  mode: (isConnected || mongoose.connection.readyState === 1)
    ? 'MongoDB Atlas (Connected)'
    : 'Offline / In-Memory'
});
