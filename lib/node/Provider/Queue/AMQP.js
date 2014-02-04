var amqp = require('amqp');

var Queue = function(conf) {
    // Connect to queue
    var getConnection = thunky(function(callback) {
        amqp.createConnection({
            host: conf.host,
            port: conf.port,
            login: conf.login,
            password: conf.password,
            authMechanism: conf.authMechanism,
            vhost: conf.vhost,
            ssl: {
                enabled: conf.ssl.enabled,
                keyFile: conf.ssl.keyFile,
                certFile: conf.ssl.certFile,
                caFile: conf.ssl.caFile,
                rejectUnauthorized: conf.ssl.rejectUnauthorized
            }
        }).on('ready', function(err, connection) {
            if (err) throw new Error(err);

            console.log('[Q] Logged in to queue.');

            callback(null, connection);
        });
    });

    this.publish = function(mail) {
        this._publish(mail, function(mail) {
            getConnection(function(err, connection) {
                connection.publish(conf.name, mail.id, {}, function() {
                    console.log('[Q] Mail written to queue.');
                });
            });
        });
    };

    this.receive = function() {
        getConnection(function (err, connection) {
            connection.queue(conf.name, function(q){
                console.log('[Q] Queue is open and waiting for mails.');

                // Catch all messages
                q.bind('#');

                // Receive messages
                q.subscribe({ ack: true }, function (message) {
                    this._receive(message.data.toString());
                });
            });
        });
    };

    this.close = function() {
        connection.end();
    }
};

module.exports = Queue;
module.exports.prototype = new (require('./Queue'))();