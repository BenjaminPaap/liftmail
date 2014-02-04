<?php

namespace Idearockers\Liftmail\Provider\Configuration;

class JSON extends Configuration
{
    public function __construct($data)
    {
        $this->configuration = json_decode($data, true);
    }
}