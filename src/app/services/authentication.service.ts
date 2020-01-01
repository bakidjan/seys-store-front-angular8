import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users = [
    {username: 'admin', password: '1234', roles: ['ADMIN', 'USER']},
    {username: 'user1', password: '1234', roles: ['USER']},
    {username: 'user2', password: '1234', roles: ['USER']},
  ];
  userAuthenticated;
  isAuthenticated: boolean;
  private token: string;

  constructor() {
  }

  login(username: string, password: string) {
    let user;
    this.users.forEach(u => {
      if (u.username == username && u.password == password) {
        user = u;
        this.token = btoa(JSON.stringify({username: u.username, roles: u.roles}));
      }
    });
    if (user) {
      this.isAuthenticated = true;
      this.userAuthenticated = user;
    } else {
      this.isAuthenticated = false;
      this.userAuthenticated = undefined;
    }
  }

  isAdmin() {
    if (this.isAuthenticated) {
      if (this.userAuthenticated.roles.indexOf('ADMIN') > -1) {
        return true;
      }
      return false;
    }
  }

  saveUserAuthenticated() {
    if (this.userAuthenticated) {
      localStorage.setItem('authToken', this.token);
    }
  }

  loadUserAuthenticatedFromLocalStorage(){
    let userEncodedTokenBase64 = localStorage.getItem('authToken');
    if (userEncodedTokenBase64){
      let userDecodeTokenBase64 = JSON.parse(atob(userEncodedTokenBase64));
      this.userAuthenticated = {username : userDecodeTokenBase64.username, roles: userDecodeTokenBase64.roles};
      this.isAuthenticated = true;
      this.token = userEncodedTokenBase64
    }
  }

  removeUserAuthenticatedFromLocalStorage(){
    localStorage.removeItem("authToken");
    this.isAuthenticated = false;
    this.userAuthenticated = undefined;
    this.token = undefined;
  }
}
