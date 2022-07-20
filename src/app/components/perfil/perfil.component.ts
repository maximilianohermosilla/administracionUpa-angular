import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formGroup: FormGroup;
  user: Usuario = {id: 0, name: '', lastName: '', user: '', password: '', email: '', legajo: '', fechaNac: '', color: '', habilitado: true, diasFavor: 0, diasVacaciones: 0, horasFavor: 0};
  photo: string;
  imageUrl: string;
  isAdmin=false;

  constructor(private usuarioService: UsuarioService, private spinnerService: SpinnerService, private formBuilder: FormBuilder, private domSanitizer: DomSanitizer) {
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
    this.spinnerService.show();   
    this.usuarioService.findUsuario(1).subscribe(data =>{
      this.user = data;
      this.setPerfil();
    });
    this.usuarioService.getProfilePhoto(1).subscribe(data =>{     
      this.photo = data;      
    });
    console.log(this.photo);
    this.imageUrl= this.domSanitizer.bypassSecurityTrustResourceUrl(this.photo) as string;
    console.log(this.imageUrl);
    this.transform(this.imageUrl);
    this.youAreAdmin();
    this.spinnerService.hide();    
  }

  transform (value: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

  youAreAdmin(){
    if(!this.isAdmin){
      this.formGroup.controls['user'].disable();
      this.formGroup.controls['diasFavor'].disable();
      this.formGroup.controls['diasVacaciones'].disable();
    }
    return this.isAdmin;
  }

  setPerfil(){        
    this.formGroup.controls['name'].setValue(this.user.name);
    this.formGroup.controls['lastName'].setValue(this.user.lastName);
    this.formGroup.controls['user'].setValue(this.user.user);
    this.formGroup.controls['email'].setValue(this.user.email);
    this.formGroup.controls['legajo'].setValue(this.user.legajo);
    this.formGroup.controls['color'].setValue(this.user.color);
    this.formGroup.controls['diasFavor'].setValue(this.user.diasFavor);
    this.formGroup.controls['diasVacaciones'].setValue(this.user.diasVacaciones);
    //this.title="Editar Usuario: " + this.user.name +  " " + this.user.lastName ;
  }

  onSubmit(user: Usuario){

  }

}
