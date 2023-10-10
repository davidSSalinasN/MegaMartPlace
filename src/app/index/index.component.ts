import { Component } from '@angular/core';

import { product } from 'src/dao/product';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  productos = new product();
 listaProductos:any = null;
 constructor() {
    this.settingList();
  }
  settingList():void{
    this.listaProductos = this.productos.getListaProductos();
    this.listaProductos = this.listaProductos.product.slice(-4);
  }


}
