import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
//import EventEmitter = require('events');
import { ColorCaseComponent } from '../color-case/color-case.component';

import { ColorSchemeService } from 'src/app/services/color-scheme-service.service';

import { PlayerService } from 'src/app/services/player.service';
import { CaseData } from 'src/app/interface/case-data';
import { JeuInfos } from 'src/app/interface/jeu-infos';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  //template: ' <h2>{{"Hello " + parentData }}</h2>',
  styleUrls: ['./grid.component.scss']
})


export class GridComponent implements OnInit {
  
  public infos: JeuInfos; 
  private gameSubject = new BehaviorSubject<JeuInfos>({ gagnant: "", fin: false,players:{ pseudo1: '',
  color1: '',
  pseudo2: '',
  color2: ''}});

  turn:boolean = true; //True = tour du player rouge
  status:boolean = false; 

  compteTest = 0; //placer 1 seul pion

  //test récup coordonnées 
  colonneP: number; 
  ligneP: number; 
  colorP: number;
  redP1: number; 

  //hide play button when col is full
  isButtonVisible1 = true; 
  isButtonVisible2 = true;
  isButtonVisible3 = true;
  isButtonVisible4 = true;
  isButtonVisible5 = true;
  isButtonVisible6 = true;
  isButtonVisible7 = true;


  public col = 7; 
  public row = 6; 
  redPawns: number = 21;
  yellowPawns:number = 21;  

  //service
  grille3: number[][]; 

  public case: CaseData; 
  

  //constructor(public boardservice: BoardService) { }
  constructor(public boardservice: BoardService, playerService: PlayerService, private colorSchemeService: ColorSchemeService) { 
    playerService.getGameDataObservable().subscribe(infos => this.infos = infos );
    this.colorSchemeService.load();
   // playerService.initializeBoard(this.row, this.col);
    this.pawn = 0;
  }

  public pawn: 0|1|2;

  ngOnInit():void {
    this.grille3 = this.boardservice.emptyGrid; //initialise la grille à 0 (white) dans chaque case depuis le service
    console.log("My board looks like this : " + this.grille3);
    console.table(this.grille3); 
  }

  //bouton play again à la fin d'une partie
  restart() {
    this.infos.fin = false;
    this.infos.gagnant = "";
    this.grille3 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0] 
    ];
    console.log("GRILLE RENOUVELÉE : " + this.grille3);
  }

//fonction qui vérifie si il y a un gagnant rouge en vertical (7 colonnes)
/* on entre dans cette fonction si le dernier pion rouge placé
 * est au minimum sur la 4ème ligne en partant du bas ou plus haut
 */
verticaleR() {
  if (this.ligneP <= 2) {
    if (this.grille3[this.ligneP][this.colonneP] === 1) { //always TRUE 
      this.ligneP++;
      if (this.grille3[this.ligneP][this.colonneP] === 1) {
        this.ligneP++;
        if (this.grille3[this.ligneP][this.colonneP] === 1) {
          this.ligneP++;
          if (this.grille3[this.ligneP][this.colonneP] === 1) {
             //4 pions alignés à la verticale
             this.infos.fin = true; 
             if (this.infos.players.color1 === "red") {
              this.infos.gagnant = this.infos.players.pseudo1;
             }
             else {
              this.infos.gagnant = this.infos.players.pseudo2;
             } 

             alert("GameOver by vertical !");            }
        }
      }
    }
  }
}

//fonction qui vérifie si il y a un gagnant jaune en vertical (7 colonnes)
/* on entre dans cette fonction si le dernier pion jaune placé
 * est au minimum sur la 4ème ligne en partant du bas ou plus haut
 */
verticaleJ() {
  if (this.ligneP <= 2) {
    if (this.grille3[this.ligneP][this.colonneP] === 2) { //always TRUE 
      this.ligneP++;
      if (this.grille3[this.ligneP][this.colonneP] === 2) {
        this.ligneP++;
        if (this.grille3[this.ligneP][this.colonneP] === 2) {
          this.ligneP++;
          if (this.grille3[this.ligneP][this.colonneP] === 2) {
             //4 pions alignés à la verticale
             this.infos.fin = true; 
             if (this.infos.players.color1 === "yellow") {
              this.infos.gagnant = this.infos.players.pseudo1;
             }
             else {
              this.infos.gagnant = this.infos.players.pseudo2;
             } 

             alert("GameOver by vertical !");
            }
        }
      }
    }
  }
}

