import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  public getResource(url) {
    return this.httpClient.get(this.host + url);
  }

  public getProduct(url){
    return this.httpClient.get(this.host + url);
  }

  uploadPhotoProduct(fileToUpload: File, idProduct: number): Observable<HttpEvent<{}>> {
    let formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    const req = new HttpRequest('POST', this.host + '/uploadPhoto/' + idProduct, formData, {
      reportProgress: true,
      responseType: 'text',
    });
    return this.httpClient.request(req);
  }
}
