/**
 * Egypt America Center - Live MongoDB Serverless API for Vercel
 */
const { MongoClient } = require("mongodb");

const defaultUri = "mongodb+srv://yehiarashed2004_db_user:kbXa2ww9NAXVMZY5@cluster0.bimlrnx.mongodb.net/?appName=Cluster0";

function getMongoUri() {
  const envUri = (process.env.MONGODB_URI || "").trim();
  if (envUri.startsWith("mongodb://") || envUri.startsWith("mongodb+srv://")) {
    return envUri;
  }
  return defaultUri;
}

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  const uri = getMongoUri();
  const client = new MongoClient(uri, {
    connectTimeoutMS: 15000,
    socketTimeoutMS: 15000,
    serverSelectionTimeoutMS: 15000,
    tls: true,
    retryWrites: true
  });
  await client.connect();
  cachedClient = client;
  return client;
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("egypt_american_db");
    const collection = db.collection("products");

    if (req.method === "GET") {
      const products = await collection.find({}).toArray();
      return res.status(200).json(products);
    } 
    
    if (req.method === "POST" || req.method === "PUT") {
      const products = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (Array.isArray(products)) {
        await collection.deleteMany({});
        if (products.length > 0) {
          // Remove internal _id field before inserting to prevent immutable _id errors
          const cleanProds = products.map(p => {
            const copy = { ...p };
            delete copy._id;
            return copy;
          });
          await collection.insertMany(cleanProds);
        }
      }
      return res.status(200).json({ success: true, count: products ? products.length : 0 });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("MongoDB API error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};
