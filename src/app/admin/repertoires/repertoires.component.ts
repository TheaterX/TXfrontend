import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-repertoires',
  templateUrl: './repertoires.component.html',
  styleUrls: ['./repertoires.component.css']
})
export class RepertoiresComponent implements OnInit {
  constructor(
    private readonly adminService:AdminService
  ){}
  selectedYear: number = 2023; // Default selected year
  playsInYear: any[] = []; // Array for plays in the selected year
  allPlays: any[] = []; // Array for all plays
  years: number[] = [];

  removeFromPlaysList(play:any)
  {
    if (this.playsInYear.some((item) => item.id === play.id)) {
      this.allPlays.push(play);
      this.playsInYear = this.playsInYear.filter((item) => item.id !== play.id);
    }
  }

  addToPlaysList(play:any)
  {
    if (!this.playsInYear.some((item) => item.id === play.id)) {
      this.playsInYear.push(play); // Add the element if it doesn't exist
      this.allPlays = this.allPlays.filter((item) => item.id !== play.id);
    }
  }

  newRepertoire()
  {
    this.adminService.newRepertoire(Math.max(...this.years) + 1).subscribe(res=>{
      this.loadYears();
    })
  }

  loadYears(){
    this.adminService.getRepertoires().subscribe(res =>{
      this.years = res;
    })
  }

  saveChenges(){
    this.adminService.editRepertoire(this.selectedYear,this.playsInYear.map((obj) => obj.id)).subscribe();
  }

  loadPlaysForYear(){
    this.allPlays = [];
    this.adminService.getPlaysForYear(this.selectedYear).subscribe(res=>{ 
      this.playsInYear = res;
      this.adminService.getPlays().subscribe(res=>{ 
        for(const play of res){
          if (!this.playsInYear.some((item) => item.id === play.id)) {
            this.allPlays.push(play); // Add the element if it doesn't exist
          }
        }
      });
    });
  }

  ngOnInit() {
    this.loadPlaysForYear();
    this.loadYears();
    
  }
}
