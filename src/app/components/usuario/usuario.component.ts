import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
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
  formGroup: FormGroup;
  public usuarios: any[] = [];
  title = '';
  newUser: boolean = true;

  user: Usuario = {name: '', lastName: '', user: '', password: '', email: '', legajo: '', fechaNac: '', color: '', habilitado: true, diasFavor: 0, diasVacaciones: 0, horasFavor: 0};

  constructor(private usuarioService: UsuarioService, private spinnerService: SpinnerService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) {
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
    this.getUsuarios();
  }

  getUsuarios(){  
    this.spinnerService.show();   
    this.usuarioService.getUsuarios().subscribe(data =>{
      this.usuarios = data;
      console.log(data);
    });
    //this.spinnerService.hide();
  }

  insertUsuario(usuario: Usuario){
    this.user.id=null;
    this.usuarioService.insertUsuario(usuario).subscribe((element)=>(
      this.ngOnInit()
    ));
  }

  updateUsuario(usuario: Usuario){
    this.usuarioService.updateUsuario(usuario).subscribe((element)=>(
      this.ngOnInit()
    ));
  }

  deleteUsuario(usuario: Usuario){
    console.log(usuario);    
      this.usuarioService.deleteUsuario(usuario).subscribe((element)=>(
        this.ngOnInit()
      ));    
  }

  toggleEnabled(usuario){    
    this.user = usuario;
    this.user.habilitado = !this.user.habilitado;
    console.log(this.user);
    this.updateUsuario(this.user);
  }

  toggleEdit(usuario){
    this.newUser = false;
    this.user = usuario;
    this.formGroup.controls['name'].setValue(this.user.name);
    this.formGroup.controls['lastName'].setValue(this.user.lastName);
    this.formGroup.controls['user'].setValue(this.user.user);
    this.formGroup.controls['email'].setValue(this.user.email);
    this.formGroup.controls['legajo'].setValue(this.user.legajo);
    this.formGroup.controls['color'].setValue(this.user.color);
    this.formGroup.controls['diasFavor'].setValue(this.user.diasFavor);
    this.formGroup.controls['diasVacaciones'].setValue(this.user.diasVacaciones);
    this.title="Editar Usuario: " + this.user.name +  " " + this.user.lastName ;
    console.log(usuario);
  }

  toggleNewUser(){
    this.newUser = true;
    this.user = {name: '', lastName: '', user: '', password: '', email: '', legajo: '', fechaNac: '', color: '', habilitado: true, diasFavor: 0, diasVacaciones: 0, horasFavor: 0};    
    this.formGroup.controls['name'].setValue('');
    this.formGroup.controls['lastName'].setValue('');
    this.formGroup.controls['user'].setValue('');
    this.formGroup.controls['email'].setValue('');
    this.formGroup.controls['legajo'].setValue('');
    this.formGroup.controls['color'].setValue('');
    this.formGroup.controls['diasFavor'].setValue('');
    this.formGroup.controls['diasVacaciones'].setValue('');
    this.title="Ingresar nuevo usuario";
  }

  onSubmit(usuario: Usuario){
    usuario = {
      id: this.user.id,
      name : this.formGroup.value.name,
      lastName : this.formGroup.value.lastName,
      user : this.formGroup.value.user,
      password: this.user.password,
      fechaNac: this.user.fechaNac,
      email : this.formGroup.value.email,
      legajo : this.formGroup.value.legajo,
      habilitado : this.user.habilitado,
      color : this.user.color,
      diasFavor : this.formGroup.value.diasFavor,
      diasVacaciones : this.formGroup.value.diasVacaciones,
      horasFavor: this.user.horasFavor
    }
    console.log(usuario);
    this.user=usuario;
    this.newUser ? this.insertUsuario(usuario): this.updateUsuario(usuario);
    //this.ngOnInit();    
  }


  confirm(usuario: Usuario) {
    this.confirmationService.confirm({
      message: '¿Está seguro/a de eliminar a este usuario?',
      key: 'confirm',
      header: 'Eliminación de usuariuo',
      rejectLabel: 'Cancelar',
      acceptLabel: 'Confirmar',
      reject:()=>{console.log("Rejected")},
      accept:()=>{
        this.deleteUsuario(usuario);
      }
    });
  }

}
