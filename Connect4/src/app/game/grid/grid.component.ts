import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { ColorCaseComponent } from '../color-case/color-case.component';
//Dark/light mode
import { ColorSchemeService } from 'src/app/services/color-scheme-service.service';

import { PlayerService } from 'src/app/services/player.service';
import { CaseData } from 'src/app/interface/case-data';
import { JeuInfos } from 'src/app/interface/jeu-infos';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})


export class GridComponent implements OnInit {
  
  public infos: JeuInfos; 
  private gameSubject = new BehaviorSubject<JeuInfos>({ gagnant: "", fin: false,players:{ pseudo1: '',
  color1: '',
  pseudo2: '',
  color2: ''}});

  turn:boolean = true; //True = tour du player rouge
  //status:boolean = false; 
  comptePlacement = 0; //placer 1 seul pion à la fois

  //test récup coordonnées 
  colonneP: number; 
  ligneP: number; 
  //colorP: number;
  //redP1: number; 

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
  

  constructor(public boardservice: BoardService, playerService: PlayerService, private colorSchemeService: ColorSchemeService) { 
    playerService.getGameDataObservable().subscribe(infos => this.infos = infos );
    this.colorSchemeService.load();
    this.pawn = 0;
  }

  public pawn: 0|1|2;

  ngOnInit():void {
    this.grille3 = this.boardservice.emptyGrid; //initialise la grille à 0 (white) dans chaque case depuis le service
    console.log("My board looks like this : " + this.grille3);
    console.table(this.grille3); 
  }

  /*bouton play again à la fin d'une partie
    * remet toutes les variables à leurs valeurs de début de partie
    */
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
    console.log("NOUVELLE PARTIE : " + this.grille3);
    this.redPawns = 21;
    this.yellowPawns = 21; 
    this.isButtonVisible1 = true;
    this.isButtonVisible2 = true;
    this.isButtonVisible3 = true;
    this.isButtonVisible4 = true;
    this.isButtonVisible5 = true;
    this.isButtonVisible6 = true;
    this.isButtonVisible7 = true;
  }

/*fonction qui vérifie si il y a un gagnant en vertical (7 colonnes)
 * on entre dans cette fonction si le dernier pion placé
 * est au minimum sur la 4ème ligne en partant du bas ou plus haut
 */
verticale(couleur: number) {
  let colonne = this.colonneP;
  let ligne = this.ligneP; 
  if (ligne <= 2) {
    if (this.grille3[ligne][colonne] === couleur) { 
      ligne++;
      if (this.grille3[ligne][colonne] === couleur) {
        ligne++;
        if (this.grille3[ligne][colonne] === couleur) {
          ligne++;
          if (this.grille3[ligne][colonne] === couleur) {
            //4 pions alignés à la verticale
            this.infos.fin = true; //partie gagnée
            //on attribue la couleur gagnante au pseudo correspondant
            let couleurJoueur: string = couleur === 1 ? "red" : "yellow";
            if (this.infos.players.color1 === couleurJoueur) {
             this.infos.gagnant = this.infos.players.pseudo1; 
            }
            else {
             this.infos.gagnant = this.infos.players.pseudo2;
            } 
            alert("GameOver by " + couleurJoueur + " vertical"); //informer de la fin de partie
          }
        }
      }
    }
  }
}

/*fonction qui vérifie si il y a un gagnant à l'horizontal 
 * une ligne est parcourue en entière
 * tant que les pions sont de même couleur on incrémente une variable count
 * si on trouve 2 pions de couleurs différentes différentes l'un à côté de l'autre,
 * count reprend une valeur nulle
 * fin de partie quand 4 pions de même couleur sont alignés 
 */
horizontale(couleur: number) {
  let count = 0;
  let ligne: number = this.ligneP; 
  for (let j = 0 ; j <= this.col ; j++) {
    if (this.grille3[ligne][j] === couleur) {
      count++;
    }
    else count=0; 
    if (count >= 4) {
      this.infos.fin = true; 
      //on attribue la couleur gagnante au pseudo correspondant
      let couleurJoueur: string = couleur === 1 ? "red" : "yellow";
      if (this.infos.players.color1 === couleurJoueur) {
        this.infos.gagnant = this.infos.players.pseudo1;
       }
      else {
        this.infos.gagnant = this.infos.players.pseudo2;
      } 
      alert("GameOver by " + couleurJoueur + " horizontal");
    }
  }
}

