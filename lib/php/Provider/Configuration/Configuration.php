<?php

namespace Idearockers\Liftmail\Provider\Configuration;

abstract class Configuration
{
    protected $configuration = array();

    abstract public function __construct($data);

    public function getDatabase()
    {
        return array(
            $active = $this->configuration['database']['active'],
            $this->configuration['database']['provider'][$active]
        );
    }

    public function getQueue()
    {
        return array(
            $active = $this->configuration['queue']['active'],
            $this->configuration['queue']['provider'][$active]
        );
    }

    public function getMail()
    {
        return array(
            $active = $this->configuration['mail']['active'],
            $this->configuration['mail']['provider'][$active]
        );
    }
}