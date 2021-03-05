import { Injectable } from '@angular/core';
import { CaseData } from 'src/app/interface/case-data';
import { JeuInfos } from 'src/app/interface/jeu-infos';
import { PlayersInfos } from 'src/app/interface/players-infos';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  grille3: CaseData[][] = [];

  private gameSubject = new BehaviorSubject<JeuInfos>({ gagnant: "", fin: false,players:{ pseudo1: '',
  color1: '',
  pseudo2: '',
  color2: ''}});

  constructor() { }

  getGameDataObservable(): Observable<JeuInfos> {
    return this.gameSubject.asObservable();
  }

  initializeBoard(row: number, col:number) {
    for (let i = 0 ; i < row ; i++) {
      this.grille3[i] = [];
      for (let j = 0 ; j < col ; j++) {
        this.grille3[i][j] = { colonne: j, couleur: 0}; 
      }
    }
    //
    /*for (let i = 0; i < hauteur; i++) {
      this.grille[i] = [];
      for (let j = 0; j < taille; j++) {
        this.grille[i][j] = { colonne: j, couleur: "white" };

      }

    }*/
  }

  placerPion(data: CaseData) {
    //this.grille4[i][j].couleur = 1; 
  }



  /*getPlayers(){
    
  }*/ 
}
