<?php
/**

 */
function consultar_familias()
{
    global $base_de_datos;
    $sentencia = $base_de_datos->prepare("SELECT familia FROM ventas GROUP BY familia;");
    $sentencia->execute();
    return $sentencia->fetchAll();
}
function consultar_familias_en_productos()
{
    global $base_de_datos;
    $sentencia = $base_de_datos->prepare("SELECT familia FROM inventario GROUP BY familia;");
    $sentencia->execute();
    return $sentencia->fetchAll();
}