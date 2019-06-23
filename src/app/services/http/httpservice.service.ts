import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";


@Injectable()
export class HttpService {
    
    constructor(
      private http: Http
  ){}

  

  // 取得
  async get(url: string): Promise<any[]>{
      return this.http.get(url).toPromise()
      .then(this.extractData)
      .catch(this.handlerError);
  }

  // 登録
  async post(url: string, jsondata: string): Promise<any[]> {
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });

      return this.http.post(url, jsondata).toPromise()
              .then(this.extractData)
              .catch(this.handlerError);
  }

  private extractData(res: Response){
      let body = res.json();
      return body || {};
  }

  private handlerError(error: Response | any){
      console.log(error.toString());
      return Observable.throw(error.toString());
  }

  multipartPost(files: FileList): Promise <any[]> {
    let fileToUpload = files.item(0);

    let formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post("https://api-2445582032290.production.gw.apicast.io/v1/foodrecognition?user_key=ad744df19e93b7ea6692eeb1d9afe18c", formData)
    .toPromise()
    .then(this.extractData)
    .catch(this.handlerError);
  }
}