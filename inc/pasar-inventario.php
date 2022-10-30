<?php
/**
 
 */
$foo = dirname(__DIR__) . "/modulos/inventario.csv";
echo $foo;
$bar = file($foo);
echo "<pre>";
var_dump($bar);