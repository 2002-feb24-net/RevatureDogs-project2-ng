import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DogTypesComponent } from './dog-types/dog-types.component';
import { FormsModule } from '@angular/forms';
import { DogTypesService } from './dog-types.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { KennelComponent } from './kennel/kennel.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DogTypesComponent,
    KennelComponent,
    LoginComponent,
    CreateUserComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ DogTypesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
