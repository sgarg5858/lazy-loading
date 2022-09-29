import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ExperienceModule } from '../experience/experience.module';
import { LazyLoaderModule } from '../lazy-loader/lazy-loader.module';
import { LazyLoaderDirective } from '../lazy-loader/lazy-loader.directive';



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
    ])
  ]
})
export class HomeModule { }
