import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private messageError: string;

  constructor( private authService: AuthenticationService,
               private router: Router) { }

  ngOnInit() {
  }

  onLogin(value: any) {
    this.authService.login(value.username, value.password);
    if(this.authService.isAuthenticated){
      this.authService.saveUserAuthenticated();
      this.router.navigateByUrl('');
    } else {
      this.messageError = "ce user n'est pas enregistré "
    }
  }
}
