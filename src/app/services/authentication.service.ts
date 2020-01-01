import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users = [
    {username: 'admin', password: '1234', roles: ['ADMIN', 'USER']},
    {username: 'user', password: '1234', roles: ['USER']},
    {username: 'user2', password: '1234', roles: ['USER']}
  ];

  public isAuthenticated: boolean;
  public userAuthenticated;
  private token: string;

  constructor() {
  }

  login(username: string, password: string) {
    let user;
    this.users.forEach(u => {
      if (u.username == username && u.password == password) {
        user = u;
        /*
        * enregistrer le token de user
        * username et roles pour ne pas garder son mdp*/
        this.token = btoa(JSON.stringify({username: u.username, roles : u.roles}))
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
    if (this.userAuthenticated) {
      if (this.userAuthenticated.roles.indexOf('ADMIN') > -1) {
        return true;
      }
      return false;
    }
  }

  saveAuthenticatedUser(){
    if(this.userAuthenticated){
      localStorage.setItem('authToken', this.token)
    }
  }

  loadUserAuthenticatedFromLocalStorage(){
    let tok = localStorage.getItem('authToken');
    if(tok){
      let user = JSON.parse(atob(tok))
      this.userAuthenticated = {username : user.username, roles : user.roles}
      this.isAuthenticated = true;
      this.token = tok;
    }
  }

  removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.userAuthenticated = undefined;
    this.token = undefined;
  }
}
