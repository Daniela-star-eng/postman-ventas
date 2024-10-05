const ventasBD = require("./conexion").ventas;
const usuariosBD = require("./conexion").usuarios;
const productos = require("./conexion").productos;

const Venta = require("../modelos/VentasModelo");
const {ventas} = require("./conexion");

function validarDatos(venta){
    var valido=false;
    if(venta.idUsuario!=undefined && venta.idProducto!=undefined){
        valido=true;
        
    }

    console.log(valido);
    return valido;
}

async function mostrarVentas(){
    const ventas = await ventasBD.get();
    ventasValidas=[];
    ventas.forEach(venta => {
        const venta1=new Venta({id:venta.id,...venta.data()});
        //console.log(venta1.getVenta);
        
        if(validarDatos(venta1.getVenta)){
            ventasValidas.push(venta1.getVenta);
        }
    });
    //console.log(ventasValidas);
    return ventasValidas;
}



async function buscarPorID(id) {
    try {
        // Obtener la venta desde la base de datos
        const ventaSnapshot = await ventasBD.doc(id).get();
        if (!ventaSnapshot.exists) {
            throw new Error("La venta no existe.");
        }

        const ventaData = ventaSnapshot.data();
        const venta1 = new Venta({ id: ventaSnapshot.id, ...ventaData });

        // Validar los datos de la venta
        if (!validarDatos(venta1.getVenta)) {
            throw new Error("Datos de la venta no válidos.");
        }

        // Obtener idUsuario y idProducto de la venta
        const idUsuario = venta1.getVenta.idUsuario;
        const idProducto = venta1.getVenta.idProducto;

        // Buscar el nombre del usuario correspondiente
        const usuarioSnapshot = await usuariosBD.doc(idUsuario).get();
        if (!usuarioSnapshot.exists) {
            throw new Error("El usuario no existe.");
        }
        const nombreUsu = usuarioSnapshot.data().nombre; // Asegúrate de que la tabla usuarios tenga un campo "nombre"

        // Buscar el nombre del producto correspondiente
        const productoSnapshot = await productosBD.doc(idProducto).get();
        if (!productoSnapshot.exists) {
            throw new Error("El producto no existe.");
        }
        const nombreProd = productoSnapshot.data().nombre; // Asegúrate de que la tabla productos tenga un campo "nombre"

        // Devolver la venta con los nombres del usuario y producto
        return {
            id: venta1.getVenta.id,
            nombreUsu: nombreUsu,
            nombreProd: nombreProd,
            fecha: venta1.getVenta.fecha,
            hora: venta1.getVenta.hora,
            estatus: venta1.getVenta.estatus
        };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}




    // async function buscarPorID(id) {
    //     const venta=await ventasBD.doc(id).get();
    //     const venta1=new Venta({id:venta.id,...venta.data()});
    //     var ventaValida;
    //     if(validarDatos(venta1.getVenta)){
    //         ventaValida=venta1.getVenta;
    //     }
    //     console.log(ventaValida);
    //     return ventaValida;
    // }

async function nuevaVenta(data) {
    const fechaActual = new Date();
    const fechaA = fechaActual.toLocaleDateString();  // Formato local (DD/MM/YYYY o MM/DD/YYYY dependiendo de la región)
    const horaA =fechaActual.toLocaleTimeString();


    //Asignar fecha y hora actual ademas del estatus predefinido;
    data.fecha=fechaA;
    data.hora=horaA;
    data.estatus="vendido";

    const venta1=new Venta(data);
    console.log(venta1.getVenta);
    var ventaValida=false;
    if(validarDatos(venta1.getVenta)){
        await ventasBD.doc().set(venta1.getVenta);
        ventaValida=true;
    }
    return ventaValida;
}

async function cancelarVenta(id) {
    // Generar fecha y hora actuales
    const fechaActual = new Date();
    const fechaA = fechaActual.toISOString().split('T')[0];  // Formato YYYY-MM-DD
    const horaA = fechaActual.toTimeString().split(' ')[0];  // Formato HH:MM:SS

    // Buscar la venta por ID
    var ventaValida = await buscarPorID(id);
    
    if (!ventaValida) {
        // Si la venta no se encuentra, retorna null
        return null;
    }

    // Actualizar los campos de la venta
    const ventaActualizada = {
        fecha: fechaA,
        hora: horaA,
        estatus: "cancelado"
    };

    // Aquí actualizas la venta en la base de datos en lugar de eliminarla
    await ventasBD.doc(id).update(ventaActualizada); // Esto actualizará los campos necesarios

    return ventaActualizada; // Devolver los nuevos datos de la venta
}


module.exports={
    mostrarVentas,
    nuevaVenta,
    cancelarVenta,
    buscarPorID
};