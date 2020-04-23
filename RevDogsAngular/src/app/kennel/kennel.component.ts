import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../users.service';
import { Dogs } from '../models/dogs';
import { DogsService } from '../dogs.service';
import { DogType } from '../models/dog-types';
import { DogTypesService } from '../dog-types.service';

@Component({
  selector: 'app-kennel',
  templateUrl: './kennel.component.html',
  styleUrls: ['./kennel.component.css']
})
export class KennelComponent implements OnInit {
  loggedUser: Users;
  dogs: Dogs[];
  selectedDog: Dogs;
  breeds: DogType[];

  constructor(private usersService: UsersService, private dogsService: DogsService) { }

  ngOnInit(): void {
    this.usersService.sharedUser.subscribe(user => this.loggedUser = user);
    this.dogsService.getDogs().subscribe(dogs => this.dogs = dogs);
  }
  
  onSelect(dog: Dogs): void {
    this.selectedDog = dog;
  }

  getHunger(dog: Dogs): string{
    var hunger = "";
    for(var i = 0; i < 10; i++){
      hunger += (dog.hunger >= (i*10)) ? "🍖": "🦴";
    }
    return hunger;
  }

  getMood(dog: Dogs): string{
    if(dog.mood > 80)
      return "😃";
    else if(dog.mood > 60)
      return "🙂";
    else if(dog.mood > 40)
      return "😐";
    else if(dog.mood > 20)
      return "☹️";
    else return "😭";
  }

  getEnergy(dog: Dogs): string{
    var energy = "";
    for(var i = 0; i < dog.energy; i++){
      energy += "⚡";
    }
    return energy;
  }
}
