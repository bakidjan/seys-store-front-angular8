import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './services/catalogue.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private categories: any;
  private currentCategory: any;

  constructor(private catService: CatalogueService,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.loadUserAuthenticatedFromLocalStorage();
    this.getCategory();
  }

  private getCategory() {
    this.catService.getResource('/categories')
      .subscribe(data => {
        this.categories = data;
      }, error => {
        console.log(error);
      });
  }


  onGetProductsByCategory(c) {
    this.currentCategory=c;
    this.router.navigateByUrl('/selectedProducts/2/'+ c.id);
  }

  onSelectedProducts() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/selectedProducts/1/0');
  }

  onProductsPromo() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/selectedProducts/3/0');
  }

  onProductsAvailable() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/selectedProducts/4/0');

  }

  onLogout() {
    this.authService.removeUserAuthenticatedFromLocalStorage();
    this.router.navigateByUrl('/login')
  }
}



