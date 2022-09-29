import { Component, createNgModule, Injector, NgModuleRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LazyLoader } from 'src/app/lazy-loader/lazy-loader.interface';
import { LazyLoaderService } from 'src/app/lazy-loader/lazy-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private injector: Injector,private loaderService:LazyLoaderService) { }
  @ViewChild('container',{read:ViewContainerRef}) container:ViewContainerRef | null = null;

  ngOnInit(): void {
  }

  loadModuleConfig:LazyLoader={
    loader: () => import('../../skills/skills.module').then((module)=>module.SkillsModule),
  }

  //THis for standalone components
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
  // THis for without standalone
  loadSkillModule(){
    import('../../skills/skills.module').then(
      (module)=>{
        // console.log(module)
        const skillModule = module.SkillsModule;
        const SkillsComponent = skillModule.component;
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

  loadModuleViaService(){
    if(this.container)
    {
      this.loaderService.loadModule({...this.loadModuleConfig,injector:this.injector,container:this.container}).then(()=>{
        console.log("DONE")
      })

    }
  }

}
