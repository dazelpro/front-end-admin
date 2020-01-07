import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserService } from './app-user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    over: any;
    constructor( 
        public router: Router,
        public data: AppUserService
    ) {
        this.data.getProfile();
    }

    logout(){
        localStorage.clear();
        window.location.replace('/login');
    }
}
