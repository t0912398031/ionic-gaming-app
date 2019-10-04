import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  gamerDoc;
  constructor(private userService: UserService,) { 
    this.gamerDoc = userService.getGamerDoc();
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


    // this.gamerDoc.update({
    //   last: this.data
    // });

    this.gamerDoc.update({
      gameInfo: gameInfo
    })
    .catch(err => {
        console.log("update user fail" );
    });
    console.log("update user suceed" );

    // this.userService.updateUser();
  }

}
