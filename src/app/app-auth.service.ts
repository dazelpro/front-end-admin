import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppAuthService {

    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('auth-goblog')) {
            return state.url.startsWith('/')
                ? true
                : (this.router.navigate(['/login']), false);

        } else {
            return state.url.startsWith('/')
                ? (this.router.navigate(['/login']), false)
                : true;
        }
    }
}
