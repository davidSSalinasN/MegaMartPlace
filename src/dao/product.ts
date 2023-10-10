import listaProductos from '/src/assets/JSON/product.json';
export class product {

  lista: any = null;
  carrito:any;
  //estructuraLista = JSON.parse(this.lista);
  idProduct:number = 0;
  indexProduct:number = 0;

  private ENTIDAD_DATA = 'data';
  private ENTIDAD_CARRITO= 'carrito';

  constructor() {
    if (localStorage.getItem('data')) {
      this.lista = JSON.parse(localStorage.getItem('data') || '{}');
    } else {
      this.lista = listaProductos;
      this.localStorageSave(this.ENTIDAD_DATA, JSON.stringify(this.lista));
    }
  }

  getListaProductos() {
    return this.lista;
  }
  getCarritoCompras(){
    return localStorage.getItem(this.ENTIDAD_CARRITO)?JSON.parse(localStorage.getItem(this.ENTIDAD_CARRITO)||'{}'):JSON.parse('{}');
  }

  crearProducto(title: string, description: string, precio: number, promotion: boolean, pricePromotion: number, rootImg: string,quantity:number) {
    const fecha = new Date();
    const month = fecha.getMonth()+1;
    const year =  fecha.getDate()+"/"+month+"/"+fecha.getFullYear();

    this.indexProduct = this.lista.product.length;
    this.idProduct =this.lista.product[this.indexProduct-1].id+1;

    const nuevoProducto={
      id:this.idProduct,
      title:title,
      description:description,
      precio:precio,
      promotion:promotion,
      pricePromotion:pricePromotion,
      rootImg:rootImg,
      quantity:quantity,
      modificado:year,
    }
    console.log(this.lista,"antes");
    this.lista.product.push(nuevoProducto);
    console.log(this.lista,"despues");
    this.convertirJSON();
    this.localStorageSave(this.ENTIDAD_DATA, this.lista);

  }

  actualizarCantidadProducto(index:number,cantidad:number){
    this.lista.product[index].quantity =this.lista.product[index].quantity - cantidad;
    this.convertirJSON();
    this.localStorageSave(this.ENTIDAD_DATA,this.lista);
    this.lista = JSON.parse(this.lista);
  }
  eliminarProducto(lista:any):any{
    this.lista = lista;
    this.convertirJSON();
    this.localStorageSave(this.ENTIDAD_DATA,this.lista);
    return JSON.parse(this.lista);
  }
  carritoCompras(identificador:number){
    this.carrito=localStorage.getItem(this.ENTIDAD_CARRITO)?localStorage.getItem(this.ENTIDAD_CARRITO):{idPorducto: [identificador] };
    if(localStorage.getItem(this.ENTIDAD_CARRITO)){
      this.carrito = JSON.parse(this.carrito);
      this.carrito.idPorducto[this.carrito.idPorducto.length]=identificador;
      this.localStorageSave(this.ENTIDAD_CARRITO,JSON.stringify(this.carrito));
    }
    this.carrito = JSON.stringify(this.carrito);
    this.localStorageSave(this.ENTIDAD_CARRITO,this.carrito);
  }

  private localStorageSave(entidad: any, data: string) {
    localStorage.setItem(entidad, data);
  }
  private convertirJSON(){
    this.lista = JSON.stringify(this.lista);
  }
  obtenerProducto(id:number):any{
    const producto = this.lista.product.filter((producto:any)=>producto.id === id);
    return producto;
  }
  actualizarProducto(id:number,title: string, description: string, precio: number, promotion: boolean, pricePromotion: number, rootImg: string,quantity:number) {
    const fecha = new Date();
    const month = fecha.getMonth()+1;
    const year =  fecha.getDate()+"/"+month+"/"+fecha.getFullYear();


    this.idProduct = id;
    const nuevoProducto={
      id:this.idProduct,
      title:title,
      description:description,
      precio:precio,
      promotion:promotion,
      pricePromotion:pricePromotion,
      rootImg:rootImg,
      quantity:quantity,
      modificado:year,
    }
   this.lista.product= this.lista.product.filter((objento:any)=>objento.id!==id);
   console.log(this.lista);
    this.lista.product.push(nuevoProducto);

    this.convertirJSON();
    this.localStorageSave(this.ENTIDAD_DATA, this.lista);

  }
  limpiarCarrito(){
    localStorage.removeItem(this.ENTIDAD_CARRITO);
    this.carrito  ={};
  }
  eliminarProductoCarrito(lista:any){
      this.carrito = lista;
      this.localStorageSave(this.ENTIDAD_CARRITO,JSON.stringify(this.carrito));
  }

}
