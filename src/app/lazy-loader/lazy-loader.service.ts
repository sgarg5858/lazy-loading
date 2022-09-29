import { createNgModule, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

export class DynamicModule{
   component:any;
}

@Injectable({
  providedIn: 'root'
})
export class LazyLoaderService {

  constructor() { }

  loadModule(args:{
    loader:LoadChildrenCallback,
    container:ViewContainerRef,
    injector:Injector
  }){
    return (args.loader() as Promise<any>).then((module)=>{

      const lazyModule = module as DynamicModule;
      const component = lazyModule.component;
      const moduleRef=createNgModule(lazyModule as any,args.injector);
      args.container.createComponent(component,{ngModuleRef:moduleRef});
    })
  }
}
