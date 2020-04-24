import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogTypesComponent } from './dog-types/dog-types.component';
import { KennelComponent } from './kennel/kennel.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  { path: 'dog-types', component: DogTypesComponent },
  { path: 'kennel', component: KennelComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'leaderboard', component: LeaderboardComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }