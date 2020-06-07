import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { BlogService } from './services/blog.service';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent {
    user: User;
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private blogService : BlogService
    ) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }
    logout() {
      this.authenticationService.logout();
  }

  
}
