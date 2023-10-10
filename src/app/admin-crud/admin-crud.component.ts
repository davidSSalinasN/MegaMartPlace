import { Component } from '@angular/core';
import { product} from 'src/dao/product';
@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.scss']
})
export class AdminCRUDComponent {
  private producto= new product();
  lista:any;
  constructor(){
    this.lista = this.producto.getListaProductos();
  }
  eliminarProducto(id:number){

    this.lista.product = this.lista.product.filter((objeto:any) => objeto.id !== id);
    this.producto.eliminarProducto(this.lista);
  }

}
