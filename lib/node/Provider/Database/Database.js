module.exports = function() {
    this.find = function(name, id, callback) {
        throw new Error('Please override this function');
    };

    this.save = function(name, entity, callback) {
        throw new Error('Please override this function');
    };

    this.delete = function(name, entity, callback) {
        throw new Error('Please override this function');
    };
};