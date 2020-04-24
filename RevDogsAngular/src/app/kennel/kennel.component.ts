import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../users.service';
import { Dogs } from '../models/dogs';
import { DogsService } from '../dogs.service';
import { DogType } from '../models/dog-types';
import { DogTypesService } from '../dog-types.service';
import { digest } from '@angular/compiler/src/i18n/digest';

@Component({
  selector: 'app-kennel',
  templateUrl: './kennel.component.html',
  styleUrls: ['./kennel.component.css']
})
export class KennelComponent implements OnInit {
  user: Users;
  loggedUser: Users;
  selectedDog: Dogs;
  breeds: DogType[];

  constructor(private usersService: UsersService, private dogTypesService: DogTypesService, private dogsService: DogsService) { }

  ngOnInit(): void {
    this.usersService.sharedUser.subscribe(user => this.user = user);
    this.dogTypesService.getDogTypes().subscribe(dogTypes => this.breeds = dogTypes);
    if(this.user)
      this.usersService.getUser(this.user.id).subscribe(user => this.loggedUser = user);
  }
  
  onSelect(dog: Dogs): void {
    this.selectedDog = dog;
  }

  getHunger(dog: Dogs): string{
    var hunger = "";
    for(var i = 0; i < 10; i++){
      hunger += (dog.hunger > (i*10)) ? "🍖": "🦴";
    }
    return hunger;
  }

  getMood(dog: Dogs): string{
    if(!dog.isAlive)
      return "💀";
    else if(dog.mood > 80)
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

  getBreed(dog: Dogs): string{
    for(var i = 0; i < this.breeds.length; i++){
      if(this.breeds[i].id == dog.dogTypeId)
        return this.breeds[i].breed;
    }
    return "Breed not found";
  }

  getLifeExpectancy(dog: Dogs): number{
    for(var i = 0; i < this.breeds.length; i++){
      if(this.breeds[i].id == dog.dogTypeId){
        return this.breeds[i].lifeExpectancy * 12;
      }
    }
  }

  nextDay(){
    for(var i = 0; i < this.loggedUser.dogs.length; i++){
      var dog = this.loggedUser.dogs[i];
      if(dog.hunger <= 30 || dog.mood <= 30 || dog.age > this.getLifeExpectancy(dog)){
        dog.hunger = 0;
        dog.mood = 0;
        dog.energy = 0;
        dog.isAlive = false;
      }
      else{
        dog.hunger -= 30;
        dog.mood -= 30;
        dog.energy = 4;
        dog.age++;
      }
      this.updateDog(dog);
    }
  }

  feedDog(dog: Dogs){
    if(dog.hunger < 100 && dog.isAlive){
      dog.hunger += 10;
      this.updateDog(dog);
    }
  }

  playDog(dog: Dogs){
    if(dog.mood < 100 && dog.isAlive){
      dog.mood += 10;
      this.updateDog(dog);
    }
  }

  updateDog(dog: Dogs): void{
    this.dogsService.updateDog(dog).subscribe();
  }
}
