import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlphaVantageService {
  private apiKey = 'L3FOSKNQPF53VHA0';
  private apiUrl = 'https://www.alphavantage.co/query/';

  constructor(private http: HttpClient) {}

  getStockTimeSeries(symbol: string): Observable<any> {
    const params = {
      function: 'TIME_SERIES_INTRADAY',
      symbol: symbol,
      interval: '1min',
      apikey: this.apiKey,
    };

    return this.http.get(this.apiUrl, { params });
  }
}
