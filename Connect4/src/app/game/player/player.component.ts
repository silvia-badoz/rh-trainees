import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

//MatDialog
import { MatDialog } from '@angular/material/dialog'; 
import { ErrComponent } from '../err/err.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  public playerForm: FormGroup; 

  //MatDialog
  constructor(private fb : FormBuilder, public dialog: MatDialog, private router : Router) { }

  ngOnInit() { 
    this.initializeForm();
  }

  //ReactiveForm 
  initializeForm(): void { 
    this.playerForm = this.fb.group({
       pseudo1: '',
       color1: '',
       pseudo2: '',
       color2: ''
    });
  }

  submitForm() { 
   console.log(this.playerForm.value);  
  }

  //MatDialog 
  openDialog() {
    this.dialog.open(ErrComponent);
    this.router.navigate(['/player']);
  } 

  //test
  goToGame() {
    this.router.navigate(['/grid']);
  }

} 
