import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import ExternalDraggable from '@fullcalendar/interaction/interactions-external/ExternalDraggable';
import esLocale from '@fullcalendar/core/locales/es';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/evento';
import { TipoEvento } from 'src/app/models/tipoEvento';
import { TipoeventoService } from 'src/app/services/tipoevento.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('external') external: ElementRef;
  draggableEl1;
  draggableEl2;
  public events: any[] = [];
  public eventsTemp: Evento[] = [];  
  public eventsUpdate: Evento[] = [];  
  public tipoEventos: TipoEvento[] = [];
  //public tipeEvents: TipoEvento[] = [];
  public usuarios: Usuario[] = [];
  public options: any;
  public evento: Evento;  

  constructor(private eventoService: EventoService, private tipoEventoService: TipoeventoService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {   
    this.draggableEl1 = document.getElementById('external1');
    this.draggableEl2 = document.getElementById('external2');    
    this.setDraggables();
    
    this.getEventos();
    this.getTipoEvento();
    this.getUsuarios();
    this.setOptions(); 
    //this.getTipoEventoFilter();
  }

  // GETTERS //

  getEventos(){
    this.eventoService.getEventosAll().subscribe(data =>{
      console.log(data);
      this.events = data;
    });
  }

  getTipoEvento(){
    this.tipoEventoService.getTipoEvento().subscribe(data =>{
      console.log(data);
      this.tipoEventos = data;
    });
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(data =>{
      console.log(data);
      this.usuarios = data;
    });
  } 

  /*getTipoEventoFilter(){
    setTimeout(()=>{                         
      this.tipeEvents = this.tipoEventos.filter(tipo => tipo.id > 2);
      console.log(this.tipeEvents);
    }, 1000);
    
  }*/

  // BUTTONS //
  
  cleanEvents(){
    console.log("Eventos temp: ", this.eventsTemp);
    console.log("Eventos update: ", this.eventsUpdate);
  }

  saveEvents(){
    this.eventsTemp.forEach(element => {
      element.id=null,
      console.log("save: ", element),
      this.eventoService.insertEvento(element)
    });
  }

  // NEWS DRAGGABLES //

  setDraggables(){    
    new Draggable(this.draggableEl1, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          id: eventEl.id,
          backgroundColor: eventEl.style.backgroundColor,
          borderColor: eventEl.style.borderColor,
          create: true,
          timeZone: "UTC"
        };
      }
    });

    new Draggable(this.draggableEl2, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          id: eventEl.id,
          backgroundColor: eventEl.style.backgroundColor,
          borderColor: eventEl.style.borderColor,
          create: true,
          editable: true,
          timeZone: "UTC",
          revert: true
        };
      }
    });
  }

  // OPTIONS EVENTS //

  setOptions(){
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      timeZone: "local",
      locales: [ esLocale ],
      locale: 'es',
      droppable: true,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,      
      eventTimeFormat: { // like '14:30:00'
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },

      // CLICK DATE //

      dateClick: (dateClickEvent) =>  {        
        this.dateClick(dateClickEvent);
      },

      // CLICK EVENTO //

      eventClick: (eventClickEvent) =>  {
        console.log("Event CLICKED !!!", eventClickEvent);
      },  

      // EVENTOS RECIBIDOS EXTERNAMENTE //    

      eventReceive: (eventReceiveEvent) => {
        //console.log(eventReceiveEvent);
        let esSolicitud: boolean = (eventReceiveEvent.event.backgroundColor == 'crimson');
        
        const year = eventReceiveEvent.event.start.getFullYear();
        const month = (Number(eventReceiveEvent.event.start.getMonth())+1);
        const date = eventReceiveEvent.event.start.getDate();
        const time = (esSolicitud) ? '': ((eventReceiveEvent.event.title).substring(0,5));     

        let tipoEv;
        let user = this.usuarios.find(user => user.id == Number(eventReceiveEvent.event.id));

        if((eventReceiveEvent.event.title).substring(0,5) == "08:00"){
          tipoEv = this.tipoEventos.find(tipo => tipo.id == 1);          
        }
        if((eventReceiveEvent.event.title).substring(0,5) == "20:00"){
          tipoEv = this.tipoEventos.find(tipo => tipo.id == 2);
        }
        if(esSolicitud){
          tipoEv = this.tipoEventos.find(tipo => tipo.id == Number(eventReceiveEvent.event.id));
          user = null;
        }  

        this.evento = {
            id: eventReceiveEvent.event._instance.instanceId,
            title: esSolicitud ? eventReceiveEvent.event.title: user.name,
            description: eventReceiveEvent.event.title,
            start: (year+ "-"+ ((month >9 ) ? month : "0"+month.toString()) + "-"+ ((date >9 ) ? date : "0"+date.toString()) + " " + time),
            end: "",
            backgroundColor: eventReceiveEvent.event.backgroundColor,
            borderColor: eventReceiveEvent.event.borderColor,
            color: "#FFFFFF",
            editable: true,
            enabled: true,
            newEvent: true,
            tipoEvento: tipoEv,
            usuario: user
        }

        console.log("evento ", this.evento);
        this.eventsTemp.push(this.evento);
      },

      // EVENTO REDIMENSIONADO //

      eventResize: (eventResizeEvent) => {
        //console.log(eventResizeEvent);  
        const time = (eventResizeEvent.event.backgroundColor == 'crimson') ? '': (" "+(eventResizeEvent.event.title).substring(0,5));
        const result = this.eventsTemp.find(event => event.id == eventResizeEvent.event._instance.instanceId);
        const index = this.eventsTemp.indexOf(result);
        const yearStart = eventResizeEvent.event.start.getFullYear();
        const monthStart = (Number(eventResizeEvent.event.start.getMonth())+1);
        const dateStart = eventResizeEvent.event.start.getDate();    
        const yearEnd = eventResizeEvent.event.end.getFullYear();
        const monthEnd = (Number(eventResizeEvent.event.end.getMonth())+1);
        const dateEnd = eventResizeEvent.event.end.getDate();  
        if(eventResizeEvent.event.source != null){
          console.log("VIENE DE LA BASE!!!");
          this.eventsUpdate[index].start = (yearStart+ "-"+ ((monthStart >9 ) ? monthStart : "0"+monthStart.toString()) + "-"+ ((dateStart >9 ) ? dateStart : "0"+dateStart.toString()) + time);
          this.eventsUpdate[index].end = (yearEnd+ "-"+ ((monthEnd >9 ) ? monthEnd : "0"+monthEnd.toString()) + "-"+ ((dateEnd >9 ) ? dateEnd : "0"+dateEnd.toString()) + time);
        }
        else{
          this.eventsTemp[index].start = (yearStart+ "-"+ ((monthStart >9 ) ? monthStart : "0"+monthStart.toString()) + "-"+ ((dateStart >9 ) ? dateStart : "0"+dateStart.toString()) + time);
          this.eventsTemp[index].end = (yearEnd+ "-"+ ((monthEnd >9 ) ? monthEnd : "0"+monthEnd.toString()) + "-"+ ((dateEnd >9 ) ? dateEnd : "0"+dateEnd.toString()) + time);
        }
      },

      // EVENTO DROP //
      
      eventDrop: (eventClickEvent) =>  {
        if(eventClickEvent.event.source != null){
          console.log("VIENE DE LA BASE!!!");
        }
        //console.log("Event drop !!!", eventClickEvent.event); 
        if (eventClickEvent.event.newEvent){
          console.log("Event drop nuevo!!!", eventClickEvent.event);  
          const time = (eventClickEvent.event.backgroundColor == 'crimson') ? '': (" "+(eventClickEvent.event.title).substring(0,5));  
          const year = eventClickEvent.event.start.getFullYear();
          const month = (Number(eventClickEvent.event.start.getMonth())+1);
          const date = eventClickEvent.event.start.getDate();    
          const _end = (eventClickEvent.event.end === null) ? '': (eventClickEvent.event.end.getFullYear()+ "-"+ (Number(eventClickEvent.event.end.getMonth())+1)+ "-"+ eventClickEvent.event.end.getDate());        
          //console.log(_end);
          this.evento = {
            id: eventClickEvent.event._instance.instanceId,
            title: eventClickEvent.event.title,
            description: eventClickEvent.event.title,
            start: (year+ "-"+ ((month >9 ) ? month : "0"+month.toString()) + "-"+ ((date >9 ) ? date : "0"+date.toString()) + time),
            end: _end,
            backgroundColor: eventClickEvent.event.backgroundColor,
            borderColor: eventClickEvent.event.borderColor,
            color: "#FFFFFF",
            editable: true,
            enabled: true,
            newEvent: eventClickEvent.event.newEvent,
            tipoEvento: null,
            usuario: null
          }
          console.log("evento nuevo: ", this.evento);
          this.eventsTemp.push(this.evento);
        }  
        else{         
          console.log("Evento en base: ",eventClickEvent.event);
          let esSolicitud: boolean = (eventClickEvent.event.backgroundColor == 'crimson');
          let time;
          const year = eventClickEvent.event.start.getFullYear();
          const month = (Number(eventClickEvent.event.start.getMonth())+1);
          const date = eventClickEvent.event.start.getDate();  
          const hour = eventClickEvent.event.start.getHours();
          if(hour<10){
            time = " 0"+hour.toString();          
          }
          else{
            time = (esSolicitud) ? '': (' ' + eventClickEvent.event.start.getHours());  
          }          
          const _end = (eventClickEvent.event.end === null) ? '': (eventClickEvent.event.end.getFullYear()+ "-"+ (Number(eventClickEvent.event.end.getMonth())+1)+ "-"+ eventClickEvent.event.end.getDate());        
          //console.log(_end);
          this.evento = {
            id: eventClickEvent.event.id,
            title: eventClickEvent.event.title,
            description: eventClickEvent.event.title,
            start: (year+ "-"+ ((month >9 ) ? month : "0"+month.toString()) + "-"+ ((date >9 ) ? date : "0"+date.toString()) + time + ":00"),
            end: _end,
            backgroundColor: eventClickEvent.event.backgroundColor,
            borderColor: eventClickEvent.event.borderColor,
            color: "#FFFFFF",
            editable: true,
            enabled: true,
            newEvent: eventClickEvent.event.newEvent,
            tipoEvento: (this.events.find(event => event.id)).tipoEvento,
            usuario: (this.events.find(event => event.id)).usuario
          }
          console.log("evento en base: ", this.evento);
          this.eventsUpdate.push(this.evento);
        }
      }, 

      // EVENTO ARRASTRADO FUERA ? //

      eventDragStop: (eventDragStop) =>  {
        /*console.log("Eliminar: ", eventDragStop.event);
        const result = this.eventsTemp.find(event => event.id == eventDragStop.event._instance.instanceId);
        console.log("Resultado: ", result);
        const index = this.eventsTemp.indexOf(result);
        this.eventsTemp.splice(index,1);
        eventDragStop.event.remove();*/
      },  
      events: this.events           
    };
  }  

  

  dateClick(model) {
    console.log("DATE CLICKED !!!", model.dateStr);
  }
  eventClick(model) {
    console.log(model);
  }
  eventDragStop(model) {
    console.log(model);
  }
  eventDrop(model) {
    console.log(model);
  }
  eventResize(model) {
    console.log(model);
  }

}