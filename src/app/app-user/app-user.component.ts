import { Component, OnInit } from '@angular/core';
import { AppRestApiService } from '../app-rest-api.service';
import { MatDialog } from '@angular/material';
import { UserAddComponent } from './user-add/user-add.component';

@Component({
    selector: 'app-app-user',
    templateUrl: './app-user.component.html',
    styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {

    data: any={};
    dataUsers: [];
    p: number [] = [1];

    constructor(
        private rest: AppRestApiService,
        public dialog: MatDialog,
    ) { }

    async ngOnInit() {
        await this.rest.users_all().subscribe((data) => {
            this.data = data['item'];
            data['success']
                ? (this.dataUsers = data['data'])
                : this.data.error(data['message']
            );
        })
    }

    openDialogAdd() {
        const dialogRef = this.dialog.open(UserAddComponent, {
            width: '450px',
            height: '360px'
        });
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

}
