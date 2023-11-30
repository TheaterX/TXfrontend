import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISeat } from 'src/app/admin/model/ISeat';
import { AppService } from 'src/app/service/app.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiHost: string = 'http://localhost:8080/api';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  selectedPlay: number = -1;

  constructor(
    private readonly http: HttpClient,
    private readonly appService: AppService
  ) { }

  getScheduledPlays(){
    const url = this.apiHost + `/scheduledPlay/all`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  getSeats(sceneName:string){
    const url = this.apiHost + `/seat/all?scene=` + sceneName; 
    return this.http.get<ISeat[]>(url, { headers: this.headers });
  }

  getTakenSeats(playId:number, sceneName: string, date: Date){
    const url = this.apiHost + `/reservation/takenSeats?date=` + date + "&sceneName=" + 
    sceneName + "&playId=" + playId;
    return this.http.get<ISeat[]>(url, { headers: this.headers });
  }

  getUsername(){
    var decToken;
    var token: string = localStorage.getItem('token') ?? "";
    decToken = this.appService.getDecodedAccessToken(token);
    return decToken.sub;
  }

  reserveSeats(playId:number, sceneName: string, date: Date,selectedSeats:ISeat[]){
    const url = this.apiHost + `/reservation/create`;

    const body = {
      scheduledPlayKey:{playId:playId,sceneName:sceneName,scheduledDate:date},
      userUsername:this.getUsername(),
      paid:false,
      seat:selectedSeats.map((seat) => {
        const seatDTO: any = {
          id: {
            row: seat.row,
            number: seat.number,
          },
        };
        return seatDTO;})
    };
    console.log(body);
    return this.http.post<any>(url,body, { headers: this.headers });
  }

  getFullPlay(id:number){
    const url = this.apiHost + `/play/fullPlay?playId=` + id; 
    return this.http.get<any>(url, { headers: this.headers });
  }

  getReservations(){
    const url = this.apiHost + `/reservation/usersReservations?username=` + this.getUsername(); 
    return this.http.get<any>(url, { headers: this.headers });
  }


  cancelReservation(id:number){
    console.log(id);
    const url = this.apiHost + `/reservation/cancel?id=` + id; 
    return this.http.put<any>(url, { headers: this.headers });
  }

}
