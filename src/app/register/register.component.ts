import { Component } from '@angular/core';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private readonly appService:AppService){

  }


  password: string ='';
  name: string ='';
  surname: string ='';
  username: string ='';
  date:string = '';
  valid: boolean = false;

  register(){
    this.appService.register(this.username,this.password,this.name,this.surname,this.date).subscribe(res => {

    })
  }

  check(){
    this.valid = this.password != '' && this.name != '' && this.surname != '' && this.username != '' && this.date != ''; 
  }
}
