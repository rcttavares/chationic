import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Mensagens } from '../../Models/Mensagens';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {
  usuarioMensagem: string;
  usuario: string;
  mensagem: Mensagens;
  listaMensagem: Observable<Mensagens[]>;
  lista: Observable<Mensagens[]>;
  nomeUsuario: string;

  constructor(
    public fbauth: AngularFireAuth, 
    public fbstore: AngularFirestore,
    public acrroute: ActivatedRoute
  ) { 
    this.mensagem = new Mensagens();

    this.acrroute.paramMap.subscribe((params: ParamMap) => {
      this.usuarioMensagem = params.get("id");
    });

    this.VerificarLogin();
    this.ListarMensagens();
    this.GetUser();
  }

  ngOnInit() {
  }

  GetUser() {
    this.fbauth.authState.subscribe(user => {
      if (user) {
        let users = this.fbstore.collection("Usuarios");

        users.ref.where("userId", "==", this.usuarioMensagem).get().then(result => {
          result.forEach(element => {
            this.nomeUsuario = element.data().nome
          })
        })
      }
    })
  }

  ListarMensagens() {
    this.lista = this.fbstore.collection<Mensagens>("Mensagens", ref => {
      return ref.limit(300).orderBy("data");
    }).valueChanges();

    this.lista.subscribe(res => {
      this.FiltrarLista(res);
    })
  }

  FiltrarLista(res) {
    this.listaMensagem = res.filter(t => (
      t.de == this.usuario && t.para == this.usuarioMensagem
    ) || (
      t.para == this.usuario && t.de == this.usuarioMensagem
    ))
  }

  PostarMensagem() {
    this.mensagem.de = this.usuario;
    this.mensagem.para = this.usuarioMensagem;
    this.mensagem.data = new Date();

    let mensagens = this.fbstore.collection("Mensagens");

    mensagens.add({
      de: this.mensagem.de,
      para: this.mensagem.para,
      texto: this.mensagem.texto,
      data: this.mensagem.data
    })
  }

  VerificarLogin() {
    this.fbauth.authState.subscribe(user => {
      if (user) {
        this.usuario = user.uid;
      } else {
        console.log('Não autenticado');
      }
    })
  }

}
