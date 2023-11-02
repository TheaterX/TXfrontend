import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-create-play',
  templateUrl: './create-play.component.html',
  styleUrls: ['./create-play.component.css']
})
export class CreatePlayComponent implements OnInit{
  constructor(
    private readonly adminService:AdminService
  ){}

  play: any = { genres: [],directors: [] ,roles: [], grade: 3}; // Initialize the Play object
  role: any = {}; // Initialize the Role object
  actor:any = {};
  scenes: any[] = [ /* Replace with your actual scene data */ ];
  genres: any[] = [ /* Replace with your actual genre data */ ];
  directors: any[] = [ /* Replace with your actual director data */ ];
  actors: any[] = [ /* Replace with your actual actor data */ ];
  savePlay() {
    // Implement the save functionality, e.g., send data to a server
    this.play.directors = this.directors.filter(director => director.checked).map(director => director.umcn);
    this.play.genres = this.genres.filter(genre => genre.checked).map(genre => genre.name);
    this.adminService.createPlay(this.play).subscribe();
    console.log('Saved Play:', this.play);
  }

  deleteFromRoles(role:any){
    this.play.roles.pop(role);
    console.log(this.play.roles);
  }

  attachRole(){
    if(Object.keys(this.actor).length === 0)
      this.role.actor = this.actors.at(0);
    else
      this.role.actor = this.actor;
    for(let i = 0;i <this.play.roles.length;i++){
      if(this.role.roleName === this.play.roles[i].roleName)
        return;
    }
    this.play.roles.push(this.role);
    this.role = {};
  }

  selectActor(actor:any){
    this.actor = actor;
  }

  ngOnInit(): void {
    this.adminService.getScenes().subscribe(res => {
      this.scenes = res;
    })
    this.adminService.getActors().subscribe(res => {
      this.actors = res;
      this.actor = res.at(0);
    })
    this.adminService.getDirectors().subscribe(res => {
      this.directors =res;
    })
    this.adminService.getGenres().subscribe(res => {
      this.genres = res;
    })
  }
}
