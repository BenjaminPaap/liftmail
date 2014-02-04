var Parser = require('js-yaml');

var Configuration = function(data) {
    this.initialize = function(data) {
        this.configuration = Parser.safeLoad(data);
    };

    this.initialize(data);
};

module.exports = Configuration;
module.exports.prototype = new (require('./Configuration'));