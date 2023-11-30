import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-your-reservations',
  templateUrl: './your-reservations.component.html',
  styleUrls: ['./your-reservations.component.css']
})
export class YourReservationsComponent implements OnInit {

  constructor(private readonly userSerice:UserService){}
  
  yourReservations: any[] = [];

  cancelRes(id:number){
    this.userSerice.cancelReservation(id).subscribe(res => {

    });
    this.loadReservations();
  }

  loadReservations(){
    this.userSerice.getReservations().subscribe(res => {
      res.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.yourReservations = res;
      this.yourReservations = this.yourReservations.map(reserv => {
        reserv.date = moment(reserv.date).utc().format('YYYY-MM-DD HH:mm:ss');
        return reserv;
      });
    })
  }

  ngOnInit(): void {
    this.loadReservations();
  }
}
