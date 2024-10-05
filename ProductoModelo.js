class Producto{
    constructor(data){
    
     //console.log(data);
        this.id=data.id;
        this.nombre=data.nombre;
        this.cantidad=data.cantidad;
        this.precio=data.precio;
    }
    set id(id){
        this._id=id;
    }
 
    set cantidad(cantidad){
        this._cantidad=cantidad;
    }

    set nombre(nombre){
        this._nombre=nombre;
    }
    set precio(precio){
        this._precio=precio;
    }
    
    get id(){
        return this._id;
    }
    get cantidad(){
        return this._cantidad;
    }
    get nombre(){
        return this._nombre;
    }
    get precio(){
        return this._precio;
    }

    get getProducto(){
        const conid={
            id:this.id,
            nombre:this.nombre,
            cantidad:this.cantidad,
            precio:this.precio   
        }
        const sinid={
            nombre:this.nombre,
            cantidad:this.cantidad,
            precio:this.precio   
        }
        if(this.id==undefined){
            return sinid;
        }else{
            return conid;
        }
    }
}

module.exports = Producto;