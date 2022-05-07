import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import ExternalDraggable from '@fullcalendar/interaction/interactions-external/ExternalDraggable';
import esLocale from '@fullcalendar/core/locales/es';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/evento';

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
  eventResize(model) {
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
      dateClick: (dateClickEvent) =>  {
        console.log("DATE CLICKED !!!", dateClickEvent.dateStr);
        this.dateClick(dateClickEvent);
      },
      eventClick: (eventClickEvent) =>  {
        console.log("Event CLICKED !!!", eventClickEvent);
      },
      eventDragStop: (eventDragStop) =>  {
        console.log(eventDragStop.event);
        const result = this.eventsTemp.find(event => event.id == eventDragStop.event._instance.instanceId);
        const index = this.eventsTemp.indexOf(result);
        this.eventsTemp.splice(index,1);
        eventDragStop.event.remove();

      },  
      eventReceive: (eventReceiveEvent) => {
        const time = (eventReceiveEvent.event.backgroundColor == 'crimson') ? '': (" "+(eventReceiveEvent.event.title).substring(0,5));
        this.evento = {
            id: eventReceiveEvent.event._instance.instanceId,
            title: eventReceiveEvent.event.title,
            description: eventReceiveEvent.event.title,
            start: (eventReceiveEvent.event.start.getFullYear()+ "-"+ (Number(eventReceiveEvent.event.start.getMonth())+1)+ "-"+ eventReceiveEvent.event.start.getDate()+ time),
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
      eventResize: (eventResizeEvent) => {
        console.log(eventResizeEvent);  
        const time = (eventResizeEvent.event.backgroundColor == 'crimson') ? '': (" "+(eventResizeEvent.event.title).substring(0,5));
        const result = this.eventsTemp.find(event => event.id == eventResizeEvent.event._instance.instanceId);
        const index = this.eventsTemp.indexOf(result);
        this.eventsTemp[index].start = (eventResizeEvent.event.start.getFullYear()+ "-"+ (Number(eventResizeEvent.event.start.getMonth())+1)+ "-"+ eventResizeEvent.event.start.getDate()+ time);
        this.eventsTemp[index].end = (eventResizeEvent.event.end.getFullYear()+ "-"+ (Number(eventResizeEvent.event.end.getMonth())+1)+ "-"+ eventResizeEvent.event.end.getDate()+ time);
        
      },
      eventDrop: (eventClickEvent) =>  {  
        console.log("Event drop !!!", eventClickEvent.event);  
        const time = (eventClickEvent.event.backgroundColor == 'crimson') ? '': (" "+(eventClickEvent.event.title).substring(0,5));      
        const _end = (eventClickEvent.event.end === null) ? '': (eventClickEvent.event.end.getFullYear()+ "-"+ (Number(eventClickEvent.event.end.getMonth())+1)+ "-"+ eventClickEvent.event.end.getDate());        
        //console.log(_end);
        this.evento = {
          id: eventClickEvent.event._instance.instanceId,
          title: eventClickEvent.event.title,
          description: eventClickEvent.event.title,
          start: (eventClickEvent.event.start.getFullYear()+ "-"+ (Number(eventClickEvent.event.start.getMonth())+1)+ "-"+ eventClickEvent.event.start.getDate()+ time),
          end: _end,
          background_color: eventClickEvent.event.backgroundColor,
          border_color: eventClickEvent.event.borderColor,
          color: "#FFFFFF",
          editable: "1"
      }
      console.log("evento ", this.evento);
      this.eventsTemp.push(this.evento);
      },  
          
    };
  }
}