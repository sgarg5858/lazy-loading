import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ExperienceModule } from '../experience/experience.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',component:HomeComponent
      }
    ]),
    ExperienceModule
  ]
})
export class HomeModule { }
