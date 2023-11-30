import { Component } from '@angular/core';
import { AppService } from '../service/app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor( private readonly appService : AppService, private readonly router: Router) {}

  username: string = '';
  password: string = '';
  wrongCredentials = false;
  

  login() {
    this.appService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        var decodedToken =  this.appService.getDecodedAccessToken(res.token);
        if(decodedToken.role === "CLASSIC")
          localStorage.setItem('role', 'user')
        if(decodedToken.role === "ADMIN")
          localStorage.setItem('role', 'admin')
        this.router.navigate(['user/plays'])
        // Other success handling logic
        this.appService.isLoggedInSubject.next(true);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error:', error);
        if (error.status === 401) {
          this.wrongCredentials = true;
          // Handle the unauthorized (401) error here
        } else {
          // Handle other errors as needed
        }
      },
    });
  }
}
