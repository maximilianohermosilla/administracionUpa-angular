import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-clave',
  templateUrl: './clave.component.html',
  styleUrls: ['./clave.component.css'],
  providers: [ConfirmationService]
})
export class ClaveComponent implements OnInit {

  checkEmail: boolean=false;
  emailMessage;
  constructor(private emailService: EmailService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

  }

  sendMail(){    
      this.emailService.sendWelcome().subscribe((element)=>(
        console.log(element),
        (element != '')? this.emailMessage='Solicitud procesada con éxito': "Ocurrió un error",
        this.sendDialog()   
      ));   
      this.checkEmail = true;       
  }

  sendDialog() {
    this.confirmationService.confirm({
      message: this.emailMessage,
      key: 'sendMail',
      header: 'Administración UPA 10',
      acceptLabel: 'Cerrar'
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Elija una de las tres opciones',
      key: 'fullDialog',
      header: 'Administración UPA 10',
      accept:()=>{console.log("Accepted")},
      reject:()=>{console.log("Rejected")}
    });
  }

  confirmSure() {
    this.confirmationService.confirm({
      message: '¿ Estás seguro ?',
      key: 'areYouSure',
      header: 'Administración UPA 10',
      accept:()=>{console.log("Accepted")},
      reject:()=>{console.log("Rejected")}
    });
  }

  updateValueIndex() {
    alert('Add Code to Update');
  }

  CancelToAdd() {
    alert('Cancel Adding Duplicate Value');
  }

  AddDuplicate() {
    alert('Add code for adding duplicate value');
  }

}
