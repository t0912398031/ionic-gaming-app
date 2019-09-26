import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from '../environments/environment';

// import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { SharingService } from './service/sharing.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,

    HttpClientModule,
    // HttpModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    GooglePlus,
    AngularFirestore,

    SharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
