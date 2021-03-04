import { Injectable } from '@angular/core';

import { CaseData } from 'src/app/interface/case-data';
import { JeuInfos } from 'src/app/interface/jeu-infos';
import { PlayersInfos } from 'src/app/interface/players-infos';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  //initialise le plateau de jeu avec des cases blanches 
  emptyGrid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0] 
  ]; 

  private gameSubject = new BehaviorSubject<JeuInfos>({ gagnant: "", fin: false,players:{ pseudo1: '',
  color1: '',
  pseudo2: '',
  color2: ''}});

  grille3: CaseData[][] = [];

  constructor() { }

  getGameDataObservable(): Observable<JeuInfos> {
    return this.gameSubject.asObservable();
  }

  initializeBoard(row:number, col:number) {
    for (let i = 0 ; i < row ; i++) {
      this.grille3[i] = [];
      for (let j = 0 ; j < col ; j++) {
        this.grille3[i][j] = { colonne: j, couleur: 0}; 
      }
    }
  }

  //test pour playAgain button
  playAgain() {
    const inf = this.gameSubject.getValue(); 
    console.log("I'm in button play again");
    console.log("gameSubject.getValue() = " + this.gameSubject.getValue());
    //this.gameSubject.next({ gagnant: "", fin: false, inf.players });
    //this.grille3 = this.emptyGrid; 
    //console.table(this.grille3);
  
  }
}
