import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  private currentProduct: any;

  constructor( private activatedRoute : ActivatedRoute,
               private cataService: CatalogueService,
               private  authService: AuthenticationService) { }

  ngOnInit() {
    let url = atob(this.activatedRoute.snapshot.params.url);
    this.cataService.getProduct(url).subscribe(data=>{
      console.log(data)

    })
  }

}
