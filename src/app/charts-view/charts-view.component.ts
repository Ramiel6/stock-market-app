import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import {GetChartService} from '../get-chart.service';

// import {Data} from './types'
// import {single, multi} from './data';


@Component({
  selector: 'app-charts-view',
  templateUrl: './charts-view.component.html',
  styleUrls: ['./charts-view.component.css']
})
export class ChartsViewComponent implements OnInit {
  
  //Clean sub to avoid memory leakage  https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
  private ngUnsubscribe: Subject<boolean> = new Subject(); 
  
  constructor(private getChartService: GetChartService) {
    // Object.assign(this, {single, multi}) 
   }
  
  ngOnInit() {
    this.getChartData()
    this.connection = this.getChartService.updateChart()
      .takeUntil(this.ngUnsubscribe) // to guarantee subscriptions will be cleaned up
      .subscribe( () => { 
        console.log('update')
        this.getChartData()
      })
  }
  // @Input() inputValue:string;
 //------Asyn-----// 
  connection;
  getChartData(): void {
    this.getChartService.getChartData()
        .takeUntil(this.ngUnsubscribe) // to guarantee subscriptions will be cleaned up
        .subscribe(data => {
          console.log(data)
          // this.lineChartLabels = data.dataset.data.map(item => item[0])
          // let values:Array<number> = data.dataset.data.map(item => item[4])
          this.multi = data.results.map( result => ({
                          "name": result.dataset_code,
                          "series": result.data.map( item => ({"name":new Date(item[0]), "value":item[4]}) )
                          }))
          console.log(this.multi)
          this.pills = data.results
        });
  }
  addStock() {
    if (this.multi && this.multi.length >= 5) {
      this.inputError('You can\'t add more than 5 stocks!')
    }
    else if (this.addValue && !/^[^\s]([\w\d])*$/gi.test(this.addValue)) {
      this.inputError('Invalid Value only letters and numbers are allowed!')
    }
    else if (this.addValue) {
        this.submiting = true
        this.getChartService.addStock(this.addValue)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
              console.log(data);
              this.hasError = false;
              this.required = false
              // this.getChartData()
              this.showNotify('Stock added Successfully!');
              this.submiting = false;
            },
            err => {
              this.hasError = true;
              this.error = err;
              this.submiting = false;
              }
            )
      
    } else {
      this.required = true
    } 
  }
  stockRemove(pill: string) {
      this.getChartService.removeStock(pill)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
              console.log(data)
              // this.getChartData()
              this.showNotify('Stock Removed Successfully!')
      })
  }
  
  // https://www.quandl.com/api/v3/datasets/WIKI/GOOGL.json?collapse=monthly&api_key=nXTC_hihQb_cBb4XxeWy
  // --- Chart ---- ///
  // single: any[];
  multi: any[];
  pills: any[];
  view: any[] = [(window.innerWidth -(window.innerWidth/10)), 600];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Timeline';
  showYAxisLabel = true;
  yAxisLabel = 'Value';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  timeline = true;
  
  onSelect(event) {
    console.log(event);
  }

///input///
  addValue:string;
  required = false;
  submiting = false;
  hasError = false;
  error:string = '';
  
  inputError(error:string){
    this.hasError = true;
    this.error = error
    setTimeout(function(){ 
      this.hasError = false; 
    }, 5000);
  }
// Notify//
  showAlert = false;
  NotifyMsg:string;
  notifyType:string = 'alert'
  showNotify(NotifyMsg:string, notifyType:string ='alert') {
    this.showAlert = true;
    this.NotifyMsg = NotifyMsg;
    this.notifyType = notifyType;
  }

  onClose(reason: string) {
    console.log(`Alert closed by ${reason}`);
    this.showAlert = false;
  }
  //tooltip //
  placement: string;
  open = true;
  openClick1 = false;
  openClick2 = false;

  change(placement: string) {
    this.open = true;
    this.placement = placement;
  }
  
  //Clean sub to avoid memory leakage
  ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}


