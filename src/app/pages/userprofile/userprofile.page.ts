import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Gamer } from 'src/app/model/gamer';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit, OnDestroy {

  id: string;
  private sub: any;
  private gender;
  private games;

  private gamerDoc: AngularFirestoreDocument<Gamer>;
  private gamer: Observable<Gamer>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastController: ToastController
    ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      // this.id = +params['id']; // (+) converts string 'id' to a number
      this.id = params['id'];
      // In a real app: dispatch action to load the details here.
    });
    // console.log(this.id)
    
    // this.gamerDoc = this.userService.getUserDoc('TMDz1cVAM7QagTPsU5aIJtlRzs52');
    this.gamerDoc = this.userService.getUserDoc(this.id);
    this.gamer = this.gamerDoc.valueChanges();
    // console.log(this.gamerDoc)
    // console.log(this.gamer)
    this.gamer.subscribe((gamer: Gamer)=>{
      // self.g = gamer;
      this.games = gamer.games;
      this.gender = gamer.gender;

      // gamer.games.forEach(e=>{
      //   if(this.games.ischecked){
      //     this.games.push((<any>e).name)
      //   }
      // }
        
        
      // )
      
    })
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onViewDetails(game){
    // console.log(id)
    // this.router.navigate(['/gameinfo', name]);
    if(!game.gameInfo){
      this.presentToast();
    }
    this.router.navigate(['/gameinfo'], {state: game});
  
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No Gaming Information Available.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }



}
