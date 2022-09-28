import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills/skills.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SkillsComponent
  ],
  

})
export class SkillsModule {

  public static components = {
    skillsComponent: SkillsComponent,
  };

 }
