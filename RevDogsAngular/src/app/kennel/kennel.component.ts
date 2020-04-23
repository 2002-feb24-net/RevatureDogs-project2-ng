import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../users.service';
import { Dogs } from '../models/dogs';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-kennel',
  templateUrl: './kennel.component.html',
  styleUrls: ['./kennel.component.css']
})
export class KennelComponent implements OnInit {
  loggedUser: Users;
  dogs: Dogs[];
  selectedDog: Dogs;

  constructor(private usersService: UsersService, private dogsService: DogsService) { }

  ngOnInit(): void {
    this.usersService.sharedUser.subscribe(user => this.loggedUser = user);
    this.dogsService.getDogs().subscribe(dogs => this.dogs = dogs);
  }
  
  onSelect(dog: Dogs): void {
    this.selectedDog = dog;
  }

}
