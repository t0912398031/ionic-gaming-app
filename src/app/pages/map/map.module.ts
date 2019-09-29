import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';
import { AgmCoreModule } from '@agm/core';


const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

    AgmCoreModule.forRoot({
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
      apiKey: 'AIzaSyB2yqiP--6PYi546T4QP49Dk4NcrueqT94',  
      libraries: ['geometry']
    })
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
