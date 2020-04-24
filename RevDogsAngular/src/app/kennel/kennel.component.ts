import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../users.service';
import { Dogs } from '../models/dogs';
import { DogsService } from '../dogs.service';
import { DogType } from '../models/dog-types';
import { DogTypesService } from '../dog-types.service';
import { TricksService } from '../tricks.service';
import { Trick } from '../models/tricks';
import { TrickProgress } from '../models/tricks-progress';
import { TricksProgressService } from '../tricks-progress.service';

@Component({
  selector: 'app-kennel',
  templateUrl: './kennel.component.html',
  styleUrls: ['./kennel.component.css']
})
export class KennelComponent implements OnInit {
  user: Users;
  loggedUser: Users;
  selectedDog: Dogs;
  allDogs: Dogs[];
  selectedTPs: TrickProgress[];
  breeds: DogType[];
  tricks: Trick[];

  constructor(private usersService: UsersService,
              private dogTypesService: DogTypesService,
              private dogsService: DogsService,
              private tricksService: TricksService,
              private tricksProgressService: TricksProgressService) { }

  ngOnInit(): void {
    this.usersService.sharedUser.subscribe(user => this.user = user);
    this.dogTypesService.getDogTypes().subscribe(dogTypes => this.breeds = dogTypes);
    this.tricksService.getTricks().subscribe(tricks => this.tricks = tricks);
    if(this.user)
      this.usersService.getUser(this.user.id).subscribe(user => this.loggedUser = user);
    this.dogsService.getDogs().subscribe(dogs => this.allDogs = dogs);
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
      if(!dog.isAlive)
        continue;
      else if(dog.hunger <= 30 || dog.mood <= 30 || dog.age > this.getLifeExpectancy(dog)){
        if(dog.hunger <= 30 || dog.mood <= 30) {
          this.loggedUser.score -= 30;
          this.usersService.updateUser(this.loggedUser).subscribe();
        }
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

  feedDog(){
    if(this.selectedDog.hunger < 100 && this.selectedDog.isAlive){
      this.selectedDog.hunger += 10;
      this.updateDog(this.selectedDog);
    }
  }

  playDog(){
    if(this.selectedDog.mood < 100 && this.selectedDog.isAlive){
      this.selectedDog.mood += 10;
      this.updateDog(this.selectedDog);
    }
  }

  updateDog(dog: Dogs): void{
    this.dogsService.updateDog(dog).subscribe();
  }

  getTricksAvbl(): Trick[]{
    var tricksAvailable: Trick[] = new Array();
    console.log(`There are ${this.allDogs.length} total dogs.`);
    var trainingDog = this.allDogs.find(dog => dog.id == this.selectedDog.id);
    console.log(`We found ${trainingDog.petName} and they know ${trainingDog.tricksProgress.length} tricks.`);

    for(var i = 0; i < this.tricks.length; i++){
      if(!trainingDog.tricksProgress.find(tp => tp.trickId == this.tricks[i].id))
        tricksAvailable.push(this.tricks[i]);
    }
    return tricksAvailable; 
  }

  teachNewTrick(trick: Trick){
    if(this.selectedDog.energy > 0){
      const newTrickProgress: TrickProgress = {
        petId: this.selectedDog.id,
        trickId: trick.id,
        progress: 0,
      };
      this.tricksProgressService.createTricksProgress(newTrickProgress).subscribe();
      this.selectedDog.energy--;
      this.updateDog(this.selectedDog);
    }
  }

  getLearnedTricks(): TrickProgress[]{
    return this.allDogs.find(dog => dog.id == this.selectedDog.id).tricksProgress;
  }

  getProgressBar(tp: TrickProgress): string{
    var trick = this.tricks.find(trick => trick.id == tp.trickId);
    var progressBar = "";
    for(var i = 1; i <= trick.diffculty; i++){
      progressBar += (tp.progress >= i) ? "●" : "○";
    }
    return progressBar;
  }

  practiceTrick(tp: TrickProgress){
    var trick = this.tricks.find(trick => trick.id == tp.trickId);
    if(tp.progress < trick.diffculty){
      tp.progress++;
      if(tp.progress == trick.diffculty){
        this.loggedUser.score += trick.points;
        this.usersService.updateUser(this.loggedUser).subscribe();
      }
      this.tricksProgressService.updateTricksProgress(tp).subscribe();
      this.selectedDog.energy--;
      this.updateDog(this.selectedDog);
    }
  }

  trickLearned(tp: TrickProgress){
    var trick = this.tricks.find(trick => trick.id == tp.trickId);
    return tp.progress == trick.diffculty;
  }
}
