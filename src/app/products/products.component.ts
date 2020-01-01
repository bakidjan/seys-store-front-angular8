import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {ProductModel} from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products: ProductModel;
  private currentProduct: any;
  private photoSelectedToUpload: any;
  private photoToEdit: boolean;
  private currentPhotoSelected: File;
  private progress: number;
  private timeStamp: Date;

  constructor(private catService: CatalogueService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    let p1 = this.activatedRoute.snapshot.params.p1;
    if (p1 == 1) {
      this.catService.title = "Selection";
      this.getProducts('/products/search/selectedProducts');
    }

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let p1 = this.activatedRoute.snapshot.params.p1;
        if (p1 == 1) {
          this.getProducts('/products/search/selectedProducts');
        } else if (p1 == 2) {
          let idCat = this.activatedRoute.snapshot.params.p2;
          this.getProducts('/categories/' + idCat + '/products');
        }
        else if (p1 == 3) {
          this.getProducts('/products/search/promoProducts');
        }
        else if (p1 == 4) {
          this.getProducts('/products/search/availableProducts');
        }
      }
    });

  }

  getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data => {
        this.products = data;
      }, error => {
        console.log(error);
      });
  }

  onEditPhoto(p: any) {
    this.currentProduct = p;
    this.photoToEdit = true;
  }

  onChargePhotoSelectedToUpload(event) {
    this.photoSelectedToUpload = event.target.files;
  }

  onUploadPhotoSelected() {
    this.currentPhotoSelected = this.photoSelectedToUpload.item(0);
    this.progress = 0;
    this.catService.uploadPhoto(this.currentPhotoSelected, this.currentProduct.id)
      .subscribe(event=>{
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('Photo chargée avec succès');
          //this.getProductSelected('/products/search/selectedProducts');
          this.timeStamp  = new Date();
        }
      }, error => {
        console.log(error)
      })
    this.photoSelectedToUpload = undefined;
  }

  getTs() {
    return this.timeStamp;
  }

  isAdmin() {
    return this.authService.isAdmin()
  }

  buttonUploadVisible() {
    return this.photoSelectedToUpload;
  }

  onProductDetails(p: ProductModel) {
    let url = btoa(p._links.product.href);
    this.router.navigateByUrl("product-details/"+url)
  }
}
