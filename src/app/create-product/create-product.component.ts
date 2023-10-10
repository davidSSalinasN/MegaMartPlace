import { Component,OnInit } from '@angular/core';
import { product} from 'src/dao/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';

declare var window:any;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm !: FormGroup;
  archivos:File[]=[];
  producto = new product();
  porcentaje:number=0;
  visualiza = true;
  private id:number=0;
  actualizar = false;

  formModal:any;

  styleClass = "";


  valorTotal:number= 0;

  constructor(private _route:ActivatedRoute,private fb:FormBuilder,private http: HttpClient){}

  ngOnInit() {
    let datos;
    this.productForm = this.fb.group({
      titulo:['',Validators.required],
      descripcion:['',Validators.required],
      precio:['',[Validators.required,Validators.min(0)]],
      cantidad:['',[Validators.required,Validators.min(1)]],
      promocion:[false,Validators.required],
      precioPromocion:['',Validators.min(0)],
      rootImg:['',Validators.required],
    });
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalRegistro')
    );
    if(this._route.snapshot.paramMap.get('id')){
      this.actualizar = true;
      this.obtenerID();

    }


  }
  valorPromocion(){
    this.valorTotal=(this.productForm.value.precio * this.productForm.value.precioPromocion)/100;
    if(this.productForm.value.precioPromocion <= 100){
      return this.valorTotal;
    }else{
      return "error se paso del porcentaje de promoción";
    }

  }
  generarProducto(){
    const listaRutaImagen = this.productForm.value.rootImg.split('\\');
    const nombreImagen = listaRutaImagen[listaRutaImagen.length-1];
    this.producto.crearProducto(this.productForm.value.titulo,this.productForm.value.descripcion,this.productForm.value.precio,this.productForm.value.promocion,this.valorTotal>0?this.valorTotal:this.productForm.value.precio,nombreImagen,this.productForm.value.cantidad);
    if(nombreImagen !== ""){
      this.subirArchivo();
    }
    this.abrirModal();
  }
  visualizar(){
    this.visualiza =!this.visualiza;
  }
  noDejar():boolean{
    if(this.valorTotal>0 && this.productForm.value.precio >0 && this.productForm.value.cantidad >0  && this.visualiza === false){
      return false;
    }else if(this.productForm.value.precio >0 && this.visualiza === true && this.productForm.value.cantidad >0){
      return false;
    }
    return true;

  }
  capturarImagen(event:any):any{
    const archivoCapturado = event.target.files[0];
    this.archivos.push(archivoCapturado);
  }
  subirArchivo():any{
    try{
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo:File) => {
        console.log(archivo);
        formularioDeDatos.append('file',archivo);
      });
      this.http.post('http://localhost:3000/api/upload', formularioDeDatos)
      .subscribe(response => {
        console.log('Respuesta del servidor:', response);
      });
    }catch(e){
      console.log('Error',e);
    }
  }
  abrirModal(){
    this.formModal.show();
  }
  cerrarModal(){
    this.formModal.hide();
  }
  private obtenerID(){
    this.id = Number(this._route.snapshot.paramMap.get('id'));
  }

  actualizarProducto(){
    const listaRutaImagen = this.productForm.value.rootImg.split('\\');
    const nombreImagen = listaRutaImagen[listaRutaImagen.length-1];
    this.producto.actualizarProducto(this.id,this.productForm.value.titulo,this.productForm.value.descripcion,this.productForm.value.precio,this.productForm.value.promocion,this.valorTotal>0?this.valorTotal:this.productForm.value.precio,nombreImagen,this.productForm.value.cantidad);
    if(nombreImagen !== ""){
      this.subirArchivo();
    }
    this.abrirModal();
  }


}
