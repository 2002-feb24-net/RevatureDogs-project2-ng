import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Users;

  constructor(private usersServce: UsersService) { }

  ngOnInit(): void {
  }

  login(username: string): void {
    this.usersServce.getUserLogin(username).subscribe(users => this.user = users);
  }

  logout(): void{
    this.user = null;
  }

}
