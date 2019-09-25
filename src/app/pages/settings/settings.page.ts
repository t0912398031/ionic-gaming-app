import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  toggle = false;
  constructor() { 
    

  }

  ngOnInit() {
    // toggle = user.preference;
  }

  enableDark(){
    document.body.classList.toggle('dark', this.toggle);
  }


}
