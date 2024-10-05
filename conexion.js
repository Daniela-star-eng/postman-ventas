const admin = require("firebase-admin");
const keys = require("../keyson.json");
admin.initializeApp({
    credential:admin.credential.cert(keys)//aquí irán todos los parámetros pero en este caso solo se pasa la variable
}); //función que nos da firebase. Recibe un objeto

const proyecto=admin.firestore(); 

const usuarios=proyecto.collection("miejemplo1");
const productos=proyecto.collection("productos"); 
const ventas=proyecto.collection("ventas"); 

module.exports={
    usuarios, 
    productos,
    ventas
}
//console.log(usuarios); 