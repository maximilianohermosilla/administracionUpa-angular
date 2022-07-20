import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-clave',
  templateUrl: './clave.component.html',
  styleUrls: ['./clave.component.css']
})
export class ClaveComponent implements OnInit {

  checkEmail: boolean=false;
  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
  }

  sendMail(){    
      this.emailService.sendWelcome().subscribe((element)=>(
        console.log(element),
        this.ngOnInit()
      ));   
      this.checkEmail = true; 
  }

}
