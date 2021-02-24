const mongoose = require('mongoose')

const activeConn = async () => {
    console.log('CONNECTING...', mongoose.connection.readyState)
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        socketTimeoutMS: 100,
        keepAlive: true,
        autoReconnect: true,
        reconnectTries: 50,
        reconnectInterval: 500
        }, err => {
        if (!err) console.log('CONNECTED TO MONGODB SUCCESSFULLY 👍');
            console.log(err);
        }
    );
}

module.exports = activeConn()
