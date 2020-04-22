import { Component, OnInit } from '@angular/core';
import { DogType } from '../models/dog-types';
import { DogTypesService } from '../dog-types.service';
import { DOGTYPES } from '../mock-dog-types';

@Component({
  selector: 'app-dog-types',
  templateUrl: './dog-types.component.html',
  styleUrls: ['./dog-types.component.css']
})
export class DogTypesComponent implements OnInit {
  dogTypes: DogType[];
  selectedDogType: DogType;
  newDogName: string;

  constructor(private dogTypeService: DogTypesService) { }

  ngOnInit(): void {
    this.getDogTypes();
  }

<<<<<<< HEAD
  getDogTypes(){
     // return this.dogTypeService.getDogTypes().then(dogTypes => { this.dogTypes = dogTypes; });
     this.dogTypes = DOGTYPES;
=======
  getDogTypes(): void{
     this.dogTypeService.getDogTypes().subscribe(dogTypes => this.dogTypes = dogTypes);
     //this.dogTypes = DOGTYPES;
>>>>>>> 96357b902261a02464a576f4c5ccff96796a54f2
  }

  onSelect(dogType: DogType): void {
    this.selectedDogType = dogType;
  }
}
