import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(private authenticationService: AuthenticationService){}
  intercept(request: HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    //add authorization header if jwt available
    let currentUser = this.authenticationService.currentUserValue;
    if(currentUser && currentUser.token){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}