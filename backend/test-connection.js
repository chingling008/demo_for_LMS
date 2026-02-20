import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testConnection() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
    console.log(`📊 Database: lms_portal`);
    console.log(`🌍 Cluster: cluster0.xcujjcv.mongodb.net`);
    
    // List databases
    const databasesList = await client.db().admin().listDatabases();
    console.log("\n📁 Available databases:");
    databasesList.databases.forEach(db => console.log(`   - ${db.name}`));
    
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("\n🔒 Connection closed");
  }
}

testConnection().catch(console.dir);
