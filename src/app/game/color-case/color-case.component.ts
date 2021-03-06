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
  }

  @Input() data : CaseData;

  
  ngOnInit(): void {
    console.log("turnP initial = " + this.turnP);
  }

  poserPion(){
    //this.playerservice.placerPion(this.data);
  }
  // ----------------- test -----------------

}
