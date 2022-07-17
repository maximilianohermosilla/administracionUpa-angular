import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formGroup: FormGroup;
  user: Usuario = {name: '', lastName: '', user: '', password: '', email: '', legajo: '', fecha_nac: '', color: '', habilitado: true, diasFavor: 0, diasVacaciones: 0};

  constructor(private usuarioService: UsuarioService, private spinnerService: SpinnerService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name : ['',[Validators.required]],
      lastName : ['',[]],
      user : ['',[Validators.required]],
      email : ['',[]],
      legajo : ['',[]],
      habilitado : ['',[]],
      color : ['',[]],
      diasFavor : ['',[]],
      diasVacaciones : ['',[]]
    })  
  }

  ngOnInit(): void {
  }

  onSubmit(user: Usuario){

  }

}
