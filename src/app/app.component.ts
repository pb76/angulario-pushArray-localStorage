import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angulario-pushArray-localStorage';
  personer: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void { // adding the lifecycle hook ngOnInit
    this.http.get('/assets/data.json').subscribe(retur_data => {
      console.log(retur_data); // using the HttpClient instance, http to call the API then subscribe to the data and display to console
      this.personer = retur_data;
    });
  }

}
