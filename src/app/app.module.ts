import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { AppCategoryComponent } from './app-category/app-category.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLoginComponent } from './app-login/app-login.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRestApiService } from './app-rest-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppAuthService } from './app-auth.service';
import { AppUserService } from './app-user.service';
import { AppErrorComponent } from './app-error/app-error.component';
import { ErrorDialogService } from './app-error/error-dialog.service';
import { HttpConfigInterceptor } from './app-httpconfig.interceptor';
import { CategoryAddComponent } from './app-category/category-add/category-add.component';
import { CategoryEditComponent } from './app-category/category-edit/category-edit.component';
import { AppArticleComponent } from './app-article/app-article.component';
import { ArticleAddComponent } from './app-article/article-add/article-add.component';
import { ArticleDeleteComponent } from './app-article/article-delete/article-delete.component';
import { ArticleEditComponent } from './app-article/article-edit/article-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        AppDashboardComponent,
        AppCategoryComponent,
        AppLoginComponent,
        AppErrorComponent,
        CategoryAddComponent,
        CategoryEditComponent,
        AppArticleComponent,
        ArticleAddComponent,
        ArticleDeleteComponent,
        ArticleEditComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule
    ],
    entryComponents: [
        AppErrorComponent,
        CategoryAddComponent,
        CategoryEditComponent
    ],
    providers: [
        AppAuthService,
        AppRestApiService,
        AppUserService,
        ErrorDialogService,
        {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
