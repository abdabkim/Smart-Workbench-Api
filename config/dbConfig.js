const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const db = await mongoose.connect(process.env.DATABASE_URL);

        console.log(`Database running on ${db.connection.host}`);
    } catch(error) {
        next(error.message);
    }
}

module.exports = dbConnect;