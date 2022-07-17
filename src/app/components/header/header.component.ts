import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../styles.css']
})
export class HeaderComponent implements OnInit {
  showOption: boolean = false;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goSolicitudes(){
    this.route.navigate(['/solicitudes']);
  }

  goAdministracionGuardias(){
    this.route.navigate(['/guardias/administracion']);
  }

  goGuardias(){
    this.route.navigate(['/guardias']);
  }

  goInicio(){
    this.route.navigate(['/inicio']);
  }

  handleClick(event) {
    if (this.showOption) {
        let clickedComponent = event.target;
    }
  }

  toggleOption(){
    this.showOption = this.showOption === true ? false : true;
  }

}
