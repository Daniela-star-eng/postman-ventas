const productosBD = require("./conexion").productos; 
const Producto = require("../modelos/ProductoModelo");
const {productos} = require ("./conexion");
// Validar datos del producto
function validarDatos(producto) {
    var valido = false;
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio != undefined) {
        valido = true;
    }
    return valido;
}


// Mostrar productos
async function mostrarProductos() {
    const productos = await productosBD.get();
    const productosValidos = [];

    productos.forEach(doc => {
        //console.log(doc.data());
        const producto1 = new Producto({ id: doc.id, ...doc.data() });
        //console.log(producto1.getProducto);
        if (validarDatos(producto1.getProducto)) {
            productosValidos.push(producto1.getProducto);
        }
    });

    return productosValidos;
}

// Buscar producto por ID
async function buscarPorIDP(id) {
    const producto = await productosBD.doc(id).get();
    if (producto.exists) {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        return producto1.getProducto;
    }
    return null;
}

// Agregar nuevo producto
async function nuevoProducto(data) {
    const producto = new Producto(data);
    if (validarDatos(producto.getProducto)) {
        await productosBD.doc().set(producto.getProducto);
        return true;
    }
    return false;
}

// Borrar producto
async function borrarProducto(id) {
    const productoValido = await buscarPorIDP(id);
    if (productoValido) {
        await productosBD.doc(id).delete();
        return true;
    }
    return false;  
}
      
module.exports = {
    mostrarProductos,
    nuevoProducto,
    buscarPorIDP,
    borrarProducto
};
