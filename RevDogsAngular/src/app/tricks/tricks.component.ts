import { Component, OnInit } from '@angular/core';
import { Dogs } from '../models/dogs';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.css']
})
export class TricksComponent implements OnInit {
  dogs: Dogs[];

  constructor(private dogsService: DogsService) { }

  ngOnInit(): void {
  }

}
