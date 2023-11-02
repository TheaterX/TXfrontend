import { Component, OnInit } from '@angular/core';
import { IActor } from '../model/IActor';
import { IDirector } from '../model/IDirector';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-create-director',
  templateUrl: './create-director.component.html',
  styleUrls: ['./create-director.component.css']
})
export class CreateDirectorComponent implements OnInit {
  actors: IActor[] = [];
  directors:IDirector[] = [];
  
  actorName: string = '';
  actorSurname: string= '';
  actorUMCN: string= '';

  directorName: string= '';
  directorSurname: string= '';
  directorUMCN: string= '';
  directorTitle: string= '';;

  newActor! :IActor;
  newDirector! :IDirector;

  constructor(
    private adminService: AdminService 
  ) {}
  
  getActors() {
    this.adminService.getActors().subscribe(res => {
      this.actors = res;
    })
  }

  createActor(){
    this.newActor = {name:this.actorName, surname:this.actorSurname,umcn:this.actorUMCN}
    this.adminService.createActor(this.newActor).subscribe(res =>{
      this.getActors();
    });
    this.emptyActor()
  }

  createDirector(){
    this.newDirector = {name:this.directorName, surname:this.directorSurname,
      umcn:this.directorUMCN,title:this.directorTitle}
    this.adminService.createDirector(this.newDirector).subscribe(res =>{
      this.getDirectors();
    });
    this.emptyDirector();
  }

  getDirectors(){
    this.adminService.getDirectors().subscribe(res => {
      this.directors = res;
    })
  }

  emptyActor(){
    this.actorName = '';
    this.actorSurname = '';
    this.actorUMCN = '';
  }

  emptyDirector(){
    this.directorName = '';
    this.directorSurname = '';
    this.directorUMCN = '';
    this.directorTitle = '';
  }

  ngOnInit(): void {
      this.getActors();
      this.getDirectors();
  }
}
