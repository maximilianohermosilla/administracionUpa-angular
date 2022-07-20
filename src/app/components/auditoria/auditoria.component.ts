import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  @Output() btnToggleEnabled = new EventEmitter();
  @Output() btnToggleEdit = new EventEmitter();  
  public logs: any[] = [];
  title = '';
  
  constructor(private usuarioService: UsuarioService, private spinnerService: SpinnerService, private logService: LogService) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(){  
    this.spinnerService.show();   
    this.logService.getAll().subscribe(data =>{
      this.logs = data;
      console.log(this.logs);
    });
    this.spinnerService.hide();
  }

}
