import { Component, Input, OnInit } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { PlayerService } from 'src/app/services/player.service';
import { CaseData } from '../../interface/case-data'; 

@Component({
  selector: 'app-color-case',
  templateUrl: './color-case.component.html',
  styleUrls: ['./color-case.component.scss']
})
export class ColorCaseComponent implements OnInit {

  //------------------ test ------------------
turnP:boolean = true; //true = tour du joueur rouge 


  //------------------------------------
  constructor(private playerservice: PlayerService) { 
    //this.color = "white"; //essayer avec 0 ?? 
    this.pawn = 0;
  }

  @Input() data : CaseData;

  public pawn: 0|1|2;
  //public color: "white"|"red"|"yellow"; 

  ngOnInit(): void {
    console.log("turnP initial = " + this.turnP);
  }

  poserPion(){
    this.playerservice.placerPion(this.data);
  }
  // ----------------- test -----------------
  /*poserPions(){
    if (this.turnP) {
      this.color = "red";
      console.log("1 pion ROUGE placé");
      this.turnP = !this.turnP;  
    }
    else {
      this.color = "yellow";
      console.log("1 pion JAUNE placé");
      this.turnP = !this.turnP;  
    }
  }*/
  //------------------------------------

  
  /*poserPionRouge() {
    this.color = "red"; 
    console.log("1 pion ROUGE a été posé.");
    this.turnP = false;
    console.log("nouveau TurnP false = " + this.turnP);
  } 

  poserPionJaune() {
    this.color = "yellow"; 
    console.log("1 pion JAUNE a été posé.");
    this.turnP = true;
    console.log("nouveau TurnP true = " + this.turnP);
  }

  poserPion() {
    if (this.turnP == true) {
      //this.color = "red";
      this.poserPionRouge(); 
      console.log("1 pion rouge a dû apparaître !!");  
    } 
    else  if (this.turnP == false) {
      console.log("FALSE = JAUNE POSÉ");
      //this.turnP = !this.turnP;
      //this.color = "yellow"; 
     // this.poserPionJaune();  
      //console.log("1 pion jaune a dû apparaître !!");
    }
      console.log("Nouveau TurnP : " + this.turnP);
    }

   // this.turnP = !this.turnP; 
   
  
*/
}
