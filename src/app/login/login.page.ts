import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../Models/Usuarios';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuarios;

  constructor(
    public fbauth: AngularFireAuth, 
    public alertController: AlertController,
    public route: Router
  ) { 
    this.usuario = new Usuarios();
  }

  ngOnInit() {
  }

  LoginUsuario() {
    this.fbauth.auth.signInWithEmailAndPassword(
      this.usuario.email,
      this.usuario.senha
    ).then(() => {
      this.route.navigate(['/home']);
    }).catch(async () => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Erro',
        subHeader: 'E-mail ou senha inválidos',
        message: 'Erro ao realizar o Login. Tente novamente.',
        buttons: ['OK']
      });
  
      await alert.present();
    });
  }

}
