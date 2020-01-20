import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppRestApiService } from 'src/app/app-rest-api.service';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

    user_name='';
    user_email='';
    user_pass='';

    constructor(
        public dialogRef: MatDialogRef<UserAddComponent>,
        private rest: AppRestApiService,
    ) { }

    ngOnInit() {
    }

    async saveData() {
        if (this.user_name !== undefined && this.user_email !== '' && this.user_pass !== '') {
            try {
                await this.rest.save_user({
                    user_name: this.user_name,
                    user_email: this.user_email,
                    user_pass: this.user_pass,
                },
                ).subscribe(async (data)=>{
                    if (data['success']) {
                        this.dialogRef.close();
                }
                },(err)=>{
                    console.log(err);
                }); 
            } catch (error) {
                console.log(error);
            } 
        }
    }

    onCancel() {
        this.dialogRef.close();
    }

}
