import { Component, OnInit } from '@angular/core';
import { ISeat } from 'src/app/admin/model/ISeat';
import { UserService } from '../service/user.service';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{
  
  constructor(private readonly userService:UserService, private readonly appService:AppService) {}

  
  selectedPlay: number = -1;
  selectedScene: string = '';
  selectedDate:any
  rows: number = -1;
  numbers: number = -1;
  seats: ISeat[] = [];
  seatData: ISeat[][] = [];
  scheduledPlays: any[] = [];
  selectedSeats:ISeat[] = [];
  takenSeats: ISeat[] = [];
  yourSeats: number = 0;
  selectedRowIndex: number = -1;
  text: string = '';
  

  getRows(): ISeat  {
    return this.seats.reduce((prev, current) => {
      return (current.row > prev.row) ? current : prev;
    });
  }
  getNumbersInRow(): ISeat  {
    return this.seats.reduce((prev, current) => {
      return (current.number > prev.number) ? current : prev;
    });
  }

  selectRow(index: number,selectedPlay:number,date:any,scene: string) {
    this.yourSeats = 0;
    this.selectedSeats = [];
    this.selectedRowIndex = index;
    this.selectedPlay = selectedPlay;
    this.selectedDate = date;
    this.selectedScene = scene;
    this.getTakenSeats();
  }

  getTakenSeats(){
    this.userService.getTakenSeats(this.selectedPlay,this.selectedScene,this.selectedDate).subscribe(res => {
      this.yourSeats = 0;
      this.takenSeats = res;
      this.getSeatsForSecne(this.selectedScene);
    })
  }

  reserveSeats(){
    this.userService.reserveSeats(this.selectedPlay,this.selectedScene,this.selectedDate,this.selectedSeats).subscribe(res => {
      this.yourSeats = 0;
      this.selectedSeats = [];
      this.getScheduledPlays();
      this.getTakenSeats();
    })
  }


  seatSelected(seat:ISeat){
    if(seat.taken || seat.yours ) return;
    if(this.selectedSeats.length + this.yourSeats == 10 && !seat.selected) {
      this.text = 'Max 10 seats!'
      return;
    }
    this.text = '';
    seat.selected = !seat.selected;
    if (seat.selected) {
      this.selectedSeats.push(seat);
    } else {
      const index = this.selectedSeats.indexOf(seat);
      if (index !== -1) {
        this.selectedSeats.splice(index, 1);
      }
    }
 }

  getSeatsForSecne(scene: string){
    var decToken: any;
    var token: string = localStorage.getItem('token') ?? "";
    decToken = this.appService.getDecodedAccessToken(token);
    var sub = decToken.sub;
    this.seatData = [];
    this.userService.getSeats(scene).subscribe(res=>{
      this.seats = res;
      this.rows = this.getRows().row;
      this.numbers = this.getNumbersInRow().number;
      for (let row = 1; row <= this.getRows().row; row++) {
        const rowSeats = [];
        for (let seatI = 1; seatI <= this.getNumbersInRow().number; seatI++) {
          var exists = false;
          var taken = false;
          var yours = false;
          var username = '';
          if(this.seats.some(seat => seat.row === row && seat.number === seatI))
            exists = true
          if(this.takenSeats.some(seat => seat.row === row && seat.number === seatI)){
            taken = true;
            const foundSeats = this.takenSeats.filter(seat => seat.row === row && seat.number === seatI);
            const usernames = foundSeats.map(seat => seat.username);
            username = usernames[0] ? usernames[0] : '';
            if(username == sub) {
              taken = false; 
              yours = true
              this.yourSeats += 1;
            }
          }
            rowSeats.push({ row, number: seatI ,exists: exists, selected:false, taken:taken, yours: yours
            });
        }
        this.seatData.push(rowSeats);
      }
    })
  }

  getScheduledPlays(){
    this.userService.getScheduledPlays().subscribe(res => {
      res.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.scheduledPlays = res;
      console.log(this.yourSeats)
    })
  }

  ngOnInit(): void {
    this.getScheduledPlays();
  }
}
