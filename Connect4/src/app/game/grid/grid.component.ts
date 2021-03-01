import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { CaseData } from 'src/app/interface/case-data';
//import EventEmitter = require('events');

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  //template: ' <h2>{{"Hello " + parentData }}</h2>',
  styleUrls: ['./grid.component.scss']
})


export class GridComponent implements OnInit {

  status1: boolean = true; //colonne 1 --> rouge
  status1B: boolean = true; //colonne1 --> jaune 

  status2: boolean = true; 

  turn:boolean = true; //True = tour du player rouge


  //public grille: number[];
  //public grille = []; 
  //counter:number = 4;
  col:number = 7; 
  row:number = 6; 
  redPawns: number = 21;
  yellowPawns:number = 21;  
  winner:boolean = false;
  white = "0"; 
  red = "1";

  //grille2 : string[] = [];

  //service
  grille3: number[][]; 
 //grille3: [][]; 

  //couleur: string;
  public case: CaseData; 
  filter: string; 
  

  /*const WHITE = 0; 
  const RED = 1; 
  const YELLOW = 2;*/

  constructor(public boardservice: BoardService) { }

  ngOnInit(): void {
    console.log("TEST onInit ok");
    //this.initializeTable()
    this.grille3 = this.boardservice.emptyGrid; //initialise la grille depuis le service 
    //console.log("My board looks like this : " + this.grille3); 

    console.log("OnInit variable TURN = " + this.turn);

    //this.case.played = false; 

    //this.couleur = "white"; 
    /*for (let i = 0 ; i < this.col ; i++) {
      this.case.played = false; 
    }*/
  
    //this.gameState(); 
  }

  get played(): boolean {
    return this.case.played; 
  }
  get color(): boolean {
    return this.case.color;
    
}
 
  //TEST POUR PLACER UN PION 
  Jouer1R(this:GridComponent) {
    console.log("J'ai appuyé sur 'Jouer1R'");
    //Pour changer l'état 0 1 2 
    //this.grille2[0] = this.red; 
    //console.log("New board is : " + this.grille2); 

    //Pour changer l'état visuel MARCHE !!! 
    this.status1 = !this.status1;
    this.turn = !this.turn;

   /* if (this.turn) {
      console.log("Tour des rouges");
      this.status1 != this.status1; 
      this.turn = !this.turn;
    }
    else {
      console.log("Tour des jaunes");
      this.status1B != this.status1B; 
      this.turn = !this.turn;
    }*/
    console.log("MAJ variable TURN = " + this.turn);
  }

  Jouer1Y(this:GridComponent) {
    console.log("J'ai appuyé sur 'Jouer1Y'");
    this.status1B = !this.status1B; 
    this.turn = !this.turn; 
    console.log("MAJ variable TURN = " + this.turn); 
  }
  

  Jouer2(this:GridComponent) {
    console.log("J'ai appuyé sur 'Jouer2");
    this.status2 = !this.status2;
    this.turn = !this.turn; 

    //this.status1 = this.status1; 

  }


  //Test changer class
  /*clickEvent(){
    this.status = !this.status;       
  }*/

}

/*game() {
  if (this.case.played == false) {

  }
} */




//Initialise board ligne 0 
  /*initializeTable(this:GridComponent) {
    for (let i = 0 ; i < this.col ; i++) {
      //this.grille2[i] = "0"; 
      this.grille2[i] = this.white;
    }
    console.log("My board looks like this : " + this.grille2);
  }*/



  /*filterState(this:GridComponent) {
      if (this.filter === 'all') {
      return !(this.case.played); 
      }
  else if (this.filter === 'active') {
      return this.todoList.items.filter(item => !item.isDone);
  }
  else if (this.filter === 'completed') {
      return this.todoList.items.filter(item => item.isDone);
      } 
  } */



  /*
  fireEvent() {
    this.childEvent.emit('Hey Codevolution');
  }
  */
