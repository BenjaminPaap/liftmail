<?php

namespace Idearockers\Liftmail\Model;

class Mail
{
    public $headers = [];
    public $from = [];
    public $to = [];
    public $cc = [];
    public $bcc = [];
    public $subject = null;
    public $text = null;
    public $html = null;
    public $attachments = [];

    public function __construct($json = null)
    {
        if ($json) {
            $this->fromJSON($json);
        }
    }

    public function fromJSON($json)
    {
        $data = json_decode($json, true);

        $this->headers = $data['headers'];
        $this->setFrom = $data['from'];
        $this->setTo = $data['to'];
        $this->setCC = $data['cc'];
        $this->setBCC = $data['bcc'];
        $this->setSubject = $data['subject'];
        $this->setText = $data['text'];
        $this->setHTML = $data['html'];
        $this->setAttachments = $data['attachments'];
    }

    public function toJson()
    {
        return json_encode(array(
            'headers' => $this->headers,
            'from' => $this->from,
            'to' => $this->to,
            'cc' => $this->cc,
            'bcc' => $this->bcc,
            'subject' => $this->subject,
            'text' => $this->text,
            'html' => $this->html,
            'attachments' => $this->attachments
        ));
    }
}