const mongoose = require("mongoose")

const connectdb = async () => {
    try {
        if (!process.env.surl) {
            throw new Error("MongoDB connection string not configured");
        }
        
        const conn = await mongoose.connect(process.env.surl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (e) {
        console.error('Database connection failed:', e);
        process.exit(1); 
    }
};

module.exports = connectdb