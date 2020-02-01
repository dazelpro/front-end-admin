import { Component, OnInit } from '@angular/core';
import { AppRestApiService } from '../app-rest-api.service';
import { MatDialog } from '@angular/material';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

@Component({
    selector: 'app-app-category',
    templateUrl: './app-category.component.html',
    styleUrls: ['./app-category.component.css']
})
export class AppCategoryComponent implements OnInit {

    data: any={};
    dataCategory: [];
    // p: number [] = [1];
    p: number = 1;

    constructor(
        private rest: AppRestApiService,
        public dialog: MatDialog,
    ) { }

    async ngOnInit() {
        await this.rest.category_all().subscribe((data) => {
            this.data = data['item'];
            data['success']
                ? (this.dataCategory = data['data'])
                : this.data.error(data['message']
            );
        })
    }

    openDialogAdd() {
        const dialogRef = this.dialog.open(CategoryAddComponent, {
            width: '450px',
            height: '220px'
        });
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    dialogEditItem(id) {
        const dialogRef = this.dialog.open(CategoryEditComponent, {
            width: '450px',
            height: '220px',
            data: id
        });
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    async deleteItem(id) {
        await this.rest.delete_category({category_id: id}).subscribe((data) => {
            this.data = data['item'];
            data['success']
                ? this.ngOnInit()
                : this.data.error(data['message']
            );
        })
    }

}
