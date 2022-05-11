import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../styles.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goSolicitudes(){
    this.route.navigate(['/solicitudes']);
  }

  goGuardias(){
    this.route.navigate(['/guardias']);
  }

  goInicio(){
    this.route.navigate(['/inicio']);
  }

}
