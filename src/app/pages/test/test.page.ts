import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  loading: any;
  test = 0;

  constructor(
    private router: Router,
    private platform: Platform,
    private google:GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth
  ) { }

  // ngOnInit() {
  // }

  
  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  async presentLoading(loading) {
    await loading.present();
  }


   login() {
    let params;
    if (this.platform.is('android')) {
      params = {
        'webClientId': '901598795613-cgdalt5l4sh0nsjoka1gn1f5kjnmohok.apps.googleusercontent.com',
        'offline': true
      }
    }
    else {
      params = {}
    }
    this.google.login(params)
      .then((response) => {
        this.test=1;
        const { idToken, accessToken } = response
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }

  onLoginSuccess(accessToken, accessSecret) {
    this.test=2;
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(["/profile"]);
        this.loading.dismiss();
      })

  }
  onLoginError(err) {
    console.log(err);
  }

}
