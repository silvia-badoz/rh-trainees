import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import EventEmitter = require('events');

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  //template: ' <h2>{{"Hello " + parentData }}</h2>',
  
  
  
    

  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  //
  @Input('parentData') public name:string; 
  @Output() public childEvent = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
    console.log("parentData vaut " + this.name);
  }

  /*
  fireEvent() {
    this.childEvent.emit('Hey Codevolution');
  }
  */

}
