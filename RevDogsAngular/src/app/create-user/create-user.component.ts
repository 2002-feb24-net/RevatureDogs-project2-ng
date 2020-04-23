import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../users.service';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  message: string = ''

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  addUser(username: string, firstname: string, lastname: string){
    const newUser: Users = {
      userName: username,
      firstName: firstname,
      lastName: lastname,
      score: 0,
      dogs: []
    };
    this.usersService.createUser(newUser).subscribe();
  }

}
