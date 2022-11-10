const mongoose = require('mongoose');
const chalk = require('chalk');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://wayne:94sp!5pFW*gjchF@node-single-cluster-klcag.gcp.mongodb.net/education?authSource=admin&replicaSet=node-single-cluster-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true';
const connection = mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});
connection.then((db) => {
        console.log('connect to:', uri);
        console.log(
            chalk.green('Successfully connected to MongoDB' +
                'cluster in Dev Mode'));
        return db;
    })
    .catch((err) => {
        if (err.message.code === 'ETIMEDOUT') {
            console.log('Attempting to re-establish database connection.');
            mongoose.connect(uri);
        } else {
            console.log('Error while attempting to connect to database:');
            console.log(err);
        }
    });
module.exports = connection;
