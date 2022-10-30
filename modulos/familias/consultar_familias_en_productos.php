<?php
/**
 
 */
if (!defined("RAIZ")) {
    define("RAIZ", dirname(dirname(dirname(__FILE__))));
}
require_once RAIZ . "/modulos/db.php";
require_once RAIZ . "/modulos/familias/familias.php";
$familias = consultar_familias_en_productos();
echo json_encode($familias);