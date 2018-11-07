import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angulario-pushArray-localStorage';
  personer: any;
  arrTemp: any;

  constructor(private http: HttpClient) {}

  addPerson() {
    console.log('addPerson()');
    console.log('Namn: ' + this.namnet);
    console.log('Stad: ' + this.staden);
    this.arrTemp  = {'namn': this.namnet,	'ort' : this.staden};
    this.personer.push(this.arrTemp);

    // Rensar formuläret
    // this.namnet = '';
    // this.staden = '';
  }

  ngOnInit(): void { // adding the lifecycle hook ngOnInit
    this.http.get('/assets/data.json').subscribe(retur_data => {
      console.log(retur_data); // using the HttpClient instance, http to call the API then subscribe to the data and display to console
      this.personer = retur_data;
    });
  }

}
