import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameinfo',
  templateUrl: './gameinfo.page.html',
  styleUrls: ['./gameinfo.page.scss'],
})
export class GameinfoPage implements OnInit {
  id: string;
  private sub: any;
  private game;
  gameInfo;
  objectKeys = Object.keys;
  constructor(private router: Router) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   // this.id = +params['id']; // (+) converts string 'id' to a number
    //   this.id = params['id'];
    //   // In a real app: dispatch action to load the details here.
    // });
    this.game = this.router.getCurrentNavigation().extras.state;

    // console.log(window.history.state);
    this.gameInfo = this.game.gameInfo? this.game.gameInfo:null;
    // console.log(this.game)
    // console.log(this.gameInfo)
  }


}
