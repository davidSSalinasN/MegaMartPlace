import { Component,OnInit } from '@angular/core';
import { Users } from 'src/dao/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarios = new Users();
  lista: any;
  nombreUsuario: string = "";
  password: string = "";
  texto: String = "";

  constructor(private router: Router) {
    this.lista = this.usuarios.getListaUsuarios();
  }
  ngOnInit(): void {
    if (localStorage.getItem("usuario")) {
      this.router.navigate(['admin']);
    }
  }
  validarUsuario() {
      if (this.nombreUsuario === this.lista.usuarios[0].usuario && this.password === this.lista.usuarios[0].password) {
        localStorage.setItem("usuario", "true");
        this.router.navigate(['admin']);
      } else {
        this.texto = "Usuario no valido";
      }
  }


}
