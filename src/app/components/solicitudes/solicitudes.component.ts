import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  @Output() btnToggleEnabled = new EventEmitter();
  @Output() btnToggleEdit = new EventEmitter();  
  public solicitudes: any[] = [];
  title = '';
  
  constructor(private usuarioService: UsuarioService, private spinnerService: SpinnerService, private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.getSolicitudes();
  }

  getSolicitudes(){  
    this.spinnerService.show();   
    this.solicitudService.getAll().subscribe(data =>{
      this.solicitudes = data;
      console.log(this.solicitudes);
    });
    this.spinnerService.hide();
  }

}
