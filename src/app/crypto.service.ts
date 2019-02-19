import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  public Currency;
  public baseUrl = 'https://api.coinmarketcap.com/v2/';
  public graphUrl = 'https://graphs2.coinmarketcap.com/currencies/';


  constructor(private _http:HttpClient) { 

    console.log("service called");
  }

  public getAllCurrency() :any
  {
     let Currency = this._http.get(this.baseUrl +'ticker/');
      return Currency;
  }

  public getAllGraphData(): any 
  {
    let priceTime = this._http.get(this.graphUrl);
    return priceTime;
  }

  public specific(s):any {
    let res=this._http.get("https://api.coinmarketcap.com/v2/ticker/" + s + "/");
    return res;
 }

 private handleError(err: HttpErrorResponse){

  console.log("Handle error Http calls")
    console.log(err.message);
    console.log(err.status);
    return Observable.throw(err.message);
}
 
}
  
