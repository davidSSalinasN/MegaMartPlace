import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MegaMartPlace';
  constructor(private router:Router){

  }
  redirigir():void{
    this.router.navigate(['about-us']);
  }
}
