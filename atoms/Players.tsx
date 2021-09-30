import { atom, selector } from "recoil";

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
                'https://enosis-fantacy-auction.herokuapp.com/elements/get_elements?teams=11,12'
            );
            const json = await response.json();
            return json.payload.map((entry: {[key: string]: any}) => ({
                id: entry._id,
                name: entry.first_name[0] +  ". " + entry.second_name.split(" ").pop(),
                short_name: entry.web_name,
                team: entry.team,
                price: entry.now_cost,
                position: pos2pos[entry.element_type],
                totalPoints: entry.total_points
            }));
        } catch (error) {
            console.error(error);
        }
    }
});

export const positionFilterState = atom({
    key: 'positionFilterState',
    default: ['GKP'] as string[]
})

export const playerSortState = atom({
    key: 'playerSortState',
    default: { totalPoints : "desc", price: "null" } as {[key:string] : string}
})

export const filteredPlayers = selector({
    key: 'filteredPlayers',
    get: ({ get }) => {
        const players = get(allPlayerState);
        const filters = get(positionFilterState);
        const sorter = get(playerSortState)
        
        let result =  players.filter( (player: {[key: string]: any}) => filters.length === 0 || filters.includes(player.position));
        
        if (sorter.totalPoints === "desc") {
            result = result.sort( (p1: {[key: string]: any}, p2: {[key: string]: any}) => p2.totalPoints - p1.totalPoints)
        }
        else if (sorter.totalPoints === "asc") {
            result = result.sort( (p1: {[key: string]: any}, p2: {[key: string]: any}) => p1.totalPoints - p2.totalPoints)
        }

        if (sorter.price === "desc") {
            result = result.sort( (p1: {[key: string]: any}, p2: {[key: string]: any}) => p2.price - p1.price)
        }
        else if (sorter.price === "asc") {
            result = result.sort( (p1: {[key: string]: any}, p2: {[key: string]: any}) => p1.price - p2.price)
        }
        return result
    },
});

export const allTeamsState = selector({
    key: 'allTeamsState',
    get: async () => {
        try {
            const response = await fetch(
                'https://enosis-fantacy-auction.herokuapp.com/teams/all'
            );
            const json = await response.json();
            return json.payload.map((entry: {[key: string]: any}) => ({
                id: entry._id,
                name: entry.name,
                short_name: entry.short_name,
                strength: entry.strength,
            }));
        } catch (error) {
            console.error(error);
        }
    }
});