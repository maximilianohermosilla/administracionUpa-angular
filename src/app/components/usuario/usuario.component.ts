import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @Output() btnToggleEnabled = new EventEmitter();
  @Output() btnToggleEdit = new EventEmitter();
  public usuarios: any[] = [];
  user: Usuario = {name: '', lastName: '', user: '', password: '', email: '', legajo: '', fecha_nac: '', color: '', habilitado: true};

  constructor(private usuarioService: UsuarioService, private spinnerService: SpinnerService) {  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){  
    this.spinnerService.show();   
    this.usuarioService.getUsuarios().subscribe(data =>{
      this.usuarios = data;
      console.log(data);
    });
    this.spinnerService.hide();
  }

  insertUsuario(usuario: Usuario){

  }

  updateUsuario(usuario: Usuario){
    this.usuarioService.updateUsuario(this.user).subscribe((element)=>(
      this.ngOnInit()
    ));
  }

  deleteUsuario(usuario: Usuario){

  }

  toggleEnabled(usuario){
    this.user = usuario;
    this.user.habilitado = !this.user.habilitado;
    console.log(this.user);
    this.updateUsuario(this.user);
  }

  toggleEdit(evento){
    console.log(evento);
  }

}
