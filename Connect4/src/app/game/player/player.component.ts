import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
/* export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}  */

export class PlayerComponent implements OnInit {
  /*playerForm = new FormGroup({
    pseudo: new FormControl(),
    color: new FormControl() 
  }); */ 
  playerForm: FormGroup; 

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.playerForm = this.fb.group({
       pseudo: '',
       color: ''
    });
  }

  submitForm() { 
   console.log(this.playerForm.value);  
  }

} 
