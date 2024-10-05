var rutas = require("express").Router();
// var {Router} = require("express");

var {mostrarProductos, nuevoProducto, borrarProducto, buscarPorIDP} = require("../BD/productos");

rutas.get("/mostrarProductos",async(req, res)=>{
    var productosValidos = await mostrarProductos();
    // console.log(usuariosValidos);
    res.json(productosValidos);
    // res.send("Hola estas en raíz");
});

rutas.get("/buscarProductoPorIdP/:id",async(req,res)=>{
    var productoValido = await buscarPorIDP(req.params.id);
    res.json(productoValido);
});

rutas.get("/borrarProducto/:id",async(req,res)=>{
    var productoBorrado = await borrarProducto(req.params.id);
    res.json(productoBorrado);
});

rutas.post("/nuevoProducto",async(req,res)=>{
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

module.exports = rutas;