//diagonale '/'
diagonale(couleur: number) {
  let align:number = 0;
  let debC: number = this.colonneP - 3; 
  let finC: number = this.colonneP + 3;
  let debL: number = this.ligneP + 3;
  let finL: number = this.ligneP - 3;

  //on vérifie que la diagonale soit entièrement dans la grille
  while (debL >= this.grille3.length || debC < 0) {
    debL--;
    debC++;
  }
  while (finL < 0 || finC >= this.grille3[0].length) {
    finL++;
    finC--;
  }

  //console.log("debC : " + debC + "finC : " + finC + "debL : " + debL + "finL : " + finL);

  while (debL >= finL && debC <= finC && align < 4) {
    if (this.grille3[debL][debC] === couleur) {
      align++;
    }
    else {
      align = 0;
    }

    debC++;
    debL--; 
  }
  //4 pions alignés
  if (align >= 4) {
    this.infos.fin = true;
    let couleurJoueur: string = couleur === 1 ? "red" : "yellow";
    if (this.infos.players.color1 === couleurJoueur) {
      this.infos.gagnant = this.infos.players.pseudo1;
     }
    else {
      this.infos.gagnant = this.infos.players.pseudo2;
    }
    alert("GameOver by " + couleurJoueur + " diagonal");
  }
}

//diagonale '\'
diagonale2(couleur: number) {
  let align: number = 0;
  let debC : number = this.colonneP + 3;
  let finC : number = this.colonneP - 3;
  let debL : number = this.ligneP + 3;
  let finL : number = this.ligneP - 3;
  //on vérifie que la diagonale soit entièrement dans la grille
  while(debL>= this.grille3.length || debC >= this.grille3[0].length){
    debL--;
    debC--;
  }
  while(finL<0 || finC < 0){
    finL++;
    finC++;
  }
  //console.log("debC : " + debC + "finC : " + finC + "debL : " + debL + "finL : " + finL);
      
  while (debL >= finL && debC>=finC && align < 4) {
    if (this.grille3[debL][debC] === couleur) {
      align++;
    }
    else {
      align = 0;
    }
  
    debC--;
    debL--;
  
  }
  //4 pions alignés
  if (align >= 4) {
    this.infos.fin = true;
    let couleurJoueur: string = couleur === 1 ? "red" : "yellow";
    if (this.infos.players.color1 === couleurJoueur) {
      this.infos.gagnant = this.infos.players.pseudo1;
    }
    else {
      this.infos.gagnant = this.infos.players.pseudo2;
    }
    alert("GameOver by " + couleurJoueur + " diagonal");
  }
}

draw() { //finit le jeu quand tous les pions ont été posés
  if (this.redPawns == 0 || this.yellowPawns == 0) {
    this.infos.fin = true;
    alert("Game ended in a tie");
    this.infos.gagnant = "No one";
  }
}

verifGagnant(couleur: number) {
    this.verticale(couleur);
    this.horizontale(couleur);
    this.diagonale(couleur);
    this.diagonale2(couleur);
    this.draw();
} 


//--------------------- FONCTIONS POUR PLACER LES PIONS DANS GRILLE3 -----------------------------------------
colonne(this:GridComponent, couleur: number, colonne: number) {
  for (let i = 5 ; i >= 0 ; i--) {
    if (this.grille3[i][colonne] === 1 || this.grille3[i][colonne] === 2) {
    }
    else {
      this.grille3[i][colonne] = couleur;
      this.ligneP = i;
      this.colonneP = colonne;
      if (couleur === 1) {
        this.redPawns--; //nombre de pions rouges - 1 (permet de savoir si match nul)
      }
      else {
        this.yellowPawns--; //nombre de pions jaunes - 1 (permet de savoir si match nul)
      }
      this.verifGagnant(couleur); //arrête la partie si gagnant

      this.comptePlacement = 1;
      if (this.comptePlacement === 1) {
        break; //permet de ne placer qu'un seul pion et de sortir de la fonction
      }
    }
  }
  
  //Rend inactif le bouton si la colonne est remplie 
  if (this.grille3[0][0] === 1 || this.grille3[0][0] === 2) {
    this.isButtonVisible1 = false;
  }
  if (this.grille3[0][1] === 1 || this.grille3[0][1] === 2) {
    this.isButtonVisible2 = false;
  }
  if (this.grille3[0][2] === 1 || this.grille3[0][2] === 2) {
    this.isButtonVisible3 = false;
  }
  if (this.grille3[0][3] === 1 || this.grille3[0][3] === 2) {
    this.isButtonVisible4 = false;
  }
  if (this.grille3[0][4] === 1 || this.grille3[0][4] === 2) {
    this.isButtonVisible5 = false;
  }
  if (this.grille3[0][5] === 1 || this.grille3[0][5] === 2) {
    this.isButtonVisible6 = false;
  }
  if (this.grille3[0][6] === 1 || this.grille3[0][6] === 2) {
    this.isButtonVisible7 = false;
  }

  this.turn = !this.turn; // passer au tour du joueur rouge/jaune

  console.log("1 PION PLACÉ :"); 
  console.log("New board : " + this.grille3);
  console.table(this.grille3); 
  
}

}
