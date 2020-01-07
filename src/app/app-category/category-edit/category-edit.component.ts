import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppRestApiService } from 'src/app/app-rest-api.service';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

    category_name   : '';

    constructor(
        public dialogRef: MatDialogRef<CategoryEditComponent>,
        @Inject(MAT_DIALOG_DATA) public dataId: object,
        private rest: AppRestApiService,
    ) { }

    ngOnInit() {
        this.category_name      = this.dataId[1];
    }

    async updateData() {
        if (this.category_name !== ''){
            try {
                await this.rest.update_category({
                    category_id: this.dataId[0],
                    category_name: this.category_name,
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
