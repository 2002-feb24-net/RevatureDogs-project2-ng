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

  getDogTypes(): void{
     this.dogTypeService.getDogTypes().subscribe(dogTypes => this.dogTypes = dogTypes);
     //this.dogTypes = DOGTYPES;
  }

  onSelect(dogType: DogType): void {
    this.selectedDogType = dogType;
  }
}
