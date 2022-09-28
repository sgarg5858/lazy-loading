import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SkillsModule } from '../skills/skills.module';
import { ExperienceModule } from '../experience/experience.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'home',component:HomeComponent
      }
    ]),
    SkillsModule,
    ExperienceModule
  ]
})
export class HomeModule { }
