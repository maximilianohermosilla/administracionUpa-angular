import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import ExternalDraggable from '@fullcalendar/interaction/interactions-external/ExternalDraggable';
import esLocale from '@fullcalendar/core/locales/es';
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
  public options: any;

  constructor() { }

  ngOnInit(): void {   
    this.draggableEl1 = document.getElementById('external1');
    this.draggableEl2 = document.getElementById('external2');
    this.events = [
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
    ]

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
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
      eventDragStop: (eventClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
        console.log("Event drag stop !!!", eventClickEvent.event.title, eventClickEvent.event.start, eventClickEvent.event.backgroundColor, eventClickEvent.event.borderColor, eventClickEvent.event.textColor);
        console.log("Event drag stop !!!", eventClickEvent.event);
      },      
      eventReceive: (eventReceiveEvent) => {
        console.log("EXTERNAL EVENT LAND ON THE CALENDAR. Title: " + eventReceiveEvent.event.title + " Selected shift: " + eventReceiveEvent.selectedShift);
        console.log("EXTERNAL EVENT LAND ON THE CALENDAR. Title: " + eventReceiveEvent.event.title + " Selected start: " + eventReceiveEvent.event.start);

        console.log(eventReceiveEvent.event);
      },
      eventDrop: (eventClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
        console.log("Event drop !!!", eventClickEvent.event.title, eventClickEvent.event.start, eventClickEvent.event.backgroundColor, eventClickEvent.event.borderColor, eventClickEvent.event.textColor);
        console.log("Event drop !!!", eventClickEvent.event);
      },  
          
    };
    
     
    //console.log(this.external);
    //console.log(this.draggableEl1);

    new Draggable(this.draggableEl1, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          id: eventEl.id,
          create: true
        };
      }
    });

    new Draggable(this.draggableEl2, {
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
  eventDrop(model) {
    console.log(model);
  }
}
