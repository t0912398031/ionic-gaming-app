import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Gamer } from 'src/app/model/gamer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private toggle;
  private gamerDoc: AngularFirestoreDocument<Gamer>;
  // private gamer: Observable<Gamer>;
  private gamer: Observable<Gamer>;
  private theme;
  private g;

  constructor(private userService:UserService, private afs: AngularFirestore,) { 
    this.gamerDoc = this.userService.getGamerDoc();
    // this.gamer = this.userService.getGamer();
    // console.log(this.userService.getGamer())
    
    // console.log(this.userService.getUser())
    // this.gamerDoc = afs.doc<Gamer>('gamers/' + 'TMDz1cVAM7QagTPsU5aIJtlRzs52');
    this.gamer = this.gamerDoc.valueChanges();
    let self = this;
    this.gamer.subscribe((gamer: Gamer)=>{
      self.g = gamer;
      self.toggle = gamer.theme =='dark'? true:false;
      // self.theme = gamer.theme == 'dark'? true:false;

    })
    
  }

  test(){
    // console.log(this.g)
    console.log(this.toggle)
  }
  ngOnInit() {
    // toggle = user.preference;
    // let self = this;
    // this.userService.getGamer().subscribe((data)=>{
    //   self.gamer = data;
    //   self.theme = data.theme;
    //   // this.toggle = this.theme=='dark'? true:false;
    // })
  }


  enableDark(){
    document.body.classList.toggle('dark', this.toggle);
    if(this.toggle){
      // this.theme = 'dark';
      this.gamerDoc.update({
        theme: 'dark',     
      });
    } else{
      // this.theme = 'default';
      this.gamerDoc.update({
        theme: 'default',    
      });
    }
    
  }


}
