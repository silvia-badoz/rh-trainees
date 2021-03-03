import { Injectable } from '@angular/core';
import { CaseData } from 'src/app/interface/case-data';
import { JeuInfos } from 'src/app/interface/jeu-infos';
import { PlayersInfos } from 'src/app/interface/players-infos';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private gameSubject = new BehaviorSubject<JeuInfos>({ gagnant: "", fin: false,players:{ pseudo1: '',
  color1: '',
  pseudo2: '',
  color2: ''}});

  constructor() { }

  getGameDataObservable(): Observable<JeuInfos> {
    return this.gameSubject.asObservable();
  }

  /*getPlayers(){
    
  }*/ 
}