//fonction qui vérifie si il y a un gagnant rouge à l'horizontal 
horizontaleR() {
  let count = 0;
  for (let j = 0 ; j <= this.col ; j++) {
    if (this.grille3[this.ligneP][j] === 1) {
      count++;
    }
    else count=0; 
    if (count >= 4) {
      alert("GameOver by horizontal !");
      this.infos.fin = true; 
      if (this.infos.players.color1 === "red") {
        this.infos.gagnant = this.infos.players.pseudo1;
       }
      else {
        this.infos.gagnant = this.infos.players.pseudo2;
      } 
    }
  }
}

//fonction qui vérifie si il y a un gagnant jaune à l'horizontal 
horizontaleJ() {
  let count = 0;
  for (let j = 0 ; j <= this.col ; j++) {
    if (this.grille3[this.ligneP][j] === 2) {
      count++;
    }
    else count=0; 
    if (count >= 4) {
      alert("GameOver by horizontal !");
      this.infos.fin = true; 
      if (this.infos.players.color1 === "yellow") {
        this.infos.gagnant = this.infos.players.pseudo1;
       }
      else {
        this.infos.gagnant = this.infos.players.pseudo2;
      } 
    }
  }
}

diagonaleR() {
  let align:number = 0;
  let debC: number = this.colonneP - 3; 
  let finC: number = this.colonneP + 3;
  let debL: number = this.ligneP + 3;
  let finL: number = this.ligneP - 3;

  while (debL >= this.grille3.length || debC < 0) {
    debL--;
    debC++;
  }
  while (finL < 0 || finC >= this.grille3[0].length) {
    finL++;
    finC--;
  }

  console.log("debC : " + debC + "finC : " + finC + "debL : " + debL + "finL : " + finL);

  while (debL >= finL && debC <= finC && align < 4) {
    if (this.grille3[debL][debC] == 1) {
      align++;
    }
    else {
      align = 0;
    }

    debC++;
    debL--; 
  }
  if (align >= 4) {
    alert("GameOver by RED DIAGONAL");
    this.infos.fin = true;
    if (this.infos.players.color1 === "red") {
      this.infos.gagnant = this.infos.players.pseudo1;
     }
    else {
      this.infos.gagnant = this.infos.players.pseudo2;
    }
  }














  /*for (let j = 3 ; j >= 0 ; j--) {
    for (let i = 0; i < this.row ; i++) {
      if (this.grille3[i][j] == 1) {
        align++;
        console.log("ALIGN = " + align);
        if (align >= 4) {
          alert(("GameOver by red diagonal on 3 3"));
        }
      }
    }
  }*/
  /*if (this.colonneP == 3 && this.ligneP <= 2) {
    if (this.grille3[this.ligneP][this.colonneP] == 1) {
      align++;
      console.log("ALIGN = " + align);
      console.log("PREMIÈRE BOUCLE");
      this.ligneP++;
      this.colonneP--; 
      if (this.grille3[this.ligneP][this.colonneP] == 1) {
        align++;
        console.log("ALIGN = " + align);
        this.ligneP++;
        this.colonneP--;
        if (this.grille3[this.ligneP][this.colonneP] == 1) {
          align++;
          console.log("ALIGN = " + align);
          this.ligneP++;
          this.colonneP--;
          if (this.grille3[this.ligneP][this.colonneP] == 1) {
            //4 pions alignés diagonale
            this.infos.fin = true; 
            if (this.infos.players.color1 === "red") {
              this.infos.gagnant = this.infos.players.pseudo1;
            }
            else {
              this.infos.gagnant = this.infos.players.pseudo2;
            }
            alert("GameOver RED DIAGONAL");
          }
        }
      }
    }
  }*/

}

drawR() { //finit le jeu quand tous les pions rouges ont été posés
  if (this.redPawns == 0) {
    this.infos.fin = true;
    alert("Game ended in a tie");
    this.infos.gagnant = "No one";
  }
}

drawY() { //finit le jeu quand tous les pions jaunes ont été posés
  if (this.yellowPawns == 0) {
    this.infos.fin = true;
    alert("Game ended in a tie");
    this.infos.gagnant = "No one";
  }
}

verifGagnantR() {
    this.verticaleR();
    this.horizontaleR();
    this.diagonaleR();
    this.drawR();
} 

verifGagnantJ() {
  this.verticaleJ();
  this.horizontaleJ();
  this.drawY();
}



