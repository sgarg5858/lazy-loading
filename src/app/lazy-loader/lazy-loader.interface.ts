import { LoadChildrenCallback } from "@angular/router";

export interface LazyLoader{
    loader:LoadChildrenCallback;
}