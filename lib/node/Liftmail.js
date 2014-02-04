var fs = require('fs');
var path = require('path');

module.exports = function(configurationFile) {
    // Search and open configuration file
    if (fs.existsSync(configurationFile) === false) {
        throw new Error('Configuration file ' + configurationFile + ' not found');
    }

    var rawConfiguration = fs.readFileSync(configurationFile);

    // Parse configuration file
    var configuration = {};
    var configurationFileExt = path.extname(configurationFile);
    switch (configurationFileExt) {
        case '.xml':
            configuration = new (require('./lib/node/Provider/Configuration/XML'))(rawConfiguration);
            break;
        case '.json':
            configuration = new (require('./lib/node/Provider/Configuration/JSON'))(rawConfiguration);
            break;
        case '.yaml':
        case '.yml':
            configuration = new (require('./lib/node/Provider/Configuration/YAML'))(rawConfiguration);
            break;
        default:
            throw new Error('The ' + configurationFileExt + ' extension is not implemented yet');
            break;
    }

    // Load database, mail and queue provider
    var dependencies = {
        database: require('./lib/node/Provider/Database/' + configuration.getDatabase()[0]),
        mail: require('./lib/node/Provider/Mail/' + configuration.getMail()[0]),
        queue: require('./lib/node/Provider/Queue/' + configuration.getQueue()[0])
    };

    // Create database provider instance
    this.database = new dependencies.database(configuration.getDatabase()[1]);

    // Create mail provider instance
    this.mail = new dependencies.mail(conf.getMail()[1]);
    this.mail.database = this.database;

    // Create queue provider instance
    this.queue = new dependencies.queue(conf.getQueue()[1]);
    this.queue.database = this.database;
    this.queue.mail = this.mail;
};