//--------------------- FONCTIONS POUR PLACER LES PIONS DANS GRILLE3 -----------------------------------------
colonne1Rouge(this:GridComponent) { 
  for (let j = 0 ; ; ) { //colonne1
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
      }
      else {
        this.grille3[i][j] = 1; //1 vaut 1 pion rouge
        this.ligneP = i; 
        this.colonneP = j;
        this.redPawns--; //to determine if there is a draw
        this.verifGagnantR();
        
        //changer couleur case 
        //this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //
        this.compteTest = 1; //var prend 1 au lieu de 0  
        if (this.compteTest === 1) {
          break; //permet de ne placer qu'UN SEUL pion
        }   
      }
    } 
      //------------------- CHANGER COULEUR CASE -------------------
      //for (let j = 0 ; ;) {
       // for (let i = this.ligneP ; ;) {
         // this.pawn = 1;
          //console.log("EMPLACEMENENT I J = " + j + " ; " + i);
        //}
      //}
      //---------------------------------------------------------
     
    //Fait disparaître le bouton si la colonne est remplie 
    if (this.grille3[0][0] === 1 || this.grille3[0][0] === 2) {
      this.isButtonVisible1 = false; 
    }
    
    this.turn=!this.turn; //passer au tour des jaunes 
    break; //sinon boucle infinie 
  }
  console.log("1 PION ROUGE PLACÉ !");
  console.log("New board : " + this.grille3); 
  console.table(this.grille3); 
}

colonne1Jaune(this:GridComponent) {
  for (let j = 0 ; ; ) { //colonne1
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
        //console.log("JE SUIS DANS LE IF"); 
      }
      else {
        this.grille3[i][j] = 2; //2 vaut 1 pion jaune
        this.ligneP = i;
        this.colonneP = j;
        this.yellowPawns--;
        this.verifGagnantJ();
        //changer couleur case
        this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //

        this.compteTest = 1; //var prend 1 au lieu de 0  
        if (this.compteTest === 1) {
          break; //permet de ne placer qu'UN SEUL pion
        }     
      } 
    }
    //Fait disparaître le bouton si la colonne est remplie 
    if (this.grille3[0][0] === 1 || this.grille3[0][0] === 2) {
      this.isButtonVisible1 = false; 
    }
    //
    this.turn=!this.turn; //passer au tour des rouges 
    break; //sinon boucle infinie 
  }
  console.log("1 PION JAUNE PLACÉ !");
  console.log("New board : " + this.grille3);
  console.table(this.grille3);
}

colonne2Rouge(this:GridComponent) {
for (let j = 1 ; ; ) { 
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
        //console.log("JE SUIS DANS LE IF"); 
      }
      else {
        this.grille3[i][j] = 1;
        this.ligneP = i;
        this.colonneP = j; 
        this.redPawns--;
        this.verifGagnantR();
        //changer couleur case 
        //this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //
        this.compteTest = 1;   
        if (this.compteTest === 1) {
          break; 
        }     
      } 
    }
    //Fait disparaître le bouton si la colonne est remplie 
    if (this.grille3[0][1] === 1 || this.grille3[0][1] === 2) {
      this.isButtonVisible2 = false; 
    }
    
    this.turn=!this.turn;  
    break; 
  }
  console.log("1 PION ROUGE PLACÉ !");
  console.log("New board : " + this.grille3); 
  console.table(this.grille3);
}

colonne2Jaune(this:GridComponent) {
  for (let j = 1 ; ; ) { 
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
        //console.log("JE SUIS DANS LE IF"); 
      }
      else {
        this.grille3[i][j] = 2; 
        this.ligneP = i;
        this.colonneP = j;
        this.yellowPawns--;
        this.verifGagnantJ();
        
        //changer couleur case 
        this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //

        this.compteTest = 1; 
        if (this.compteTest === 1) {
          break; 
        }     
      } 
    }
    //Fait disparaître le bouton si la colonne est remplie 
    if (this.grille3[0][1] === 1 || this.grille3[0][1] === 2) {
      this.isButtonVisible2 = false; 
    }
    //
    this.turn=!this.turn; 
    break; 
  }
  console.log("1 PION JAUNE PLACÉ !");
  console.log("New board : " + this.grille3); 
  console.table(this.grille3);
}

