import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { HttpClientModule, HTTP_INTERCEPTORS }  from '@angular/common/http';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventoService } from './services/evento.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RoutingModule } from './app-routing.module';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { SpinnerInterceptorService } from './services/spinner-interceptor.service';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { ButtonComponent } from './components/button/button.component';
import { GuardiasComponent } from './components/guardias/guardias.component';
import { ExcelService } from './services/excel.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ClaveComponent } from './components/clave/clave.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HeaderComponent,
    FooterComponent,
    SolicitudesComponent,
    ConsultasComponent,
    InicioComponent,
    SpinnerComponent,
    UsuarioComponent,
    LoginComponent,
    ButtonComponent,
    GuardiasComponent,
    PerfilComponent,
    ClaveComponent,
    PerfilesComponent,
    AuditoriaComponent    
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    HttpClientModule,
    FontAwesomeModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [EventoService, ExcelService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
