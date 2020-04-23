import { Component, OnInit } from '@angular/core';
import { DogType } from '../models/dog-types';
import { DogTypesService } from '../dog-types.service';
import { Users } from '../models/users';
import { UsersService } from '../users.service';
import { DogsService } from '../dogs.service';
import { Dogs } from '../models/dogs';

@Component({
  selector: 'app-dog-types',
  templateUrl: './dog-types.component.html',
  styleUrls: ['./dog-types.component.css']
})
export class DogTypesComponent implements OnInit {
  loggedUser: Users;
  dogTypes: DogType[];
  selectedDogType: DogType;
  newDogName: string;
  message: string;

  constructor(private dogTypeService: DogTypesService, private usersService: UsersService, private dogsService: DogsService) { }

  ngOnInit(): void {
    this.getDogTypes();
  }

  getDogTypes(): void{
     this.dogTypeService.getDogTypes().subscribe(dogTypes => this.dogTypes = dogTypes);
     this.usersService.sharedUser.subscribe(user => this.loggedUser = user);
  }

  onSelect(dogType: DogType): void {
    this.selectedDogType = dogType;
  }

  adoptNewDog(){
    if(!this.newDogName)
      this.message = 'You must provide a new name for your dog.';
    else{
      const newDog: Dogs = {
        dogTypeId: this.selectedDogType.id,
        userId: this.loggedUser.id,
        petName: this.newDogName,
        hunger: 70,
        mood: 70,
        energy: 3
      }
      this.dogsService.createDog(newDog).subscribe();
      this.message = `Thanks ${this.loggedUser.firstName} ${this.loggedUser.lastName} for adopting ${this.newDogName}`;
    }

  }
}
