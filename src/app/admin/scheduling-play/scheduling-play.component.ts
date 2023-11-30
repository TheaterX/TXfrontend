import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-scheduling-play',
  templateUrl: './scheduling-play.component.html',
  styleUrls: ['./scheduling-play.component.css'],
  template: `
    <p>{{ selectedDate | date: 'yyyy-MM-dd HH:mm:ss' }}</p>
  `,
  providers: [DatePipe],
})
export class SchedulingPlayComponent implements OnInit{
  
  constructor(
    private readonly adminService:AdminService
  ){}

  plays: any[] = [];
  scenes: any[] = [];
  dates: any[] = [];
  years: number[] = [];
  hours: number = 0;
  minutes: number = 0;
  guestPlayName: string = "";
  hoursRange = Array.from({ length: 24 }, (_, i) => i);
  selectedPlay: number = -1;
  selectedScene: any;
  selectedDate: any;
  formattedDate: any;
  selectedYear: number = 0;
  scheduledPlays: any[] = [];
  premiere: boolean = false;
  guest: boolean = false;
  travels: boolean = false;

  search(){
    if(this.selectedDate != null) 
      this.formattedDate = this.selectedDate + " " + this.hours + ":" + this.minutes + ":00";
    this.adminService.searchFreeDPS(this.formattedDate,this.selectedScene,this.selectedPlay,this.selectedYear).subscribe(res => {
      console.log(res);
      this.scenes = res.scenes;
      this.dates = res.dates;
      this.plays = res.plays;
    })
    this.adminService.getRepertoires().subscribe(res =>{
      this.years = res;
    })
  }

  deselectScene(){
    this.selectedScene = null;
  }

  reset(){
    this.selectedYear = 0;
    this.selectedPlay = -1;
    this.selectedScene = null;
    this.selectedDate = null;
    this.formattedDate = null;
    this.guest = false;
    this.premiere = false;
    this.travels = false;
    this.search();
  }

  sub(){
    if(this.guest) this.selectedPlay = -1;
    if(this.selectedDate != null) 
      this.formattedDate = this.selectedDate + " " + this.hours + ":" + this.minutes + ":00";
     this.adminService.schedlePlay(this.selectedPlay,this.selectedScene,this.formattedDate,this.premiere,
       this.guest,this.travels,this.guestPlayName).subscribe(res=>{
          this.getScheduledPlays();
          this.reset();
       });
    console.log(this.guestPlayName);
  }

  getScheduledPlays(){
    this.adminService.getScheduledPlays().subscribe(res => {
      res.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.scheduledPlays = res;
    })
  }

  ngOnInit(): void {
    this.selectedPlay = -1;
    this.selectedScene = null;
    this.selectedDate = null;
    this.formattedDate = null;
    this.guest = false;
    this.hoursRange = Array.from({ length: 24 }, (_, i) => i);
    this.search();
    this.getScheduledPlays();
  }
}
