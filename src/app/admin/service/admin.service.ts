import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IActor } from '../model/IActor';
import { IDirector } from '../model/IDirector';
import { IScene } from '../model/IScene';
import { ISeat } from '../model/ISeat';
import { ICreateScene } from '../model/ICreateScene';
import { forkJoin, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiHost: string = 'http://localhost:8080/api';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private readonly http: HttpClient
  ) { }


  getActors() {
    const url = this.apiHost + `/actor/all`
    return this.http.get<IActor[]>(url, { headers: this.headers })
  }

  getDirectors() {
    const url = this.apiHost + `/director/all`
    return this.http.get<IDirector[]>(url, { headers: this.headers })
  }

  createActor(newActor:IActor) {
    const url = this.apiHost + `/actor/create`
    return this.http.post<any>(url, newActor, { headers: this.headers });
  }

  createDirector(newDirector:IDirector) {
    const url = this.apiHost + `/director/create`
    return this.http.post<any>(url, newDirector, { headers: this.headers });
  }

  getSeats(sceneName:string){
    const url = this.apiHost + `/seat/all?scene=` + sceneName; 
    return this.http.get<ISeat[]>(url, { headers: this.headers });
  }

  getGenres(){
    const url = this.apiHost + `/genre/all`
    return this.http.get<any[]>(url, { headers: this.headers });
  }

  getScenes(){
    const url = this.apiHost + `/scene/all`
    return this.http.get<IScene[]>(url, { headers: this.headers });
  }

  createSecne(newScene: ICreateScene){
    const url = this.apiHost + `/scene/create`
    return this.http.post<any>(url,newScene, { headers: this.headers });
  }

  async deleteSeats(seats: ISeat[], scene: string): Promise<void> {
    const url = this.apiHost + `/seat/delete`;
    const row = "?row=";
    const num = "&number=";
    const sc = "&scene=";

    for (let i = 0; i <seats.length;i++)
    {
      const res = await lastValueFrom(this.http.delete<any>(url + row + seats[i].row + 
        num + seats[i].number + sc + scene, { headers: this.headers }));
    };
  }

  deleteScene(deleteScene: string){
    const url = this.apiHost + `/scene/delete?scene=` + deleteScene;
    return this.http.delete<any>(url, { headers: this.headers });
  }
  
  createPlay(play: any){
    const url = this.apiHost + `/play/create`
    return this.http.post<any>(url, play, { headers: this.headers });
  }
}
