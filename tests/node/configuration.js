var fs = require('fs');
var xmlConfig = require('../../lib/node/Provider/Configuration/XML');
var yamlConfig = require('../../lib/node/Provider/Configuration/YAML');
var jsonConfig = require('../../lib/node/Provider/Configuration/JSON');

exports.testXML = function(test){
    var config = new xmlConfig(fs.readFileSync('config/example.xml', 'UTF-8'));

    test.equal(config.getDatabase()[0], 'MongoDB');
    test.equal(config.getDatabase()[1].host, 'localhost');

    test.done();
};

exports.testYAML = function(test){
    var config = new yamlConfig(fs.readFileSync('config/example.yaml', 'UTF-8'));

    test.equal(config.getDatabase()[0], 'MongoDB');
    test.equal(config.getDatabase()[1].host, 'localhost');

    test.done();
};

exports.testJSON = function(test){
    var config = new jsonConfig(fs.readFileSync('config/example.json', 'UTF-8'));

    test.equal(config.getDatabase()[0], 'MongoDB');
    test.equal(config.getDatabase()[1].host, 'localhost');

    test.done();
};