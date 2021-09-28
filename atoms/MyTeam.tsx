import { atom, selector } from "recoil";
import { Player, Positions } from "../types"; 

export const myFormationState = atom({
    key: 'myFormationState',
    default: {
        FWD: 3,
        MID: 3,
        DEF: 4,
        GKP: 1
    }
});

export const myPlayersState = atom({
    key: 'myPlayersState',
    default: [] as Player[]
});

const positions = ['FWD', 'MID', 'DEF', 'GKP'] as Positions[];

export const myPlayersByPosition = selector({
    key: 'myPlayersByPosition',
    get: ({ get }) => {
        const players = get(myPlayersState);
        const formation = get(myFormationState)

        const groupedPlayers: { [key: string]: Player[] }  = {};

        positions.forEach((position) => {
            groupedPlayers[position] = players.filter((p) => p.position === position)

            for (let i = groupedPlayers[position].length; i < formation[position]; i ++) {
                groupedPlayers[position].push(null)
            }
        });

        return groupedPlayers;
    }
});

