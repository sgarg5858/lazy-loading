import { Directive, Injector, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { LazyLoader } from './lazy-loader.interface';
import { LazyLoaderService } from './lazy-loader.service';

@Directive({
  selector: '[lazyLoader]'
})
export class LazyLoaderDirective implements OnChanges {

  @Input() lazyLoader!:LazyLoader;
  constructor(
    private container:ViewContainerRef,
    private injector:Injector,
    private lazyLoaderService:LazyLoaderService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['appLazyLoader'].currentValue) {
      return;
    }
    this.lazyLoaderService.loadModule({...this.lazyLoader,container:this.container,injector:this.injector}).then(()=>{
      console.log("DONE");
    })
  }
}
