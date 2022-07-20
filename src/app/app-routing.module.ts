import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { GuardiasComponent } from './components/guardias/guardias.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { LoginComponent } from './components/login/login.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { InasistenciasComponent } from './components/inasistencias/inasistencias.component';
import { ClaveComponent } from './components/clave/clave.component';

const routes: Routes = [  
  {path: '', component:InicioComponent },
  {path: 'inicio', component:InicioComponent },
  {path: 'guardias/administracion', component:CalendarComponent },
  {path: 'guardias', component:GuardiasComponent },
  {path: 'solicitud', component:SolicitudComponent },
  {path: 'solicitudes', component:SolicitudesComponent },
  {path: 'auditoria', component:AuditoriaComponent },
  {path: 'login', component:LoginComponent },
  {path: 'usuarios', component:UsuarioComponent },
  {path: 'perfil', component:PerfilComponent },
  {path: 'perfiles', component:PerfilesComponent },
  {path: 'inasistencias', component:InasistenciasComponent },
  {path: 'clave', component:ClaveComponent },
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
