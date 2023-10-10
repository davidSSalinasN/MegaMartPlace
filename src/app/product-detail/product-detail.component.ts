import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { product} from 'src/dao/product';
import { HttpClient } from '@angular/common/http';

declare var window:any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  private id= 0;
  private index = 0;
  private producto = new product();
  private lista:any = null;
  elemento:any = null;
  promocion = false;
  styleClass:any;
  formModal:any;
  confirmacionModal:any;
  valorFinal:number=0;
  cantidad:number=1;
  errorCantidad:string ="";
  comprarBoton = false;


  ngOnInit():void{
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalCompra')
    );
    this.confirmacionModal = new window.bootstrap.Modal(
      document.getElementById('modalConfirmar')
    );
  }
  constructor(private _route:ActivatedRoute,private http:HttpClient){
    this.obtenerID();
    this.lista = this.producto.getListaProductos();
    this.elemento = this.lista.product[this.index];
    this.validarPromocion(this.elemento.promotion);
    this.styleClass = this.promocion?"":"noPromocion";
  }

  cantidadTotal():number{
    this.valorFinal = this.obtenerValor();
    if(this.cantidad> this.elemento.quantity){
      this.errorCantidad = "maximo de productos a comprar es de:"+this.elemento.quantity;
      this.comprarBoton=true;
      return 0;
    }else{
      this.comprarBoton=false;
      this.errorCantidad="";
      return this.valorFinal * this.cantidad;
    }


  }
  comprar(){
    this.producto.actualizarCantidadProducto(this.index,this.cantidad);
    this.cerrarModal();
    this.cantidad = 0;
  }
  abrirModal(){
    this.formModal.show();
  }
  cerrarModal(){
    this.formModal.hide();
  }
  carritoCompras(){
    this.producto.carritoCompras(this.elemento.id);
    this.confirmacionModal.show();
  }
  cerrarCarrito(){
    this.confirmacionModal.hide();
  }
  private obtenerID(){

    this.id = Number(this._route.snapshot.paramMap.get('id'));
    let buscarIndex = this.producto.getListaProductos().product.findIndex((objeto:any)=>objeto.id ===this.id); //this.lista.product.indexOf((objeto:any)=>objeto.id ===this.id);
    console.log(buscarIndex, ' index');
    this.index = buscarIndex;
  }
  private validarPromocion(validacion:boolean){
    this.promocion = validacion? validacion:this.promocion;
  }
  obtenerValor():number{
    return this.promocion?this.elemento.pricePromotion: this.elemento.precio;
  }

}
