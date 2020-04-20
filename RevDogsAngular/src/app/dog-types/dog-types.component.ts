import { Component, OnInit } from '@angular/core';
import { DogType } from './dog-types';

@Component({
  selector: 'app-dog-types',
  templateUrl: './dog-types.component.html',
  styleUrls: ['./dog-types.component.css']
})
export class DogTypesComponent implements OnInit {
  dogType: DogType = {
    breed: "Husky",
    lifeExpectancy: 144,
    size: 3
  };

  constructor() { }

  ngOnInit(): void {
  }

}
