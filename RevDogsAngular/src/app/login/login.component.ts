import { Component, OnInit, Output } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../users.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Users;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.sharedUser.subscribe(user => this.user = user);
  }

  login(username: string): void {
    this.usersService.getUserLogin(username).subscribe(users => this.usersService.userLoggedIn(users));
  }

  logout(): void{
    this.usersService.userLoggedOut();
  }

}
