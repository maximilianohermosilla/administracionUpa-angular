import * as XLSX from 'xlsx';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Evento } from 'src/app/models/evento';
import { TipoEvento } from 'src/app/models/tipoEvento';
import { Usuario } from 'src/app/models/usuario';
import { EventoService } from 'src/app/services/evento.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TipoeventoService } from 'src/app/services/tipoevento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ExcelService } from 'src/app/services/excel.service';
import { XLSX$Consts } from 'xlsx';

@Component({
  selector: 'app-guardias',
  templateUrl: './guardias.component.html',
  styleUrls: ['./guardias.component.css']
})
export class GuardiasComponent implements OnInit {
  @ViewChild('external') external: ElementRef;
  viewModal: boolean = false;
  viewSaveModal: boolean = false;
  viewDeleteModal: boolean = false;
  public events: any[] = [];
  public tipoEventos: TipoEvento[] = [];
  public usuarios: Usuario[] = [];
  public options: any;
  public evento: Evento;
  public filterUser: number = 1;
  public filterTipoEvento: number = 0;    
  userSolicitud: Usuario = {name: '', lastName: '', user: '', password: '', email: '', legajo: '', fecha_nac: '', color: '', habilitado: true, diasFavor: 0, diasVacaciones: 0};
  excel: any;
  constructor(private eventoService: EventoService, private tipoEventoService: TipoeventoService, private usuarioService: UsuarioService,
               private formBuilder: FormBuilder, private sant: DomSanitizer, private spinnerService: SpinnerService, private excelService: ExcelService) { 
    
  }

  ngOnInit(): void {  
    this.getEventos();
    this.getTipoEvento();
    this.getUsuarios();
    this.setOptions(); 
  }

  // GETTERS //

  getEventos(){  
    this.spinnerService.show();   
    this.eventoService.getEventosAll().subscribe(data =>{
      this.events = data;
    });
    this.spinnerService.hide();
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

  searchFilter(idUsuario: number, idTipoEvento: number){
    this.spinnerService.show();
    console.log(idUsuario + '  ' + idTipoEvento);
    this.events = [];
    this.eventoService.getEventosFilter(idUsuario, idTipoEvento).subscribe(data =>{
      this.events = data;   
      this.spinnerService.hide();   
      console.log(this.events);
    });
    
  }

  searchUser(event){
    this.filterUser = event.target.value;
    console.log(this.filterUser);
    this.searchFilter(this.filterUser, this.filterTipoEvento);
  }

  searchTipoEvento(event){
    console.log(event);
    this.filterTipoEvento = event.target.value;
    console.log(this.filterTipoEvento);
    this.searchFilter(this.filterUser, this.filterTipoEvento); 
  }

  // OPTIONS EVENTS //

  setOptions(){
    this.options = {
      height: 600,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      timeZone: "local",
      locales: [ esLocale ],
      locale: 'es',
      selectable: false,
      droppable: false,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: false,      
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
      },
      eventResize: (eventResizeEvent) => {    
      },
      eventDrop: (eventClickEvent) =>  {
        console.log("Event drop !!!", eventClickEvent.event); 
      }, 
      eventDragStop: (eventDragStop) =>  {
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
 
  exportAsXLSX():void {    
    let element = document.getElementById('full-calendar');    
    let date = new Date(); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       console.log(date);
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
       XLSX.writeFile(wb, 'Guardias_'+date.toLocaleString() +'.xlsx');
    //this.excelService.exportAsExcelFile(wb, 'Guardias');
  }

  exportExcel():void{
    //this.excel = document.getElementsByClassName('fc-dayGridMonth-view'); 
    this.excel = document.getElementById('full-calendar');      
    this.excelService.exportAsExcelFile(this.excel, 'Guardias');
  }
  
}