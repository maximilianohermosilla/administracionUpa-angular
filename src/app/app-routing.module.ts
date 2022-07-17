import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [  
  {path: '', component:CalendarComponent },
  {path: 'inicio', component:InicioComponent },
  {path: 'guardias', component:CalendarComponent },
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