colonne3Rouge(this:GridComponent) {
  for (let j = 2 ; ; ) { 
      for (let i = 5 ; i >=0 ; i--) { 
        if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
          //console.log("JE SUIS DANS LE IF"); 
        }
        else {
          this.grille3[i][j] = 1; 
          this.ligneP = i;
          this.colonneP = j;
          this.redPawns--;
          this.verifGagnantR();
          
          
          //changer couleur case 
          //this.status=!this.status; 
          //console.log("STATUS : " +this.status);
          //
          this.compteTest = 1;   
          if (this.compteTest === 1) {
            break; 
          }     
        } 
      }
      //Fait disparaître le bouton si la colonne est remplie 
      if (this.grille3[0][2] === 1 || this.grille3[0][2] === 2) {
        this.isButtonVisible3 = false; 
      }
      
      this.turn=!this.turn; 
      break; 
    }
    console.log("1 PION ROUGE PLACÉ !");
    console.log("New board : " + this.grille3); 
    console.table(this.grille3);
  }

colonne3Jaune(this:GridComponent) {
    for (let j = 2 ; ; ) { 
        for (let i = 5 ; i >=0 ; i--) { 
          if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
            //console.log("JE SUIS DANS LE IF"); 
          }
          else {
            this.grille3[i][j] = 2; 
            this.ligneP = i;
            this.colonneP = j;
            this.yellowPawns--;
            this.verifGagnantJ();
            
            //changer couleur case 
            this.status=!this.status; 
            //console.log("STATUS : " +this.status);
            //
    
            this.compteTest = 1;   
            if (this.compteTest === 1) {
              break; 
            }     
          } 
        }
        //Fait disparaître le bouton si la colonne est remplie 
        if (this.grille3[0][2] === 1 || this.grille3[0][2] === 2) {
          this.isButtonVisible3 = false; 
        }
        //
        this.turn=!this.turn; 
        break; 
      }
      console.log("1 PION JAUNE PLACÉ !");
      console.log("New board : " + this.grille3); 
      console.table(this.grille3);
}

colonne4Rouge(this:GridComponent) {
  for (let j = 3 ; ; ) { 
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
        //console.log("JE SUIS DANS LE IF"); 
      }
      else {
        this.grille3[i][j] = 1; 
        this.ligneP = i;
        this.colonneP = j;
        this.redPawns--;
        this.verifGagnantR();
       
        //changer couleur case 
        //this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //
        this.compteTest = 1;   
          if (this.compteTest === 1) {
            break; 
          }     
        } 
      }
      //Fait disparaître le bouton si la colonne est remplie 
      if (this.grille3[0][3] === 1 || this.grille3[0][3] === 2) {
        this.isButtonVisible4 = false; 
      }
      
      this.turn=!this.turn; 
      break; 
  }
  console.log("1 PION ROUGE PLACÉ !");
  console.log("New board : " + this.grille3); 
  console.table(this.grille3);
}

colonne4Jaune(this:GridComponent) {
        for (let j = 3 ; ; ) { 
            for (let i = 5 ; i >=0 ; i--) { 
              if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
                //console.log("JE SUIS DANS LE IF"); 
              }
              else {
                this.grille3[i][j] = 2; 
                this.ligneP = i;
                this.colonneP = j;
                this.yellowPawns--;
                this.verifGagnantJ();
               
                //changer couleur case 
                this.status=!this.status; 
                //console.log("STATUS : " +this.status);
                //
        
                this.compteTest = 1;   
                if (this.compteTest === 1) {
                  break; 
                }     
              } 
            }
            //Fait disparaître le bouton si la colonne est remplie 
            if (this.grille3[0][3] === 1 || this.grille3[0][3] === 2) {
              this.isButtonVisible4 = false; 
            }
            //
            this.turn=!this.turn; 
            break; 
          }
          console.log("1 PION JAUNE PLACÉ !");
          console.log("New board : " + this.grille3); 
          console.table(this.grille3);
}

colonne5Rouge(this:GridComponent) {
  for (let j = 4 ; ; ) { 
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
        //console.log("JE SUIS DANS LE IF"); 
      }
      else {
        this.grille3[i][j] = 1; 
        this.ligneP = i;
        this.colonneP = j;
        this.redPawns--;
        this.verifGagnantR();
        
        //changer couleur case 
        //this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //
        this.compteTest = 1;   
        if (this.compteTest === 1) {
          break; 
        }     
      } 
    }
    //Fait disparaître le bouton si la colonne est remplie 
    if (this.grille3[0][4] === 1 || this.grille3[0][4] === 2) {
      this.isButtonVisible5 = false; 
    }
    
    this.turn=!this.turn; 
    break; 
  }
  console.log("1 PION ROUGE PLACÉ !");
  console.log("New board : " + this.grille3); 
  console.table(this.grille3);
}

