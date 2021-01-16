import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { POSOneEnum } from '../enumerator/posone.enum';
import { BehaviorPath, BehaviorContract } from '../service/exports';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  providers: [MessageService]
})
export class ReceiptComponent extends BaseComponent implements OnInit {
  public title = 'Compra concluída com sucesso!';
  public textBody1 = 'Obrigado por sua compra.';
  public textBody2 = 'Você receberá um e-mail com as instruções para acesso ao POS One.';
  public type: string;
  public license: License[];
  public msgs: Message[] = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private behaviorPath: BehaviorPath,
    private messageService: MessageService,
    public behaviorContract: BehaviorContract
    ) {
      super(router, behaviorContract);
    }

  ngOnInit() {
    this.loadContractDTOModel();
    this.type = this.route.snapshot.params[POSOneEnum.REDIRECT_PAGE_BY_TYPE_MSG];
    this.loadMessagesType(this.type);
    this.license = [
      { name: 1 },
      { name: 2 },
      { name: 3 }
    ];
    this.showSuccessViaMessages(this.type);
  }

  public showSuccessViaMessages(type: string) {
    const message = type === 'success' ? 'Transação realizada com sucesso!' : 'Transação não realizada';
    this.msgs = [];
    this.msgs.push({ severity: type, summary: '', detail: message });
  }

  loadMessagesType(type: string) {
    if (type === 'error') {
      this.title = 'NÃO FOI POSSÍVEL CONCLUIR SUA COMPRA!';
      this.textBody1 = 'Você pode tentar novamente.';
      this.textBody2 = 'Dica: Selecione outra forma de pagamento ou entre em contato com o emissor do cartão.';
    }
  }

  public navigateByUrl(path: string) {
    this.behaviorPath.setPathData(path);
    this.router.navigateByUrl(`/${path}`);
  }

}

export interface License {
  name: number;
}
