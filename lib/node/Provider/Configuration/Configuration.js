module.exports = function(data) {
    this.configuration = null;

    this.getDatabase = function() {
        var active = this.configuration.database.active;

        return [
            active,
            this.configuration.database.provider[active]
        ];
    };

    this.getQueue = function() {
            var active = this.configuration.queue.active;

        return [
            active,
            this.configuration.queue.provider[active]
        ];
    };

    this.getMail = function() {
        var active = this.configuration.mail.active;

        return [
            active,
            this.configuration.mail.provider[active]
        ];
    };
}