import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Car {
  id: number;
  year: number;
  make: string;
  model: string;
  hasDetails: number;
}

@Component({
  selector: 'app-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.css']
})
export class ModelsPageComponent implements OnInit {
  @Input() year = '0';
  @Output() yearChange = new EventEmitter<string>();
  @Input() make = 'noFilter';
  @Output() makeChange = new EventEmitter<string>();

  public host = 'https://vehicle-data.azurewebsites.net';
  public years: string[];
  public makes: string[];
  public carList: Car[] = [];
  public nextCarList: Car[] = [];
  constructor(private http: HttpClient) { }
  public currentSearch: string = this.host + '/api/models?';
  public offset = 0;
  public lastPage = true;

  ngOnInit() {
    this.fetchYears();
    this.fetchMakes();
  }

  private async fetchYears() {
    this.years = await this.http.get<string[]>(this.host + '/api/years').toPromise();
  }
  private async fetchMakes() {
    this.makes = await this.http.get<string[]>(this.host + '/api/makes').toPromise();
  }
  public async fetchCars() {
    this.currentSearch = this.host + '/api/models?';
    if (this.year !== '0') {
      this.currentSearch += 'year=' + this.year;
    }
    if (this.make !== 'noFilter') {
      this.currentSearch += '&make=' + this.make;
    }
    this.carList = await this.http.get<Car[]>(this.currentSearch).toPromise();
    this.checkIfLastPage();

  }

  // this.carList = await this.http.get<Car[]>(this.host + '/api/models?make=' + this.make + '&year=' + this.year).toPromise();
  public async previousPage() {
    this.offset -= 10;
    this.carList = await this.http.get<Car[]>(this.currentSearch + '&offset=' + this.offset).toPromise();
    this.checkIfLastPage();
  }
  public async nextPage() {
    this.offset += 10;
    if (this.currentSearch.includes('?')) {
      this.carList = await this.http.get<Car[]>(this.currentSearch + '&offset=' + this.offset).toPromise();
      this.checkIfLastPage();
    }
  }

  public async checkIfLastPage() {
    this.nextCarList = await this.http.get<Car[]>(this.currentSearch + '&offset=' + this.offset + 10).toPromise();
    if (this.carList.length < 10 || this.nextCarList.length < 10) {
      this.lastPage = true;
    } else {
      this.lastPage = false;
    }
  }

  public onYearChange() {
    this.yearChange.emit(this.year);
  }
  public onMakeChange() {
    this.makeChange.emit(this.make);
  }

}
