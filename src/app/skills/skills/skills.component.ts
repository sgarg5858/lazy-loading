import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor() { }
  skills:string[]=["Angular","TypeScript","Rxjs","Ngrx","Nx","Jest","SCSS"];

  ngOnInit(): void {
  }

}
