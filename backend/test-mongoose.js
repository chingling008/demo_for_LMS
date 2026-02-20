import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testMongooseConnection = async () => {
  try {
    console.log('🔄 Testing MongoDB connection with Mongoose...');
    console.log(`📍 URI: ${process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📊 Host: ${conn.connection.host}`);
    console.log(`💾 Database: ${conn.connection.name}`);
    console.log(`🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Get database stats
    const stats = await conn.connection.db.stats();
    console.log(`\n📈 Database Stats:`);
    console.log(`   - Collections: ${stats.collections}`);
    console.log(`   - Data Size: ${(stats.dataSize / 1024).toFixed(2)} KB`);
    console.log(`   - Storage Size: ${(stats.storageSize / 1024).toFixed(2)} KB`);
    
    await mongoose.connection.close();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
};

testMongooseConnection();
