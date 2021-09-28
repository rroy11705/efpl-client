import { atom, selector } from "recoil";
import { players } from "../assets/data/players";

const pos2pos: {[key:number] : string} = {
    1: "GKP",
    2: "DEF",
    3: "MID",
    4: "FWD"
}

export const allPlayerState = selector({
    key: 'allPlayerState',
    get: async () => {
        try {
            const response = await fetch(
                'https://enosis-fantacy-auction.herokuapp.com/elements/get_elements?team=11'
            );
            const json = await response.json();
            console.log(json)
            return json.payload.map((entry) => ({
                id: entry._id,
                name: entry.web_name,
                team: entry.team,
                price: entry.now_cost,
                position: pos2pos[entry.element_type],
                totalPoints: entry.total_points
            }));
        } catch (error) {
            console.error(error);
            return players;
        }
    }
});

export const positionFilterState = atom({
    key: 'positionFilterState',
    default: ['GKP'] as string[]
})

export const filteredPlayers = selector({
    key: 'filteredPlayers',
    get: ({ get }) => {
        const players = get(allPlayerState);
        const filters = get(positionFilterState);
        return players.filter( (player) => filters.length === 0 || filters.includes(player.position));
    },
});