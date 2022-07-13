import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { HttpClientModule }  from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HeaderComponent,
    FooterComponent,
    SolicitudesComponent,
    ConsultasComponent,
    InicioComponent
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
  providers: [EventoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
