var rutas = require("express").Router(); 
//var {Router} = require("express");
var {mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorIDU} = require("../BD/usuariosBD");

rutas.get("/mostrarUsuarios",async(req,res)=>{
    var usuariosValidos=await mostrarUsuarios();
    //console.log("usuariosValidos");
   res.json(usuariosValidos); 
});

rutas.get("/buscarPorIdU/:id", async(req,res)=>{
    var usuarioValido=await buscarPorIDU(req.params.id); 
    res.json(usuarioValido);
});


rutas.delete("/borrarUsuario/:id", async(req,res)=>{
    var usuarioBorrado = await borrarUsuario(req.params.id);
    res.json(usuarioBorrado);
});

rutas.post("/nuevousuario",async(req,res)=>{   //req recibe información y res manda información a la pantalla
    console.log("asdhfkjah");
    console.log(req.body);
    var usuarioValido=await nuevoUsuario(req.body); //cuando se quiere recibir datos de un formulario es con .body
    res.json(usuarioValido);
    //res.end();
});

module.exports=rutas; 