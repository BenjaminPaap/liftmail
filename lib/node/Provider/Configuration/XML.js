var Parser = require('node-xml-lite');

var Configuration = function(data) {
    this.initialize = function(data) {
        this.configuration = this.parse(data);
    };

    this.parse = function(data) {
        if (data instanceof Object) {
            var _this = this;
            var tmp = [];

            data.forEach(function(val) {
                if (val.childs === undefined) {
                    tmp[val.name] = null;
                } else if (val.childs.length === 1 && (val.childs[0] instanceof Object) === false) {
                    tmp[val.name] = val.childs[0];
                } else {
                    tmp[val.name] = _this.parse(val.childs);
                }
            });

            return tmp;
        }

        return this.parse(Parser.parseString(data).childs);
    };

    this.initialize(data);
};

module.exports = Configuration;
module.exports.prototype = new (require('./Configuration'));
