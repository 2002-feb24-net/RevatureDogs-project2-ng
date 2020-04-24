import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  users: Users[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers().subscribe(users => { this.users = users; this.sortByScore(); });
  }

  sortByScore(){
    this.users.sort((user1, user2) => user1.score > user2.score ? -1: user1.score < user2.score ? 1 : 0);
  }

}
