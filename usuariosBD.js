const usuariosBD = require("./conexion").usuarios; 
const e = require("express");
const Usuario=require("../modelos/UsuarioModelo");
const { encriptarPassword, validarPassword, usuarioAutorizado, adminAutorizado } = require("../middlewares/funcionesPassword");


function validarDatos(usuario){
    var valido = false; 
    if (usuario.nombre != undefined && usuario.usuario!=undefined && usuario.password != undefined){
    valido = true; 
    }
    return valido; 
}

async function mostrarUsuarios(){
    const usuarios = await usuariosBD.get(); 
    //console.log(usuarios);
    usuariosValidos=[];//una lista puede ser un arreglo. Podría ser un arreglo o solicitud de memoria. 
    usuarios.forEach(usuario => {
       // console.log(usuario.data()); 
    const usuario1 = new Usuario({id:usuario.id,...usuario.data()}); 
    if (validarDatos(usuario1.getUsuario)){
        usuariosValidos.push(usuario1.getUsuario); 
    }
    }); 
   //console.log(usuariosValidos); 
    return usuariosValidos; 
}

async function buscarPorIDU(id){
    const usuario = await usuariosBD.doc(id).get(); 
    //console.log(usuario.id);
    const usuario1=new Usuario({id:usuario,id,...usuario.data()});
    console.log(usuario1.getUsuario);
    var usuarioValido; 
    if (validarDatos(usuario1.getUsuario)){
        usuarioValido=usuario1.getUsuario; 
    }
    //console.log(usuarioValido);
    return usuarioValido; 
}


//insertar datos a FIREBASE
async function nuevoUsuario(data){
    const {salt,hash}=encriptarPassword(data.password);
    data.password=hash; 
    data.salt=salt;
    data.tipoUsuario="usuario";

    const usuario1=new Usuario(data);
   // console.log(usuario1.getUsuario); 
    var usuarioValido=false; 
    if (validarDatos(usuario1.getUsuario)){
    await usuariosBD.doc().set(usuario1.getUsuario);
    usuarioValido=true; 

    }
    return usuarioValido; 
}

async function borrarUsuario(id){
    //console.log(id);
    var usuarioValido=await buscarPorID(id); 
    console.log(usuarioValido);
    var usuarioBorrado=false; 
    if (usuarioValido){
        await usuariosBD.doc(id).delete();
        usuarioBorrado=true; 
    }
    return usuarioBorrado;
}


module.exports = {
    mostrarUsuarios, 
    nuevoUsuario,
    borrarUsuario,
    buscarPorIDU
}

//borrarUsuario("miejemplo2");
//revisar cuando si existe el usuario, pero el usuario es incorrecto

/*data={
    nombre: "Daniela", 
    usuario: "musica_clasica",
    password: "asdfg"
}

async function prueba(){
    console.log(await nuevoUsuario(data)); 
}

prueba(); */

//buscarPorID("miejemplo2"); 
//mostrarUsuarios(); 
