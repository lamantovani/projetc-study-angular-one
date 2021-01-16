import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorPath } from '../service/exports';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private behaviorPath: BehaviorPath, private router: Router) { }

  ngOnInit() { }

  public navigateByUrl(path: string, parameter?: string) {
    this.behaviorPath.setPathData(path);
    parameter ? this.router.navigateByUrl(`/${path}/${parameter}`) : this.router.navigateByUrl(`/${path}`);
  }
}
