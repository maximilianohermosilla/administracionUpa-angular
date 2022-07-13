import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/evento';
import { TipoEvento } from 'src/app/models/tipoEvento';
import { TipoeventoService } from 'src/app/services/tipoevento.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('external') external: ElementRef;
  formGroup: FormGroup;
  draggableEl1;
  draggableEl2;
  viewModal: boolean = false;
  viewDeleteModal: boolean = false;
  public events: any[] = [];
  public eventsTemp: Evento[] = [];  
  public eventsUpdate: Evento[] = [];  
  public eventsDelete: Evento[] = [];  
  public tipoEventos: TipoEvento[] = [];
  public usuarios: Usuario[] = [];
  public options: any;
  public evento: Evento;
  public filterUser: number = 1;
  public filterTipoEvento: number = 0;    
  userSolicitud: Usuario = {name: '', lastName: '', user: '', password: '', email: '', legajo: '', fecha_nac: '', color: '', habilitado: false};

  constructor(private eventoService: EventoService, private tipoEventoService: TipoeventoService, private usuarioService: UsuarioService,
               private formBuilder: FormBuilder, private sant: DomSanitizer) { 
    this.formGroup = this.formBuilder.group({
      userSolicitud: ['', []]
    })
  }

  ngOnInit(): void {   
    this.draggableEl1 = document.getElementById('external1');
    this.draggableEl2 = document.getElementById('external2');
    this.setDraggables();
    
    this.getEventos();
    this.getTipoEvento();
    this.getUsuarios();
    this.setOptions(); 
  }

  // GETTERS //

  getEventos(){
    this.eventoService.getEventosAll().subscribe(data =>{
      this.events = data;
    });
  }

  getTipoEvento(){
    this.tipoEventoService.getTipoEvento().subscribe(data =>{
      this.tipoEventos = data;
    });
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(data =>{
      this.usuarios = data;      
    });
  }   

  onSubmit(userSolicitud: Usuario){            
    this.userSolicitud = userSolicitud;
    this.evento.usuario = this.userSolicitud;
    this.evento.title = this.evento.title + " (" + this.evento.usuario.name + ")";
    this.evento.description = this.evento.description + " (" + this.evento.usuario.name + ")";
    this.viewModal = false;
    return this.userSolicitud;
  }

  onDelete(){
    window.location.reload();
  }

  searchFilter(idUsuario: number, idTipoEvento: number){
    console.log(idUsuario + '  ' + idTipoEvento);
    this.events = [];
    this.eventoService.getEventosFilter(idUsuario, idTipoEvento).subscribe(data =>{
      this.events = data;      
      console.log(this.events);
    });
    // if (this.filterUser == 1 && this.filterTipoEvento == 0){  
    //   this.getEventos();
    // }
    // else{
    //   this.eventoService.getEventosFilter(idUsuario, idTipoEvento).subscribe(data =>{
    //     this.events = data;      
    //     console.log(this.events);
    //   });
      
    // }
  }

  searchUser(event){
    this.filterUser = event.target.value;
    console.log(this.filterUser);
    // if (this.filterUser > 1 && this.filterTipoEvento == 0){      
    //   this.eventoService.getEventosUser(this.filterUser).subscribe(data =>{
    //     this.events = data;      
    //     console.log(this.events);
    //   });
    // }
    // else{
    //   this.searchFilter(this.filterUser, this.filterTipoEvento);
    // }
    this.searchFilter(this.filterUser, this.filterTipoEvento);
  }

  searchTipoEvento(event){
    console.log(event);
    this.filterTipoEvento = event.target.value;
    console.log(this.filterTipoEvento);
    // if (this.filterTipoEvento > 0 && this.filterUser == 1){
    //   this.eventoService.getEventosTipoEvento(this.filterTipoEvento).subscribe(data =>{
    //     this.events = data;      
    //     console.log(this.events);
    //   });
    // }
    // else{
    //   this.searchFilter(this.filterUser, this.filterTipoEvento);
    // }   
    this.searchFilter(this.filterUser, this.filterTipoEvento); 
  }

  // BUTTONS //
  
  cleanEvents(){
    console.log("Eventos: ", this.events);
    console.log("Eventos temp: ", this.eventsTemp);
    console.log("Eventos update: ", this.eventsUpdate);
    console.log("Eventos delete: ", this.eventsDelete);
  }

  saveEvents(){
    if(this.eventsTemp.length > 0){
      this.eventsTemp.forEach(element => {
        this.eventoService.insertEvento(element).subscribe((element)=>(
          this.setOptions(),
          this.ngOnInit()
        ))
      });
    }
    if(this.eventsUpdate.length > 0){
      this.eventsUpdate.forEach(elementUpdate => {
        this.eventoService.updateEvento(elementUpdate).subscribe((element)=>(
          this.ngOnInit()
        ))
      });
    }
    if(this.eventsDelete.length > 0){
      this.eventsDelete.forEach(elementDelete => {
        this.eventoService.deleteEvento(elementDelete).subscribe((element)=>(
          this.ngOnInit()
        ))
      });
    }
    this.eventsTemp=[];
    this.eventsUpdate=[];
    this.eventsDelete=[];
    this.events.splice(0);
    this.getEventos();
    this.ngOnInit();
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

      dateClick: (dateClickEvent) =>  {        
        this.dateClick(dateClickEvent);
      },
      eventClick: (eventClickEvent) =>  {
        console.log("Event CLICKED !!!", eventClickEvent);
      },  
      eventReceive: (eventReceiveEvent) => {
        this.eventReceive(eventReceiveEvent);
      },
      eventResize: (eventResizeEvent) => {
        this.eventResize(eventResizeEvent);          
      },
      eventDrop: (eventClickEvent) =>  {
        console.log("Event drop !!!", eventClickEvent.event); 
        this.eventDrop(eventClickEvent); 
      }, 
      eventDragStop: (eventDragStop) =>  {
        console.log("Eliminar: ", eventDragStop.event);
        this.eventDragStop(eventDragStop);
      },  
      events: this.events           
    };
  }  



  // FUNCIONES //

      // CLICK DATE //

  dateClick(model) {
    console.log("DATE CLICKED !!!", model.dateStr);
  }

      // CLICK EVENTO //
      
  eventClick(model) {
    console.log(model);
  }
  
      // EVENTOS RECIBIDOS EXTERNAMENTE //    

  eventReceive(eventReceiveEvent){    
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

      if(esSolicitud){
        this.evento.tipoEvento = tipoEv = this.tipoEventos.find(tipo => tipo.id == Number(eventReceiveEvent.event.id));         
        this.viewModal = true;    
      } 
      console.log("evento ", this.evento);
      this.eventsTemp.push(this.evento);
       
  }
 

      // EVENTO ARRASTRADO FUERA //

  eventDragStop(eventDragStop) {
      const eventoTemp = this.eventsTemp.find(event => event.id == eventDragStop.event._instance.instanceId);
      const eventoUpdate = this.eventsUpdate.find(event => event.id == eventDragStop.event._def.publicId);
      const eventoDelete = this.events.find(event => event.id == eventDragStop.event._def.publicId);
      
      if(eventoTemp != null){
        console.log("Resultado: ", eventoTemp);
        const index = this.eventsTemp.indexOf(eventoTemp);
        //this.eventsTemp.splice(index,1);
        eventDragStop.event.remove();
        return;
      }
      if(eventoUpdate != null){
        console.log("Resultado DB: ", eventoUpdate);
        const indexUpdate = this.eventsUpdate.indexOf(eventoUpdate);
        this.eventsUpdate.push(eventoUpdate);
        this.eventsUpdate.splice(indexUpdate,1);
        eventDragStop.event.remove();
        return;
      }
      if(eventoDelete != null){
        console.log("Resultado DB to delete: ", eventoDelete);
        const indexDelete = this.events.indexOf(eventoDelete);
        this.eventsDelete.push(eventoDelete);
        //this.events.splice(indexDelete,1);
        //return;
      }
      eventDragStop.event.remove();
  }

      // EVENTO DROPEADO //
      
  eventDrop(eventClickEvent) {
    // EVENTO GUARDADO EN BASE //
    // hago update y pusheo a lista eventsUpdate //
    const eventoTemp = this.eventsTemp.find(event => event.id.toString() == eventClickEvent.event._instance.instanceId.toString());
    const indexTemp = this.eventsTemp.indexOf(eventoTemp);  
    const eventoDelete = this.eventsDelete.find(event => event.id == eventClickEvent.event._def.publicId);
    const indexDelete = this.eventsDelete.indexOf(eventoDelete);
    const eventoUpdate = this.eventsUpdate.find(event => event.id == eventClickEvent.event._def.publicId);
    const indexUpdate = this.eventsUpdate.indexOf(eventoUpdate);
    console.log(this.events);
    console.log(eventClickEvent);
    console.log(eventoUpdate);
    console.log(indexUpdate);
    if(eventClickEvent.event.source != null){
      console.log("VIENE DE LA BASE!!!");
      //console.log("Evento en base: ",eventClickEvent.event);
      let esSolicitud: boolean = (eventClickEvent.event.backgroundColor == 'crimson');    

      const yearStart = eventClickEvent.event.start.getFullYear();
      const monthStart = (Number(eventClickEvent.event.start.getMonth())+1);
      const dateStart = eventClickEvent.event.start.getDate();  
      const hourStart = eventClickEvent.event.start.getHours();

      var yearEnd;
      var monthEnd;
      var dateEnd;
      var hourEnd;

      if (eventClickEvent.event.end != null){
        yearEnd = eventClickEvent.event.end.getFullYear();
        monthEnd = (Number(eventClickEvent.event.end.getMonth())+1);
        dateEnd = eventClickEvent.event.end.getDate();  
        hourEnd = eventClickEvent.event.end.getHours();
      }
      else{
        yearEnd ='';
        monthEnd = '';
        dateEnd = '';
        hourEnd = '';
      }

      let timeStart;
      let timeEnd;

      if(hourStart<10){
        timeStart = " 0"+hourStart.toString()  + ":00";          
      }
      else{
        timeStart = (esSolicitud) ? '': (' ' + eventClickEvent.event.start.getHours());  
      } 
      if(hourEnd<10){
        timeEnd = " 0"+hourEnd.toString()  + ":00";          
      }
      else{
        timeEnd = (esSolicitud) ? '': (' ' + eventClickEvent.event.end.getHours());  
      } 
     
      this.evento = {
        id: eventClickEvent.event._def.publicId,
        title: eventClickEvent.event.title,
        description: eventClickEvent.event.title,
        start: (yearStart+ "-"+ ((monthStart >9 ) ? monthStart : "0"+monthStart.toString()) + "-"+ ((dateStart >9 ) ? dateStart : "0"+dateStart.toString()) + timeStart),
        end: (yearEnd+ "-"+ ((monthEnd >9 ) ? monthEnd : "0"+monthEnd.toString()) + "-"+ ((dateEnd >9 ) ? dateEnd : "0"+dateEnd.toString()) + timeEnd),
        backgroundColor: eventClickEvent.event.backgroundColor,
        borderColor: eventClickEvent.event.borderColor,
        color: "#FFFFFF",
        editable: true,
        enabled: true,
        newEvent: eventClickEvent.event.newEvent,
        tipoEvento: (this.events.find(event => event.id == eventClickEvent.event.id)).tipoEvento,
        usuario: (this.events.find(event => event.id == eventClickEvent.event.id)).usuario
      }
      //console.log("evento en base se guarda en eventsUpdate: ", this.evento);
      if(eventoTemp != undefined){this.eventsTemp.splice(indexTemp,1)};
      if(eventoDelete != undefined){this.eventsDelete.splice(indexDelete,1)}; 
      if(eventoUpdate != undefined){this.eventsUpdate.splice(indexUpdate,1)};
      this.eventsUpdate.push(this.evento);
    }
    
    // EVENTO NUEVO eventsTemp//

    else{
      console.log("Event drop nuevo!!!", eventClickEvent);  
       
      var _tipoEvento;
      var _usuario;
      _tipoEvento = this.eventsTemp[indexTemp].tipoEvento;
      _usuario = this.eventsTemp[indexTemp].usuario;
      
      console.log(_tipoEvento);
      console.log(_usuario);
      console.log(eventoTemp);
      console.log(indexTemp);
      // evento en lista de eventos nuevos (eventsTemp update)//
      if(eventoTemp != null){
        const yearStart = eventClickEvent.event.start.getFullYear();
        const monthStart = (Number(eventClickEvent.event.start.getMonth())+1);
        const dateStart = eventClickEvent.event.start.getDate(); 
        const time = (eventClickEvent.event.backgroundColor == 'crimson') ? '': (" "+(eventClickEvent.event.title).substring(0,5));
        this.eventsTemp[indexTemp].start = (yearStart+ "-"+ ((monthStart >9 ) ? monthStart : "0"+monthStart.toString()) + "-"+ ((dateStart >9 ) ? dateStart : "0"+dateStart.toString()) + time);        
       
        if (eventClickEvent.event.end != null){            
          const yearEnd = eventClickEvent.event.end.getFullYear();
          const monthEnd = (Number(eventClickEvent.event.end.getMonth())+1);
          const dateEnd = eventClickEvent.event.end.getDate();              
          this.eventsTemp[indexTemp].end = (yearEnd+ "-"+ ((monthEnd >9 ) ? monthEnd : "0"+monthEnd.toString()) + "-"+ ((dateEnd >9 ) ? dateEnd : "0"+dateEnd.toString()) + time);          
        }  
      }

      // evento no existe (pusheo en eventsTemp)//
      else{
        const time = (eventClickEvent.event.backgroundColor == 'crimson') ? '': (" "+(eventClickEvent.event.title).substring(0,5));  
        const year = eventClickEvent.event.start.getFullYear();
        const month = (Number(eventClickEvent.event.start.getMonth())+1);
        const date = eventClickEvent.event.start.getDate();    
        const _end = (eventClickEvent.event.end === null) ? '': (eventClickEvent.event.end.getFullYear()+ "-"+ (Number(eventClickEvent.event.end.getMonth())+1)+ "-"+ eventClickEvent.event.end.getDate());        
        //console.log(_end);
        var _title;
        if(((eventClickEvent.event.title).substring(0,5) == "08:00") || ((eventClickEvent.event.title).substring(0,5) == "20:00")){
          _title = eventClickEvent.event.title.substring(6,100);          
        }
        else{
          _title = eventClickEvent.event.title;
        }
        this.evento = {
          id: eventClickEvent.event._instance.instanceId,
          title: _title,
          description: eventClickEvent.event.title,
          start: (year+ "-"+ ((month >9 ) ? month : "0"+month.toString()) + "-"+ ((date >9 ) ? date : "0"+date.toString()) + time),
          end: _end,
          backgroundColor: eventClickEvent.event.backgroundColor,
          borderColor: eventClickEvent.event.borderColor,
          color: "#FFFFFF",
          editable: true,
          enabled: true,
          newEvent: eventClickEvent.event.newEvent,
          tipoEvento: _tipoEvento,
          usuario: _usuario
        }
        console.log("evento nuevo se guarda en eventsTemp: ", this.evento);
        this.eventsTemp.push(this.evento);
      }     

    }
  }
  
      // EVENTO REDIMENSIONADO //


  eventResize(eventResizeEvent) {
    const time = (eventResizeEvent.event.backgroundColor == 'crimson') ? '': (" "+(eventResizeEvent.event.title).substring(0,5));

    const result = this.eventsTemp.find(event => event.id == eventResizeEvent.event._instance.instanceId);
    const index = this.eventsTemp.indexOf(result);
    console.log(result);
    console.log(index);
    
    const resultDB = this.events.find(event => event.id == eventResizeEvent.event.id);
    const indexDB = this.events.indexOf(resultDB);
    console.log(resultDB);
    console.log(indexDB);

    const yearStart = eventResizeEvent.event.start.getFullYear();
    const monthStart = (Number(eventResizeEvent.event.start.getMonth())+1);
    const dateStart = eventResizeEvent.event.start.getDate();   

    const yearEnd = eventResizeEvent.event.end.getFullYear();
    const monthEnd = (Number(eventResizeEvent.event.end.getMonth())+1);
    const dateEnd = eventResizeEvent.event.end.getDate();  

    if(eventResizeEvent.event.source != null){
      console.log("VIENE DE LA BASE!!! Resize");
      resultDB.start = (yearStart+ "-"+ ((monthStart >9 ) ? monthStart : "0"+monthStart.toString()) + "-"+ ((dateStart >9 ) ? dateStart : "0"+dateStart.toString()) + time);
      resultDB.end = (yearEnd+ "-"+ ((monthEnd >9 ) ? monthEnd : "0"+monthEnd.toString()) + "-"+ ((dateEnd >9 ) ? dateEnd : "0"+dateEnd.toString()) + time);
      const resultUpdate = this.eventsUpdate.find(event => event.id == resultDB.id);
      const indexUpdate = this.eventsUpdate.indexOf(resultUpdate);
      this.eventsUpdate.splice(indexUpdate, 1);
      this.eventsUpdate.push(resultDB);
    }
    else{
      console.log("Evento nuevo temp!!! Resize");
      result.start = (yearStart+ "-"+ ((monthStart >9 ) ? monthStart : "0"+monthStart.toString()) + "-"+ ((dateStart >9 ) ? dateStart : "0"+dateStart.toString()) + time);
      result.end = (yearEnd+ "-"+ ((monthEnd >9 ) ? monthEnd : "0"+monthEnd.toString()) + "-"+ ((dateEnd >9 ) ? dateEnd : "0"+dateEnd.toString()) + time);
    }
  }

}