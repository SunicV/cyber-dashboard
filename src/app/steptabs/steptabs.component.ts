import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-steptabs',
  templateUrl: './steptabs.component.html',
  styleUrls: ['./steptabs.component.css']
})
export class SteptabsComponent implements OnInit {
  steps = [];
  current = 0;
  settings = <settings>{};
  preview = false;

  showModal = () => {
    this.preview = true;
  }

  handleOk = (e) => {
    console.log('点击了确定');
    this.preview = false;
  }

  handleCancel = (e) => {
    console.log(e);
    this.preview = false;
  }

  done() {
    // validate setting and preview.
    this._message.success('done');
    this.showModal();
  }

  pre() {
    this.current -= 1;
  }

  next() {
    this.current += 1;
  }

  constructor(private _message: NzMessageService) {
    this.steps = [{
        'title': 'profile',
        'content': [
          {
            'name': 'Upload your profile',
            'type': 'file',
            'field': 'profile'
          }
        ]
      },
      {
        'title': 'email',
        'content': [
          {
            'name': 'Fill your email',
            'type': 'email',
            'field': 'email'
          }
          // {
          //   'name': 'Fill your phone num',
          //   'type': 'input-text'
          // },
        ]
      },
      {
        'title': 'address',
        'content': [
          {
            'name': 'select address',
            'type': 'text',
            'field': 'address'
            // multi cascade select.
          }
        ]
      }    
    ];

    this.settings.address = 'default address';
    this.settings.email = 'example@hotmail.com';
  }

  ngOnInit() {
  }

}

interface settings {
  profile?: string,
  email: string,
  address?: string
}
