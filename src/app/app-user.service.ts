import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AppRestApiService } from './app-rest-api.service';

@Injectable({
    providedIn: 'root'
})
export class AppUserService {

    message     = '';
    messageType = '';
    user: any   = {};
    keyUser     = '';
    idUser      = '';
    nameUser    = '';
    emailUser   = '';
    token:any;

    constructor(
        private router: Router, 
        private rest: AppRestApiService
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.message = '';
                this.messageType = '';
            }
        });
    }

    error(message) {
        this.messageType = 'danger';
        this.message = message;
    }

    async getProfile() {
        if (localStorage.getItem('auth-goblog') !== null){
            await this.rest.user_getProfile().subscribe((data) => {
                if(data['success']){
                    this.token = localStorage.getItem('auth-goblog');
                    this.user = data['data'];
                    this.nameUser = this.user['user_name'].replace(/\w\S*/g,function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
                    this.keyUser = this.user['user_name'].toUpperCase().slice(0,1);
                    this.emailUser = this.user['user_email'];
                    this.idUser = this.user['user_id'];
                }
            });
        }
    }
}
