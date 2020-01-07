import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorDialogService } from './app-error/error-dialog.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor( 
        public errorDialogService: ErrorDialogService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('auth-goblog');

        if (token) {
            request = request.clone({ headers: request.headers.set('x-access-token',token) });
        }

        if (request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                switch (error.error) {
                    case 'Unauthorized': //Jika Token Bermasalah
                        data = {
                            reason: error && error.statusText ? error.statusText : error.message,
                            status: error.status
                        };
                    break;
                    case null:        //    Apabila backend tidak aktif
                        data = {
                            reason: error && error.statusText ? error.statusText : error.message,
                            status: error.status
                        }; 
                    break;
                    
                    default:
                            switch (error.error.message) {
                                case undefined:        //    Apabila status error assoactionKey Sequelize
                                        data = {
                                                reason: error && error.message ? error.message : error.statusText,
                                                status: error.status
                                        }; 
                                    break; 
                                default:
                                        switch (error.error.message.errors) {                                            
                                            case undefined:
                                                switch (error.error.message.name) {
                                                    case undefined:    //Untuk error salah password dll, pesan buat sendiri
                                                        data = {
                                                            reason: error && error.error.message ? error.error.message : error.statusText,
                                                            status: error.status
                                                        };
                                                    break;                        
                                                    default:    // Untuk error delete foreign key masih ada 
                                                        data = {
                                                            reason: error && error.error.message.name ? error.error.message.name : error.statusText,
                                                            status: error.status
                                                        };
                                                    break;
                                                }
                                                break;                  
                                            default:    // Untuk error apabila kena validasi pada sequelize
                                                data = {
                                                    reason: error && error.error.message.errors[0].message ? error.error.message.errors[0].message : error.error.message,
                                                    status: error.status
                                                };
                                            break;
                                        }
                                break;
                            }
                        break;
                }            
                if(data['reason'] !== undefined){
                    this.errorDialogService.openDialog(data);
                    return throwError(error);
                }
            })
        );
    }
}