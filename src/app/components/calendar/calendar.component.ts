import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import ExternalDraggable from '@fullcalendar/interaction/interactions-external/ExternalDraggable';
//import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  
  @ViewChild('external') external: ElementRef;
  draggableEl;
  public events: any[] = [];
  public options: any;

  constructor() { }

  ngOnInit(): void {   
    this.draggableEl = document.getElementById('external');
    this.events = [
      {
        title: "Evento 1",
        start:'2022-04-16 08:00',        
        description: "Guardia"
      },
      {
        title: "Paula",
        start: '2022-04-13 08:00',
        end: '2022-04-13 20:00',
        description: "Guardia 2"
      },
      {
        title: "Yanina",
        start: '2022-04-13 20:00',
        description: "Guardia 2"
      },
      {
        title: "Cambio de guardia",
        start: '2022-04-13',
        description: "Guardia 2"
      },
      {
        title: "Vacaciones chechu",
        start: '2022-04-07',
        end: '2022-04-21',
        color: 'red',
        description: "Guardia 2"
      },
    ]

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      //locale: esLocale,
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
        console.log("DATE CLICKED !!!", dateClickEvent);
      },
      eventClick: (eventClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
        console.log("Event CLICKED !!!", eventClickEvent);
      },
      eventDragStop: (eventClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
        console.log("Event drop !!!", eventClickEvent);
      },      
      eventReceive: (eventReceiveEvent) => {
        console.log("EXTERNAL EVENT LAND ON THE CALENDAR. Title: " + eventReceiveEvent.event.title + " Selected shift: " + eventReceiveEvent.selectedShift);
        console.log("EXTERNAL EVENT LAND ON THE CALENDAR. Title: " + eventReceiveEvent.event.title + " Selected start: " + eventReceiveEvent.event.start);

        console.log(eventReceiveEvent);
      }
          
    };
    
     
    console.log(this.external);
    console.log(this.draggableEl);

    new Draggable(this.draggableEl, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          id: eventEl.id,
          create: true
        };
      }
    });

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
}
