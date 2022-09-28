import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  @ViewChild('container',{read:ViewContainerRef}) container:ViewContainerRef | null = null;

  ngOnInit(): void {
  }

  loadSkills(){
    import('../../skills/skills/skills.component').then(
      (module)=>{
        const SkillsComponent = module.SkillsComponent;
        if(this.container)
        {
          this.container.createComponent(SkillsComponent);
        }
      }
    )
  }

}
