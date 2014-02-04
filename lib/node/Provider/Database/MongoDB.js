var MongoClient = require('mongodb').MongoClient;
var MongoDB = require('mongodb').Db;
var ObjectID = require('mongodb').ObjectID;

var thunky = require('thunky');

var Database = function(conf) {
    var getConnection = thunky(function(callback) {
        // Connect to database
        MongoClient.connect(conf.uri, {
            server: {
                ssl: conf.ssl,
                sslValidate: conf.sslValidate,
                sslCA: conf.sslCA,
                sslCert: conf.sslCert,
                sslKey: conf.sslKey,
                sslPass: conf.sslPass
            }
        }, function(err, db) {
            if (err) throw new Error(err);

            console.log('[D] Connected to database.');

            callback(null, db);
        });
    });

    this.find = function(name, id, callback) {
        getConnection(function(err, db) {
            // Get collection
            db.collection(name, function(err, collection) {
                // Find id in collection
                collection.findOne({ _id: new ObjectID(id) }, function(err, entity) {
                    if (err) throw new Error(err);

                    entity.id = entity._id;
                    delete entity._id;

                    if (callback !== undefined) {
                        callback(null, entity);
                    }
                });
            });
        });
    };

    this.save = function(name, entity, callback) {
        getConnection(function(err, db) {
            db.collection(name, function(err, collection) {
                entity._id = entity.id;
                delete entity.id;

                collection.save(entity, { safe: true }, function(err, response) {
                    if (err) throw new Error(err);

                    if (response === 1) {
                        console.log('[D] Update row "' + entity._id + '" in "' + name + '"');
                    } else {
                        console.log('[D] Create row in "' + name + '" with id "' + response._id + '"');
                        entity = response;
                    }

                    entity.id = entity._id;
                    delete entity._id;

                    if (callback !== undefined) {
                        callback(null, entity);
                    }
                });
            });
        });
    };

    this.remove = function(name, entity, callback) {
        getConnection(function(err, db) {
            db.collection(name, function(err, collection) {
                collection.remove({ _id: new ObjectID(entity.id) }, { safe: true }, function(err, response) {
                    if (err) throw new Error(err);

                    console.log('[D] Remove row id "' + response._id + '" in "' + name + '"');

                    if (callback !== undefined) {
                        callback(null, response);
                    }
                });
            });
        });
    };
};

module.exports = Database;
module.exports.prototype = new (require('./Database'))();