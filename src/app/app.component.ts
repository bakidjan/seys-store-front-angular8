import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './services/catalogue.service';
import {ActivatedRoute, Router} from '@angular/router';
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
              private authService : AuthenticationService) {
  }

  ngOnInit() {
    this.authService.loadUserAuthenticatedFromLocalStorage();
    this.getCategories();
  }

  getCategories() {
    this.catService.getResource('/categories')
      .subscribe(data => {
        this.categories = data;
      }, error => {
        console.log(error);
      });
  }

  onGetProductsByCategory(c) {
    this.currentCategory = c;
    this.catService.title = 'Produits de la categorie ' + c.id;
    this.router.navigateByUrl('products/2/' + c.id);
  }

  onGetPromoProducts() {
    this.catService.title = 'Promo';
    this.router.navigateByUrl('products/3/0');
  }

  onGetAvailableProducts() {
    this.catService.title = 'Disponibles';
    this.router.navigateByUrl('products/4/0');
  }

  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
