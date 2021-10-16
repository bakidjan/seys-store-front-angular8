import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public title: string;
  public host: string = 'http://192.168.201.11:8081';

  constructor(private httpClient: HttpClient) {
  }

  getResource(url) {
    return this.httpClient.get<any>(this.host + url);
  }
  getProducts(url) : Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(url);
  }


  /*
  * cette methode prend une photo et un id comme la methode la methode
  * uploadPhoto du backend
  * la requête est de type post pour ajouter la photo
  *  */
  uploadPhoto(photoToUpload: File, id: number): Observable<HttpEvent<{}>> {
    const url = this.host + '/uploadPhoto/' + id;
    const formData: FormData = new FormData();
    formData.append('file', photoToUpload);
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text',
    });
    return this.httpClient.request(req);
  }
}
