import { Component, createNgModule, Injector, NgModuleRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private injector: Injector) { }
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
  loadSkillModule(){
    import('../../skills/skills.module').then(
      (module)=>{
        console.log(module)
        const skillModule = module.SkillsModule;
        const SkillsComponent = skillModule.components.skillsComponent;
        const skillModuleRef:NgModuleRef<any>=createNgModule(skillModule,this.injector);
        if(this.container)
        {
        this.container.createComponent(SkillsComponent,{ngModuleRef:skillModuleRef});
        }

      }
    ).catch((error)=>{
      console.log(error);
    })
  }

}
