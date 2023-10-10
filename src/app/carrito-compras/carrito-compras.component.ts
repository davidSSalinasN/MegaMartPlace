import { Component } from '@angular/core';
import { product} from 'src/dao/product';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.scss']
})
export class CarritoComprasComponent {

  private producto= new product();
  listaProductos:any;
  listaCarrito:any;
  listaCompras:any;
  noHay=true;
  constructor(){
    this.listaCarrito = this.producto.getCarritoCompras();
    this.listaProductos = this.producto.getListaProductos();
    if(localStorage.getItem("carrito")){
      let lista = JSON.stringify(this.listaProductos.product);
      const listaConvertida = JSON.parse(lista) as {id:number,title:string,description:string,precio:number,promotion:boolean,pricePromotion:number,rootImg:string,quantity:number,modificado:string}[];
      let filtarLista :any[]=[];

      filtarLista = listaConvertida;
      let listaFinal :any=[];
      let productoGuardar:any=[];
      for(let i=0;i<this.listaCarrito.idPorducto.length;i++){
        productoGuardar=filtarLista.filter((objeto:any) =>objeto.id ===this.listaCarrito.idPorducto[i])
        listaFinal.push(productoGuardar[0]);

      }
      this.listaCompras = listaFinal;
      if(this.listaCompras.length >0){
        this.noHay = false;
      }
      this.total();
    }


  }
  eliminarListaCompleta(){
    this.producto.limpiarCarrito();
    this.listaCompras = [];
  }
  eliminarProductoLista(id:number,indexProducto:number){
    this.listaCompras.splice(indexProducto,1);
    let index = this.listaCarrito.idPorducto.indexOf(id);
    this.listaCarrito.idPorducto.splice(index,1);
    this.producto.eliminarProductoCarrito(this.listaCarrito);
  }
  total():number{
    let suma=0;
    for(let i=0;i<this.listaCompras.length;i++){
      suma += this.listaCompras[i].pricePromotion;
    }
    return suma;
  }
  comprarCarrito(){
    let contarProducto:any;
    let index;
    let indexNoRepetidos = new Set();
    for(let i=0;i < this.listaCarrito.idPorducto.length;i++){
      contarProducto =this.listaCompras.filter((objeto:any) => objeto.id === this.listaCarrito.idPorducto[i]);
      index = this.listaProductos.product.findIndex((objeto:any)=> objeto.id === contarProducto[0].id);
      if(!indexNoRepetidos.has(index) && contarProducto.length>0){
        indexNoRepetidos.add(index);
        this.producto.actualizarCantidadProducto(index,contarProducto.length);
        index=0;
      }


    }
    this.eliminarListaCompleta();
  }
}
