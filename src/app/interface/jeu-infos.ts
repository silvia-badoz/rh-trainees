import { PlayersInfos } from "./players-infos";

export interface JeuInfos {
    gagnant: string; 
    fin: boolean; 
    players: PlayersInfos; 
}
