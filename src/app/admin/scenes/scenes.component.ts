import { Component, OnInit } from '@angular/core';
import { ISeat } from '../model/ISeat';
import { IScene } from '../model/IScene';
import { AdminService } from '../service/admin.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.css']
})
export class ScenesComponent implements OnInit{
  
  constructor(
    private adminService: AdminService 
  ) {}

  isTheaterVisible: boolean = true;
  seats: ISeat[] = [];
  seatData: ISeat[][] = [];
  scenes: IScene[] = [];
  selectedSeats:ISeat[] = [];
  rows: number = -1;
  numbers: number = -1;
  selectedScene: string = '';

  newSceneName: string = '';
  newSceneRows: string = '';
  newSceneSeatsInRow: string = '';

  selectedRowIndex: number = -1;

  selectRow(index: number,selectedScene:string) {
    this.selectedRowIndex = index;
    this.selectedScene = selectedScene;
  }

  getScenes() {
    this.adminService.getScenes().subscribe(res=>{
      this.scenes = res;
    })
  }

  createScene(){
    this.adminService.createSecne({name:this.newSceneName, rows:Number(this.newSceneRows), 
      seatsInRow:Number(this.newSceneSeatsInRow)}).subscribe(res =>{
        this.getScenes();
        this.newSceneName = '';
        this.newSceneRows = '';
        this.newSceneSeatsInRow = '';
      });
  }

  seatSelected(seat:ISeat){
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
    this.seatData = [];
    this.adminService.getSeats(scene).subscribe(res=>{
      this.seats = res;
      this.rows = this.getRows().row;
      this.numbers = this.getNumbersInRow().number;
      for (let row = 1; row <= this.getRows().row; row++) {
        const rowSeats = [];
        for (let seatI = 1; seatI <= this.getNumbersInRow().number; seatI++) {
          if(this.seats.some(seat => seat.row === row && seat.number === seatI))
            rowSeats.push({ row, number: seatI ,exists: true, selected:false
          });
          else {
            rowSeats.push({ row, number: seatI ,exists: false, selected:false
            });}
        }
        this.seatData.push(rowSeats);
      }
    })
  }

  deleteSelectedSeats(){
     this.adminService.deleteSeats(this.selectedSeats,this.selectedScene).then( () => {
      this.selectedSeats = [];
      this.getSeatsForSecne(this.selectedScene)
      this.getScenes()
    })
  }

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

  deleteScene(){
    this.adminService.deleteScene(this.selectedScene).subscribe( res=> {
      this.getScenes();
      this.getSeatsForSecne('');
      this.selectedScene = '';
    })
  }

  ngOnInit(): void {
    this.getScenes();
  }



}
