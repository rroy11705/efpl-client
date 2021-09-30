import { atom, selector } from "recoil";

export const singleFixtureState = selector({
    key: 'singleFixtureState',
    get: async () => {
        try {
            const response = await fetch(
                'https://enosis-fantacy-auction.herokuapp.com/fixtures/get_fixtures?matchday=7&team=11'
            );
            const json = await response.json();
            const entry = json.payload[0]
            return {
                id: entry._id,
                finished: entry.finished,
                kickoff_time: entry.kickoff_time,
                matchday: entry.matchday,
                minutes: entry.minutes,
                started: entry.started,
                stats: entry.stats,
                away_team: entry.team_a,
                away_team_score: entry.away_team_score,
                home_team: entry.team_h,
                home_team_score: entry.home_team_score
            }
        } catch (error) {
            console.error(error);
        }
    }
});