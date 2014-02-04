<?php

namespace Idearockers\Liftmail\Provider\Configuration;

class XML extends Configuration
{
    public function __construct($data)
    {
        $this->configuration = json_decode(json_encode(simplexml_load_string($data)), true);
    }
}