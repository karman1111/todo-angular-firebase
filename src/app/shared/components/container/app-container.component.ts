import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavigationComponent } from "../navigation/navigation.component";
import { LogoComponent } from "../logo.component";
import { LoadingComponent } from "../loading.component";

@Component({
    selector: "app-component",
    templateUrl: "./app-container.component.html",
    standalone: true,
    imports: [
        RouterOutlet,
        MatSidenavModule, 
        NavigationComponent,
        LogoComponent,
        LoadingComponent
    ],
    styleUrls: ['./app-container.component.css']
})
export class AppContainerComponent {
    
}