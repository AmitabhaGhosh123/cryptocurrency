import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  public arr = [];
  public allCurrency = [];
  public key = 'id';
  public myItem = [];
  public favouriteCoin = [];

  constructor(private _route: ActivatedRoute, private router: Router, public cryptoservice: CryptoService) { }

  ngOnInit() {

    this.cryptoservice.getAllCurrency().subscribe(
      data => {
        this.allCurrency = data.data;
        for (let element in this.allCurrency) {
          this.arr.push(this.allCurrency[element]);
        }
        this.myItem = JSON.parse(localStorage.getItem(this.key));

        if(this.myItem) {
          this.favouriteCoin = this.arr.filter((word) => this.myItem.includes(word.id));
        }
      },
      error => {
        console.log(error);
      }
    )

  }

}
