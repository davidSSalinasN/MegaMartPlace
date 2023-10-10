import { Component } from '@angular/core';
import {product} from 'src/dao/product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {

  producto = new product();
  lista:any = null;
  constructor(){
    this.getList();
  }

  getList(){
    this.lista = this.producto.getListaProductos();
  }

}
