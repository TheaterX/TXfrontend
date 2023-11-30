import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.css']
})
export class PlaysComponent implements OnInit {
  
  constructor(private readonly userSerice:UserService,private readonly router:Router){}

  scheduledPlays: any[] = [];


  redirectToPlay(id: number, name: string){
    this.userSerice.selectedPlay = id;
    this.router.navigate(['user/play',name]);
  }

  ngOnInit(): void {
    this.userSerice.getScheduledPlays().subscribe(res =>{
      res.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.scheduledPlays = res;
    })
  }
}
