import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public fbauth: AngularFireAuth, 
    public route: Router
    ) { 
      this.fbauth.authState.subscribe(user => {
        if (user) {
          this.route.navigateByUrl('usuarios');
        }
      });
    }

}