colonne5Jaune(this:GridComponent) {
            for (let j = 4 ; ; ) { 
                for (let i = 5 ; i >=0 ; i--) { 
                  if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
                    //console.log("JE SUIS DANS LE IF"); 
                  }
                  else {
                    this.grille3[i][j] = 2; 
                    this.ligneP = i;
                    this.colonneP = j;
                    this.yellowPawns--;
                    this.verifGagnantJ();
                  
                    //changer couleur case 
                    this.status=!this.status; 
                    //console.log("STATUS : " +this.status);
                    //
            
                    this.compteTest = 1;   
                    if (this.compteTest === 1) {
                      break; 
                    }     
                  } 
                }
                //Fait disparaître le bouton si la colonne est remplie 
                if (this.grille3[0][4] === 1 || this.grille3[0][4] === 2) {
                  this.isButtonVisible5 = false; 
                }
                //
                this.turn=!this.turn; 
                break; 
              }
              console.log("1 PION JAUNE PLACÉ !");
              console.log("New board : " + this.grille3); 
              console.table(this.grille3);
}

colonne6Rouge(this:GridComponent) {
  for (let j = 5 ; ; ) { 
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
        //console.log("JE SUIS DANS LE IF"); 
      }
      else {
        this.grille3[i][j] = 1; 
        this.ligneP = i;
        this.colonneP = j;
        this.redPawns--;
        this.verifGagnantR();
      
        //changer couleur case 
        //this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //

        this.compteTest = 1; 
        if (this.compteTest === 1) {
          break; 
        }     
      } 
    }
    //Fait disparaître le bouton si la colonne est remplie 
    if (this.grille3[0][5] === 1 || this.grille3[0][5] === 2) {
      this.isButtonVisible6 = false; 
    }
    
    this.turn=!this.turn; 
    break; 
  }
  console.log("1 PION ROUGE PLACÉ !");
  console.log("New board : " + this.grille3); 
  console.table(this.grille3);
}

colonne6Jaune(this:GridComponent) {
  for (let j = 5 ; ; ) { 
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
        //console.log("JE SUIS DANS LE IF"); 
      }
      else {
        this.grille3[i][j] = 2; 
        this.ligneP = i;
        this.colonneP = j;
        this.yellowPawns--;
        this.verifGagnantJ();
       
        //changer couleur case 
        this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //

        this.compteTest = 1; 
        if (this.compteTest === 1) {
          break; 
        }     
      } 
    }
    //Fait disparaître le bouton si la colonne est remplie 
    if (this.grille3[0][5] === 1 || this.grille3[0][5] === 2) {
      this.isButtonVisible6 = false; 
    }
    //
    this.turn=!this.turn; 
    break; 
  }
  console.log("1 PION JAUNE PLACÉ !");
  console.log("New board : " + this.grille3); 
  console.table(this.grille3);
}

colonne7Rouge(this:GridComponent) {
  for (let j = 6 ; ; ) { 
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
        //console.log("JE SUIS DANS LE IF"); 
      }
      else {
        this.grille3[i][j] = 1; 
        this.ligneP = i;
        this.colonneP = j;
        this.redPawns--;
        this.verifGagnantR();
        
        //changer couleur case 
        this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //

        this.compteTest = 1; 
        if (this.compteTest === 1) {
          break; 
        }     
      } 
    }
    //Fait disparaître le bouton si la colonne est remplie 
    if (this.grille3[0][6] === 1 || this.grille3[0][6] === 2) {
      this.isButtonVisible7 = false; 
    }
    
    this.turn=!this.turn; 
    break; 
  }
  console.log("1 PION ROUGE PLACÉ !");
  console.log("New board : " + this.grille3); 
  console.table(this.grille3);
}

