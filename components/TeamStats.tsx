import React, { Suspense, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'

import { numberOfPlayer, numberOfPlayerByPlayerTeam, totalValueOfTeam } from '../atoms/MyTeam'
import { allTeamsState } from '../atoms/Players'

import { team_logo } from "../assets/data/team_logo"
import { Fixture, Team } from '../types'
import { singleFixtureState } from '../atoms/Fixture'


const TeamStats = () => {

    const myTeamPlayerCount = useRecoilValue(numberOfPlayer);
    const myTeamPlayerByPlayerTeamCount = useRecoilValue(numberOfPlayerByPlayerTeam);
    const myValueOfTeam = useRecoilValue(totalValueOfTeam);
    const fixture = useRecoilValue(singleFixtureState);
    const allTeam = useRecoilValue(allTeamsState);
    
    var home_team_name = allTeam.find((t : Team) => { return t.id === fixture?.home_team}).short_name;
    var away_team_name = allTeam.find((t : Team) => { return t.id === fixture?.away_team}).short_name;

    return (
        <View style={styles.container}>
            <View style={styles.valueContainer}>
                <Text style={styles.label}>Players</Text>
                <Text style={styles.value}>{myTeamPlayerCount} / 11</Text>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.label}>Remaining</Text>
                <Text style={styles.value}>£{(1000 - myValueOfTeam) / 10}m</Text>
            </View>
            <View style={styles.fixtureContainer}>
                <View>
                    <Image source={team_logo[fixture?.home_team]} />
                    <Text style={styles.fixtureValue}>{home_team_name} {myTeamPlayerByPlayerTeamCount?.home}</Text>
                </View>
                <Text style={styles.fixtureVeses}>V</Text>
                <View>
                    <Image source={team_logo[fixture?.away_team]} />
                    <Text style={styles.fixtureValue}>{away_team_name} {myTeamPlayerByPlayerTeamCount?.away}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        width: "90%",
        borderWidth: 4,
        borderColor: "#38abd1",
        borderRadius: 10,
        flexDirection: "row",
        padding: 10,
        marginVertical: 10
    },
    valueContainer: {
        marginRight: 20
    },
    label: {
        color: "#333333"
    },
    value: {
        fontSize: 20,
        fontWeight: "bold"
    },
    fixtureContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        width: "50%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    fixtureVeses: {
        fontSize: 24,
        fontWeight: "bold"
    },
    logoContainer: {
        flexDirection: "row",
    },
    fixtureValue: {
        fontSize: 16,
        textAlign: "center"
    }
});

export default TeamStats
