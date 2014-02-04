module.exports = function() {
    this.setMail = function(mail) {
        this.mail = mail;

        return this;
    };

    this.setDatabase = function(database) {
        this.database = database;

        return this;
    };

    this.publish = function() {
        throw new Error('Please override this function');
    };

    this._publish = function(mail, callback) {
        console.log('Write mail with subject "' + mail.subject + '" to databse.');

        var entity = new (require('../../Entity/QueuedMail'))();
        entity.mail = mail.toJSON();

        this.database.save('mail_queue', entity, callback);
    };

    this.receive = function() {
        throw new Error('Please override this function');
    };

    this._receive = function(id) {
        var _this = this;

        this.database.find('mail_queue', id, function(entity) {
            var mail = new (require('../../Model/Mail'))(entity.mail);

            _this.mail.send(mail, function() {
                _this.database.delete('mail_queue', entity);
            });
        });
    };

    this.close = function() {
        throw new Error('Please override this function');
    };
};