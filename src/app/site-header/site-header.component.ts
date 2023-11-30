import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  constructor(private readonly appService:AppService, private readonly router: Router) {}
  
  isLoged? :boolean;
  isAdmin? :boolean;
  isUser? :boolean;

  ngOnInit(): void {
    this.appService.isLoggedIn$.subscribe(isLoggedIn => {
     this.isLoged = isLoggedIn;
     this.isLoged = (localStorage.getItem('token') != null)
     this.isAdmin = (localStorage.getItem('role') == "admin")
     this.isUser = (localStorage.getItem('role') == "user")
    });
  }

  logOut(){
    this.isLoged = false;
    this.isUser = false;
    this.isAdmin = false;
    localStorage.clear();
    this.router.navigate(['']);
  }
}
