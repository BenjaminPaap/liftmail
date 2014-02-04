var Configuration = function(data) {
    this.initialize = function(data) {
        this.configuration = JSON.parse(data);
    };

    this.initialize(data);
};

module.exports = Configuration;
module.exports.prototype = new (require('./Configuration'));