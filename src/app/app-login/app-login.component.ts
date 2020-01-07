import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppRestApiService } from '../app-rest-api.service';
import { Router } from '@angular/router';
import { AppUserService } from '../app-user.service';

@Component({
    selector: 'app-app-login',
    templateUrl: './app-login.component.html',
    styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {

    email       ='';
    password    ='';

    constructor(
        private rest: AppRestApiService,
        private router : Router,
        public data: AppUserService
    ) { }

    ngOnInit() {
    }

    async login(form: NgForm) {
        if(form['value']['username'] !== undefined || form['value']['password'] !== undefined) {
            try {
                await this.rest.user_login({
                    email: form['value']['email'],
                    password: form['value']['password'],
                },
                ).subscribe(async (data)=>{
                    if (data['success']) {
                        localStorage.setItem('auth-goblog', data['token']);
                        this.router.navigate(['/dashboard']);
                        this.data.getProfile();
                }
                },(err)=>{
                    console.log(err);
                }); 
            } catch (error) {
                console.log(error);
            } 
        }
    }

}
