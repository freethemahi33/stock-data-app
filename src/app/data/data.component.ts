import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlphaVantageService } from '../alpha-vantage.service';
import { Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  symbol: string = '';
  chartData: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private alphaVantageService: AlphaVantageService
  ) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get('symbol') || '';
    this.fetchData();
  }

  private fetchData() {
    this.alphaVantageService
      .getStockTimeSeries(this.symbol)
      .subscribe((data) => {
        console.log("Raw API data: ", data);
        this.chartData = this.parseData(data);
        console.log("Parsed chart data: ", this.chartData);
      });
  }

  private parseData(data: any): any[] {
    const timeSeriesKeys = Object.keys(data).filter((key) => key.includes('Time Series'));

    if (timeSeriesKeys.length === 0) {
      return [];
    }

    const chartData: any[] = [];

    for (const timeSeriesKey of timeSeriesKeys) {
      const timeSeries = data[timeSeriesKey];
      const seriesData = Object.entries(timeSeries).map(([date, valueObj]: [string, any]) => {
        return {
          name: new Date(date),
          value: parseFloat(valueObj['4. close']),
        };
      });

      chartData.push({
        name: timeSeriesKey,
        series: seriesData,
      });
    }

    return chartData;
  }
}
