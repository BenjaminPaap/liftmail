<?php

namespace Idearockers\Liftmail\Provider\Configuration;

use Symfony\Component\Yaml\Yaml as YamlParser;

class YAML extends Configuration
{
    public function __construct($data)
    {
        $this->configuration = YamlParser::parse($data);
    }
}