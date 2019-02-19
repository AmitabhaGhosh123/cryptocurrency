import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CryptoService } from '../crypto.service';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import 'hammerjs';

@Component({
  selector: 'app-cryptolist',
  templateUrl: './cryptolist.component.html',
  styleUrls: ['./cryptolist.component.scss']
})
export class CryptolistComponent implements OnInit {

  public key:string;
  public displaycheckbox:boolean =false;
  public reverse:boolean = false;
  public allCurrency = [];
  public arr = [];
  public arrCopy = [];
  public result = [];
  public length: any;
  public selected: any;
  selectedIndex: number = null;
  public favData = [];
  public selectedCoin = [];
  public comparisonId = [];

  
  constructor(private route:ActivatedRoute,private router:Router,public toastr:ToastrService,public cryptoservice:CryptoService) { 
    console.log("listview called");
  }

  ngOnInit() {

    this.cryptoservice.getAllCurrency().subscribe(

      data => {

        this.allCurrency = data.data;
        for(let element in this.allCurrency){

          this.arr.push(this.allCurrency[element]);
        }

        this.arrCopy = this.arr;
      },

      error => {

        console.log(error);
      }
    )
  }


    public sort(key) {

      this.key = key;
      this.reverse = !this.reverse;
    }

    p:number = 1;

    // for range slider

    public myOnFinish(event1,type) {

      let min = event1.from;
      let max = event1.to;

      if(type === 'marketCap') {

        if(this.result.length > 0){

          this.result = this.result.filter(word => (word.quotes.USD.market_cap > min && word.quotes.USD.market_cap < max));
        }
        else {

          this.result = this.arrCopy.filter(word => (word.quotes.USD.market_cap > min && word.quotes.USD.market_cap < max));
        }
      }

      else {

        if(this.result.length > 0) {

          this.result = this.result.filter(word => (word.quotes.USD.price > min && word.quotes.USD.price < max));

        }
        else {

          this.result = this.result.filter(word => (word.quotes.USD.price > min && word.quotes.USD.price < max));

        }
      }

      this.arr = this.result;
    }

    // selected coin in local storage

    public onSelect(j) {

      let key = 'id';
      this.favData.push(j);
      localStorage.setItem(key, JSON.stringify(this.favData));
      this.selected = (this.selected === j ? null : j);
    }

    public isActive(j) {

      return this.selected === j;
    }

    // for selecting coin by checkbox

    public onChange(id:number, isChecked:boolean) {

      if(isChecked) {

        this.comparisonId.push(id);
      }
      else {

        this.comparisonId.splice(0,this.comparisonId.length);
        if(isChecked){

          this.comparisonId.push(id);
        }
      }
    }

    public checkboxdisplay() {

      this.displaycheckbox = !this.displaycheckbox;
    }

    // navigate to comparison chart

    public onSelectCurrency() {

      if(this.comparisonId.length > 2)
      {
        alert("Please select only two currency");
        location.reload(true);
      }
      else
      {
        console.log(this.comparisonId);
        this.router.navigate(['/comparison',this.comparisonId[0],this.comparisonId[1]]);
      }
    }

    // navigate to price chart

    public gopricechart(v) {

      this.router.navigate(['/priceChart'],{queryParams: {pc:v}});
    }
}
