import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private readonly userService:UserService,private readonly router:Router,
    private route: ActivatedRoute){}
  
  playName: string = '';
  playId: number = -1;
  play: any;

  ngOnInit(): void {
    this.route.params.subscribe(params=> {
      this.playId = this.userService.selectedPlay;
      this.playName = params['name'];
      this.userService.getFullPlay(this.playId).subscribe(res => {
        console.log(res);
        this.play = res;
      })
    })
  }

}