colonne7Jaune(this:GridComponent) {
  for (let j = 6 ; ; ) { 
    for (let i = 5 ; i >=0 ; i--) { 
      if (this.grille3[i][j] === 1 || this.grille3[i][j] === 2) {
        //console.log("JE SUIS DANS LE IF"); 
      }
      else {
        this.grille3[i][j] = 2; 
        this.ligneP = i;
        this.colonneP = j;
        this.yellowPawns--;
        this.verifGagnantJ();
       
        //changer couleur case 
        this.status=!this.status; 
        //console.log("STATUS : " +this.status);
        //

        this.compteTest = 1; 
        if (this.compteTest === 1) {
          break; 
        }     
      } 
    }
    //Fait disparaître le bouton si la colonne est remplie 
    if (this.grille3[0][6] === 1 || this.grille3[0][6] === 2) {
      this.isButtonVisible7 = false; 
    }
    //
    this.turn=!this.turn; 
    break; 
  }
  console.log("1 PION JAUNE PLACÉ !");
  console.log("New board : " + this.grille3); 
  console.table(this.grille3);
}
//-----------------------------------------------------------------------

  //ngOnInit(): void {
    //console.log("TEST onInit ok");
    ////this.initializeTable()
    //this.grille3 = this.boardservice.emptyGrid; //initialise la grille depuis le service 
    //console.log("My board looks like this : " + this.grille3); 
    //console.log("OnInit variable TURN = " + this.turn);

    ////this.case.played = false; 
    ////this.couleur = "white"; 
    ////for (let i = 0 ; i < this.col ; i++) {
     //// this.case.played = false; 
    ////}
  ////this.gameState(); 
  //}
//---------------------- EN COURS ------------------------------------

  /*playAgain(grille3:number [][]) {
    //this.boardservice.playAgain();
    //this.grille3 = this.boardservice.emptyGrid;
    //console.table(this.grille3); 
    console.log("hey");
    this.grille3 = this.boardservice.emptyGrid;
    console.table("REMISE à 0 : " + this.grille3);
    //this.infos.fin = false;
    //this.infos.gagnant = "";
    //this.infos.players

    const inf = this.gameSubject.getValue();
    this.gameSubject.next({ gagnant: "", fin: false, players: inf.players });

  } */

  /*reset(this:GridComponent) {
    for (let i = 0 ; i < this.col ; i++) {
      for (let j = 0 ; j < this.row ; j++) {
        this.grille3[i][j] = 0; 
      }
    }
  } */



//------------------------------FIN EN COURS -----------------------------






//------------------------------------------------------------------

  //TEST POUR PLACER UN PION 
  ////////Jouer1R(this:GridComponent) {
   //////// console.log("J'ai appuyé sur 'Jouer1R'");
    //Pour changer l'état 0 1 2 
    //this.grille2[0] = this.red; 
    //console.log("New board is : " + this.grille2); 

    //Pour changer l'état visuel MARCHE !!! 
   //////// this.status1 = !this.status1;
   //////// this.turn = !this.turn;

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
   //////// console.log("MAJ variable TURN = " + this.turn);
 //////// }

 /* test(this:GridComponent) {
    console.log("1 pion placé");
    this.turn = !this.turn; 
    console.log("MAJ variable TURN = " + this.turn);
  } */

  /*test2(this:GridComponent) {
    console.log("TEST2");
    if (this.turn) {
      this.color = "red"; 
      this.turn = !this.turn;
    }
    else this.color = "yellow"; 
    this.turn = !this.turn;
  }

  test3(this:GridComponent) {
    console.log("TEST3");
    if (this.turn) {
      this.color = "red"; 
      this.turn = !this.turn;
    }
    else this.color = "yellow";
    this.turn = !this.turn; 
  }*/
//----------------------------------------------------------------

//Initialise board ligne 0 
  /*initializeTable(this:GridComponent) {
    for (let i = 0 ; i < this.col ; i++) {
      //this.grille2[i] = "0"; 
      this.grille2[i] = this.white;
    }
    console.log("My board looks like this : " + this.grille2);
  }*/

  //-----------------Test cliquer sur case----------------------
/*ngOnInit(): void {
  this.initializeTable();
  console.log("My grille looks like this : " + this.grille); 
}*/

/*initializeTable(this:GridComponent){
  for(let i=0;i<this.hauteur;i++){
    this.grille.push(new Array<String>(7))
    for(let j=0;j<this.taille;j++){
      this.grille[i][j] = "white";
    }
  }
} */

//Initialise board ligne 0 
 /* initializeTable(this:GridComponent) {
    for (let i = 0 ; i < 6 ; i++) {
      this.grille.push(new Array<String>(7))
      for (let j = 0 ; j < 7 ; j++) {
        this.grille[i][j] = 'white';
        
      }
    }
  }*/
//---------------------------------------------------
}