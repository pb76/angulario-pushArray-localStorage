import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from 'ngx-localstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angulario-pushArray-localStorage';
  personer: any;
  arrTemp: any;
  namnet: string;
  staden: string;

  constructor(private http: HttpClient, private _storageService: LocalStorageService) {}

  addPerson() {
    console.log('addPerson()');
    console.log('Namn: ' + this.namnet);
    console.log('Stad: ' + this.staden);
    this.arrTemp  = {'namn': this.namnet,	'ort' : this.staden};
    this.personer.push(this.arrTemp);
    this._storageService.set('person', JSON.stringify(this.personer));

    // Rensar formuläret
    this.namnet = '';
    this.staden = '';
  }

  resetData() {
    this._storageService.clear();
    this.getData();
  }

  getData() {
    if (this._storageService.count() !== 0 ) {
      console.log('_storageService.count()!=0');
      console.log(JSON.parse(this._storageService.get('person')));
      this.personer = JSON.parse(this._storageService.get('person'));
    } else {
      console.log('_storageService.count()==0');
      this.http.get('/assets/data.json').subscribe(retur_data => {
        console.log(retur_data); // using the HttpClient instance, http to call the API then subscribe to the data and display to console
        this._storageService.set('person', JSON.stringify(retur_data));
        this.personer = retur_data;
      });
    }
  }

  ngOnInit(): void { // adding the lifecycle hook ngOnInit
    // DEBUG: Antal poster i localstorage via ett promise
    // https://www.npmjs.com/package/ngx-localstorage#usage
    this._storageService.asPromisable().count()
      .then(count => console.log('Entries count: ', count))
      .catch(error => console.error(error));

    this.getData();
  }

}
