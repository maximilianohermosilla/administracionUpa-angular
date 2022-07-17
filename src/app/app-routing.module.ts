import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { GuardiasComponent } from './components/guardias/guardias.component';

const routes: Routes = [  
  {path: '', component:InicioComponent },
  {path: 'inicio', component:InicioComponent },
  {path: 'guardias/administracion', component:CalendarComponent },
  {path: 'guardias', component:GuardiasComponent },
  {path: 'solicitudes', component:SolicitudesComponent },
  {path: 'usuarios', component:UsuarioComponent },
  //{path: 'guardias', component:PortfolioComponent, canActivate: [GuardGuard] },  
  //{ path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
