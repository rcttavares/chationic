import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../Models/Usuarios';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  listaUsuarios: Usuarios[] = [];

  constructor(
    public fbauth: AngularFireAuth, 
    public fbstore: AngularFirestore,
    public alertController: AlertController,
    public route: Router
  ) { }

  ngOnInit() {
    this.ListarUsuarios();
  }

  ListarUsuarios() {
    this.fbauth.authState.subscribe(user => {
      if (user) {
        let users = this.fbstore.collection("Usuarios");

        users.ref.where("userId", ">", user.uid).get().then(result => {
          result.forEach(element => {
            let usuario = new Usuarios();
            usuario.nome = element.data().nome
            usuario.email = element.data().email
            usuario.userId = element.data().userId

            this.listaUsuarios.push(usuario);
          });
        });

        users.ref.where("userId", "<", user.uid).get().then(result => {
          result.forEach(element => {
            let usuario = new Usuarios();
            usuario.nome = element.data().nome
            usuario.email = element.data().email
            usuario.userId = element.data().userId

            this.listaUsuarios.push(usuario);
          });
        });

        console.log(this.listaUsuarios);
      }
    });
  }

  IrParaMensagens(userId) {
    this.route.navigate(['/mensagens/' + userId]);
  }

  logout() {
    this.fbauth.auth.signOut();
    this.route.navigate(['/home']);
  }

}
