import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import ExternalDraggable from '@fullcalendar/interaction/interactions-external/ExternalDraggable';
import esLocale from '@fullcalendar/core/locales/es';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/evento';
//import esLocale from '@fullcalendar/core/locales/es';

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
  public options: any;
  public evento: Evento;

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {   
    this.draggableEl1 = document.getElementById('external1');
    this.draggableEl2 = document.getElementById('external2');
    this.getEventos();
    this.setOptions();   
     
    //console.log(this.external);
    //console.log(this.draggableEl1);

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
          timeZone: "UTC"
        };
      }
    });

  }


  getEventos(){
    this.eventoService.getEventos().subscribe(data =>{
      console.log(data);
      this.events = data;
    });
  }
  
  saveEvents(){
    console.log(this.eventsTemp);
  }

  dateClick(model) {
    console.log(model);
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
      dateClick: (dateClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
        console.log("DATE CLICKED !!!", dateClickEvent.dateStr);
        this.dateClick(dateClickEvent);
      },
      eventClick: (eventClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
        console.log("Event CLICKED !!!", eventClickEvent);
      },
      /*eventDragStop: (eventClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
        console.log("Event drag stop !!!", eventClickEvent.event.title, eventClickEvent.event.start, eventClickEvent.event.backgroundColor, eventClickEvent.event.borderColor, eventClickEvent.event.textColor);
        console.log("Event drag stop !!!", eventClickEvent.event);
      },   */   
      eventReceive: (eventReceiveEvent) => {
        this.evento = {
            title: eventReceiveEvent.event.title,
            description: eventReceiveEvent.event.title,
            start: (eventReceiveEvent.event.start.getFullYear()+ "-"+ eventReceiveEvent.event.start.getMonth()+ "-"+ eventReceiveEvent.event.start.getDate()+ " " + (eventReceiveEvent.event.title).substring(0,5)),
            end: "",
            background_color: eventReceiveEvent.event.backgroundColor,
            border_color: eventReceiveEvent.event.borderColor,
            color: "#FFFFFF",
            editable: "1"
        }
        console.log("evento ", this.evento);
        console.log(eventReceiveEvent.event);
        this.eventsTemp.push(this.evento);
      },
      eventDrop: (eventClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
        console.log("Event drop !!!", eventClickEvent.event.title, eventClickEvent.event.start, eventClickEvent.event.backgroundColor, eventClickEvent.event.borderColor, eventClickEvent.event.textColor);
        console.log("Event drop !!!", eventClickEvent.event);
      },  
          
    };
  }
}

/*this.events = [
      {
        title: "Evento 1",
        start:'2022-04-16',        
        description: "Guardia",
        allDay: true
      },
      {
        id: 14,
        title: "Paula",
        start: '2022-04-13 08:00',
        end: '2022-04-13 20:00',
        description: "Guardia 2",
        backgroundColor: 'pink',
        borderColor: 'pink',
        textColor: 'black'
      },
      {
        title: "Yanina",
        start: '2022-04-13 20:00',
        description: "Guardia 2"
      },
      {
        title: "Cambio de guardia",
        start: '2022-04-13',
        editable: false,
        description: "Guardia 2"
      },
      {
        title: "Vacaciones chechu",
        allDay: true,
        start: '2022-04-07',
        end: '2022-04-21',
        color: 'red',
        description: "Guardia 2",
        display: 'background'
      },
    ]*/