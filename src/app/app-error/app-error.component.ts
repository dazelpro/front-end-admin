import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-app-error',
    templateUrl: './app-error.component.html',
    styleUrls: ['./app-error.component.css']
})
export class AppErrorComponent implements OnInit {
    reason ='';
    status : any;
    admin: boolean;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: string,
        private router : Router,
        public dialogRef: MatDialogRef<AppErrorComponent>
    ) { 
        switch (data["status"]) {
            case 500:
                this.status = data["status"];
                console.log(this.status);
                this.logout();
                window.location.replace('/');
                break;
            
            default:
                this.status = data["status"];
                console.log(this.status);
                break;
            }
            this.reason = data["reason"];
    }

    ngOnInit() {
    }

    closedDialog(): void {
        this.dialogRef.close();
    }

    closeFailedLogin(): void {
        this.dialogRef.close();
    }

    closeExpired(): void {
        this.dialogRef.close();
        localStorage.clear();
        this.router.navigate(['/']);
    }

    logout(){
        localStorage.clear();
        this.router.navigate(['/']);
    }

}
