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
  constructor(private emailService: EmailService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  sendMail(){    
      this.emailService.sendWelcome().subscribe((element)=>(
        //console.log(element),
        this.ngOnInit()
      ));   
      this.checkEmail = true; 
      this.confirm();
  }

  confirm() {
    this.confirmationService.confirm({
      message: '¿ Estás seguro ?',
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
