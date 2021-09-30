import { atom, selector } from "recoil";
import { Player, Positions } from "../types"; 
import { singleFixtureState } from "./Fixture";

export const myFormationState = atom({
    key: 'myFormationState',
    default: {
        FWD: 2,
        MID: 4,
        DEF: 4,
        GKP: 1
    }
});

export const myPlayersState = atom({
    key: 'myPlayersState',
    default: [] as Player[]
});

export const positions = ['FWD', 'MID', 'DEF', 'GKP'] as Positions[];

export const myPlayersByPosition = selector({
    key: 'myPlayersByPosition',
    get: ({ get }) => {
        const players = get(myPlayersState);
        const formation = get(myFormationState)

        const groupedPlayers: { [key: string]: Player[] }  = {};
        
        positions.forEach((position) => {
            groupedPlayers[position] = players.filter((p) => p.position === position)
        });

        positions.forEach((position) => {
            let nullPlayer: Player = {
                id: 0,
                name: 'null',
                short_name: "null",
                team: 0,
                price: 0,
                position: position,
                totalPoints: 0
            }

            for (let i = groupedPlayers[position].length; i < formation[position]; i ++) {
                groupedPlayers[position].push(nullPlayer)
            }
        });

        return groupedPlayers;
    }
});

export const numberOfPlayerByPlayerTeam = selector({
    key: 'numberOfPlayerByPlayerTeam',
    get: ({ get }) => {
        const fixture = get(singleFixtureState);
        const players = get(myPlayersState);

        const home_team = fixture?.home_team;
        const away_team = fixture?.away_team;
        
        return {
            home: players.filter((p) => p.team === home_team).length,
            away: players.filter((p) => p.team === away_team).length,
        }
    }
})

export const numberOfPlayer = selector({
    key: 'numberOfPlayer',
    get: ({ get }) => {
        return get(myPlayersState).length;
    }
})

export const totalValueOfTeam = selector({
    key: 'totalValueOfTeam',
    get: ({ get }) => {
        return get(myPlayersState).reduce((acc, player) => acc + player.price, 0)
    }
})