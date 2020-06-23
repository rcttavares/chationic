import { Component, OnInit } from '@angular/core';
import { Mensagens } from 'src/Models/Mensagens';

@Component({
  selector: 'app-chat-bubble',
  inputs:['msg:mensagem','posicao:p'],
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss'],
})
export class ChatBubbleComponent implements OnInit {
  msg: Mensagens;
  posicao: string;

  constructor() { }

  ngOnInit() {}

}
