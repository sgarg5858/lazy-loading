# lazy-load-modules-components-with-without-routing

We have login page and Home page Initially we need Login Page only! We dont need home page initially!
Home Page shows 2 more thing skills and experiences! They are from separate modules, they dont need to be shown immediately, we can 
ask user to you know load skills,experiences while user sees other things on home page or we can load asynchronously!

1-eager-loading

Everything is put inside Main Bundle as We are importing Both AuthModule and Home Module in AppModule and Home Module imports SkillsModule and
Experience Module. This makes the intial bunde big. The point is we dont need home page on load, we only need it after user is logged in!

Dev Mode:

Initial Chunk Files | Names   | Raw Size

main.js             | main    | 22.93 kB | 

runtime.js          | runtime |  6.59 kB | 

Build Mode:

Output:

Initial Chunk Files           | Names         |  Raw Size | Estimated Transfer Size

main.4844f36b7c31e285.js      | main          | 170.53 kB |                45.79 kB

polyfills.9e6e3f6d1102aa74.js | polyfills     |  33.15 kB |                10.66 kB

runtime.39ecdab9f0a71323.js   | runtime       |   1.12 kB |               618 bytes

styles.ef46db3751d8e999.css   | styles        |   0 bytes |                       -

                              | Initial Total | 204.80 kB |                57.05 kB


********************************************************************************************************************

2-lazy-loading

Here we are gonna take one step ahead by lazy loading home module!
Static Imports are key to tree shaking, Webpack relies on static imports to see if some piece of code can be tree shaken!
Thats for lazy loading we should use Dynamic Imports, Because AppModule has Static Import to HomeModule Then Webpack includes that
in main bundle, which is not what we want, we dont want any static imports to Home Module.

We use this below syntax:

  {
    path:'home',
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  
  To inform Webpack to split this module in its own bundle, so that we can load it at runtime!
  
Dev:

Initial Chunk Files            | Names            |  Raw Size

main.js                        | main             |  11.95 kB | 


Lazy Chunk Files               | Names            |  Raw Size

src_app_home_home_module_ts.js | home-home-module |  11.02 kB | 

Build:


  
Output:

Initial Chunk Files           | Names            |  Raw Size | Estimated Transfer Size

main.6c43bda7ed40158a.js      | main             | 197.87 kB |                54.33 kB

polyfills.9e6e3f6d1102aa74.js | polyfills        |  33.15 kB |                10.66 kB

runtime.7cc326669647e1e8.js   | runtime          |   2.82 kB |                 1.29 kB

styles.ef46db3751d8e999.css   | styles           |   0 bytes |                       -

                              | Initial Total    | 233.83 kB |                66.29 kB

Lazy Chunk Files              | Names            |  Raw Size | Estimated Transfer Size

421.5a6fb05e3b1ec9ec.js       | home-home-module |   1.48 kB |               444 bytes


Here the application is very small thats why we might be able to see the numbers correctly as Angular Code itself is tree shaken if we dont 
use some features, so previously we were not using lazy loading right. But now we are thats why code for that is addes as well to main bundle. But if our app is big then surely it benefits a lot.

One thing here is we are still loading experience and skills upfront in home where users might not wanna see them, so lets see how can we load them on demand!

********************************************************************************************************************
  
  3-lazy-loading-component-only-has-issues
  
  Here we tried lazy loading a component directly. We have a Skill module  which exports Skill component , which our HomeModule imports, thats why it ends up in lazy loaded home module, but we dont want this skill module at that time, we can further lazy load this.
  
  We will lazy load a component
  
  1) Remove the component from exports array of SKillModule, 
  2) Remove the component selector from HomeModule Component
  3) Remove the import of SkillModule from HomeModule
  4) Create a button or some other logic to load the skills at runtime
  
    @ViewChild('container',{read:ViewContainerRef}) container:ViewContainerRef | null = null;

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
  
  Here we are fetching the component alone, if this component uses some other dependencies like CommonModule ngIf then it wont work as dependencies 
  imports are in Module not in component!
  
  
  ********************************************************************************************************************
  
  4-lazy-load-module-without-router
