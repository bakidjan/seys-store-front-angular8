import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private selectedProducts: any;
  private currentProduct: any;
  private editPhoto: boolean;
  private currentFileToUpload: any;
  private progress: number;
  private selectedFiles: any;
  private titleProduct: string;
  private timeStamp: any;

  constructor(private catService: CatalogueService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        let defaultId = this.activatedRoute.snapshot.params.p1;
        if (defaultId == 1) {
          this.titleProduct = 'Selection';
          this.getProductSelected('/products/search/selectedProducts');
        } else if (defaultId == 2) {
          let idCat = this.activatedRoute.snapshot.params.p2;
          this.titleProduct = 'Produits de la categorie '+idCat;
          this.getProductSelected('/categories/' + idCat + '/products');
        } else if (defaultId == 3) {
          this.titleProduct = 'Produits en Promo';
          this.getProductSelected('/products/search/promoProducts');
        } else if (defaultId == 4) {
          this.titleProduct = 'Produits disponibles';
          this.getProductSelected('/products/search/availableProducts');
        }
      }
    });
    let defaultId = this.activatedRoute.snapshot.params.p1;
    if (defaultId == 1) {
      this.getProductSelected('/products/search/selectedProducts');
    }
  }

  private getProductSelected(url) {
    this.catService.getResource(url)
      .subscribe(data => {
        this.selectedProducts = data;
      }, error => {
        console.log(error);
      });
  }

  onEditPhoto(p: any) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  onUploadPhoto() {
    this.progress = 0;
    this.currentFileToUpload = this.selectedFiles.item(0);
    this.catService.uploadPhotoProduct(this.currentFileToUpload, this.currentProduct.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('Photo chargée avec succès');
          //this.getProductSelected('/products/search/selectedProducts');
          this.timeStamp  = new Date();
        }
      }, error => {
        alert('Probleme de chargement');
      });
    this.selectedFiles = undefined;
  }

  getTS() {
    return this.timeStamp;
  }

  uploadButtonVisible() {
    return this.selectedFiles
  }

  onAddProductToCaddy(p) {
    console.log(p)
  }

  onProductDetails(p) {
    let url = btoa(p._links.self.href);
    this.router.navigateByUrl('product-details/'+url);

  }
}
