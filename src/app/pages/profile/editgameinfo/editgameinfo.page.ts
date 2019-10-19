import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/service/sharing.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editgameinfo',
  templateUrl: './editgameinfo.page.html',
  styleUrls: ['./editgameinfo.page.scss'],
})

export class EditgameinfoPage implements OnInit {

  
  game
  gameInfo
  objectKeys = Object.keys;

  gameInfoDoc

  gameName
  gameId
  experience
  rank
  role
  server
  constructor(
    private sharingService: SharingService,
    private userService: UserService,
    ) { 
    this.game = this.sharingService.fetchData()
    // this.gameInfo = this.game.gameInfo
    

    this.gameInfoDoc = this.userService.getGameInfoDoc('League');
    this.gameInfo = this.gameInfoDoc.valueChanges();

    this.gameInfo.subscribe(data=>{
      // console.log(data);
      this.gameName = data.gameName;
      this.gameId = data.gameId;
      this.experience = data.experience;
      this.rank = data.rank;
      this.role = data.role;
      this.server = data.server;
    });
  }

  ngOnInit() {  
    

  }

  update(){
    let gameInfo = {
      gameName: this.gameName,
      server: this.server,
      gameId: this.gameId,
      experience: this.experience,
      rank: this.rank,
      role: this.role,

  };
    this.userService.updateGameInfo(gameInfo)
  }

}
