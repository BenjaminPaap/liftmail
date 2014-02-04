module.exports = function(json) {
    this.headers = [];
    this.from = [];
    this.to = [];
    this.cc = [];
    this.bcc = [];
    this.subject = null;
    this.text = null;
    this.html = null;
    this.attachments = [];

    if (json) {
        this.fromJSON(json);
    }

    this.fromJSON = function(json) {
        var data = JSON.parse(json);

        this.headers = data.headers;
        this.from = data.from;
        this.to = data.to;
        this.cc = data.cc;
        this.bcc = data.bcc;
        this.subject = data.subject;
        this.text = data.text;
        this.html = data.html;
        this.attachments = data.attachments;
    }

    this.toJSON = function() {
        return JSON.stringify({
            headers: this.getHeaders(),
            from: this.getFrom(),
            to: this.getTo(),
            cc: this.getCC(),
            bcc: this.getBCC(),
            subject: this.getSubject(),
            text: this.getText(),
            html: this.getHTML(),
            attachments: this.getAttachments()
        });
    }
}