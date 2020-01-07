import { Component, OnInit } from '@angular/core';
import { AppRestApiService } from 'src/app/app-rest-api.service';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

    category_name = '';

    constructor(
        public dialogRef: MatDialogRef<CategoryAddComponent>,
        private rest: AppRestApiService,
    ) { }

    ngOnInit() {
    }

    async saveData() {
        if (this.category_name !== undefined && this.category_name !== '') {
            try {
                await this.rest.save_category({
                    category_name: this.category_name
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
