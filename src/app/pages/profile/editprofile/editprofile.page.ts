import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Gamer } from 'src/app/model/gamer';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AlertController } from '@ionic/angular';
import { SharingService } from 'src/app/service/sharing.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  private gamerDoc: AngularFirestoreDocument<Gamer>;
  private gamer: Observable<Gamer>;
  // private g: Gamer;

  displayName;
  email;
  phone;
  gender;

  games: Array<Object>;

  getimg(game){
    let text = ''
    switch(game) {
      case "League of Legends":
        text = "assets/icon/Leagueicon.png";
        break;
      case "Arena of Valor":
        text = 'assets/icon/Aov.jpg';
        break;
      case "Apple":
        text = "How you like them apples?";
        break;
      default:
        text = './assets/icon/favicon.png';
  }
    return text
  }
  
  
  
  onChangeHandler($event) {
    this.gender = $event.target.value;
    // this.g.gender = $event.target.value;
  }

  

  
  constructor(
    private router: Router,
    private userService: UserService,
    private alertController: AlertController,
    private sharingService: SharingService
    ) { 
    this.gamerDoc = this.userService.getGamerDoc();
    this.gamer = this.gamerDoc.valueChanges();

    this.gamer.subscribe((gamer: Gamer)=>{
      // self.g = gamer;
      this.phone = gamer.phone;
      this.displayName = gamer.displayName;
      this.email = gamer.email;

      this.games = gamer.games;
      this.gender = gamer.gender;

    })


  }
  test(){
    console.log(this.gender)
  }
  
  ngOnInit() {
    
  }

  update(){
    let gameInfo = {
      gameName: 'League of Legends',
      server: 'NA',
      gameId: 't0912398031',
      experience: 2,
      rank: 'platnium',
      role: ['mid','adc'],

    };


    this.gamerDoc.update({
      // gameInfo: gameInfo
    })
    .catch(err => {
        console.log("update user fail" );
    });
    console.log("update user suceed" );

    // this.userService.updateUser();
  }

  updateProfile(){

    if(!this.phone || !this.displayName || !this.email){
      this.presentAlert('invalid input');
      return;
    }
    this.gamerDoc.update({
      displayName: this.displayName,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      games: this.games
    });
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

  editGameInfo(game){
    // console.log(game);
    this.sharingService.saveData(game);
    this.router.navigate(["/editgameinfo"]);
  }
}
