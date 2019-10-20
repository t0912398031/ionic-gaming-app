import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/service/sharing.service';
import { UserService } from 'src/app/service/user.service';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController,
    ) { 
    this.gameName = this.sharingService.fetchData()

    this.gameInfoDoc = this.userService.getGameInfoDoc(this.gameName);
    this.gameInfo = this.gameInfoDoc.valueChanges();

    this.gameInfo.subscribe(data=>{
      // console.log(data);
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
      // gameName: this.gameName,
      server: this.server,
      gameId: this.gameId,
      experience: this.experience,
      rank: this.rank,
      role: this.role,

    };
    this.userService.updateGameInfo(this.gameName, gameInfo)
    this.presentAlert('update');
  }


  async presentAlert(type: string) {
    let alert;
    switch(type) {
      case 'invalid input':
          alert = await this.alertController.create(  
            {
            header: 'Alert',
            subHeader: '',
            message: 'Please fill up all fields.',
            buttons: ['OK'],
          });
        break;
      case 'update':
          alert = await this.alertController.create(  
            {
            header: 'Alert',
            subHeader: '',
            message: 'Update Successfully',
            buttons: ['OK'],
          });
        break;
      default:
          alert = await this.alertController.create(  
            {
            header: 'Alert',
            subHeader: '',
            message: 'Warning',
            buttons: ['OK'],
          });
    }

    await alert.present();
    let result = await alert.onDidDismiss();
    // console.log(result);
  }
}
