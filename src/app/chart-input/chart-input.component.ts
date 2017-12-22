import { Component, OnInit, Output,Input,EventEmitter } from '@angular/core';
import {GetChartService} from '../get-chart.service'
@Component({
  selector: 'app-chart-input',
  templateUrl: './chart-input.component.html',
  styleUrls: ['./chart-input.component.css']
})
export class ChartInputComponent implements OnInit {

  constructor(private  chartService: GetChartService) { }

  ngOnInit() {
   
  }
  chartValue:string;
  required = false;
  // required = true
  // !chartInput && required = true;

  hasError = false;
  error = 'Please add stock';
  
  // @Input() selectedFood:string
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  
  update(): void {
    // this.selectedFood = val;
    this.inputChange.emit(this.chartValue);
  }
  
}
