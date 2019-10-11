import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(
    public userService: UserService
  ){}

  ngOnInit() {
  }

}
