import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { CryptoService } from './crypto.service';
import { OrderModule } from 'ngx-order-pipe';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StorageServiceModule} from 'angular-webstorage-service';
import { DataTablesModule } from 'angular-datatables';
import { ChartModule } from 'angular-highcharts';
import { NgxPaginationModule} from 'ngx-pagination';
import { CryptolistComponent } from './cryptolist/cryptolist.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    CryptolistComponent,
    ComparisonComponent,
    FavouritesComponent,
    PriceChartComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    OrderModule,
    ChartModule,
    StorageServiceModule,
    HttpClientModule,
    NgxPaginationModule,
    IonRangeSliderModule,
    AngularFontAwesomeModule,
    DataTablesModule,
    RouterModule.forRoot([
      {path:'list', component: CryptolistComponent},
      {path:'', redirectTo:'list',pathMatch:'full'},
      {path:'priceChart',component: PriceChartComponent},
      {path :'comparison/:id1/:id2', component: ComparisonComponent},
      {path :'favourites', component: FavouritesComponent}

]),
    ToastrModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
