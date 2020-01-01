import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../models/product.model';
import {AuthenticationService} from '../services/authentication.service';
import {FileUploader} from 'ng2-file-upload';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  private currentProduct: ProductModel;
  private photoSelectedToUpload: any;
  private progress: number;
  private currentPhotoSelected: any;
  private timeStamp: Date;
  photoToEdit: boolean;
  private mode: number = 0;

  constructor(private catService: CatalogueService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
    let url = atob(this.activatedRoute.snapshot.params.url);
    this.catService.getProducts(url)
      .subscribe(data=>{
        this.currentProduct = data;
      }, error => {
        console.log(error)
      })
  }

  onEditProduct() {
    this.mode=1;
  }

  isAdmin() {
    return this.authService.isAdmin()
  }

  onEditPhoto(currentProduct: ProductModel) {
    this.currentProduct = currentProduct;
    this.photoToEdit = true;
  }


  onChargePhotoSelectedToUpload(event) {
    this.photoSelectedToUpload = event.target.files;
  }

  buttonUploadVisible() {
    return this.photoSelectedToUpload;
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
    return this.timeStamp ;
  }
}
