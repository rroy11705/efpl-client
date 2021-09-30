import React from 'react'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Player, Team } from "../types"
import { myFormationState, myPlayersState } from '../atoms/MyTeam'
import { allTeamsState } from '../atoms/Players'
import { jersey } from "../assets/data/jersey"
import { singleFixtureState } from '../atoms/Fixture'

interface Props {
    player: Player;
}

const PlayerListItem = ({ player } : Props) => {

    const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState);
    const myFormation = useRecoilValue(myFormationState);
    const playerTeam = useRecoilValue(allTeamsState);
    const fixture = useRecoilValue(singleFixtureState);

    const numberOfPlayerInPosition = myPlayers.filter(
        (p) => p.position === player.position
    ).length

    const numberOfPlayerFromPlayerTeam = myPlayers.filter(
        (p) => p.team === player.team
    ).length

    const addPlayerToMyTeam = () => {
        setMyPlayers((currentPlayers) => {
            if (myPlayers.some((p) => p.id === player.id)) {
                return currentPlayers.filter((p) => p.id !== player.id)
            }
            else {
                
                if (myPlayers.length >= 11) {
                    return currentPlayers;
                }
                else {
                    if (numberOfPlayerFromPlayerTeam >= 7) {
                        return currentPlayers;
                    }
                    if (numberOfPlayerInPosition >= myFormation[player.position]) {
                        return currentPlayers;
                    }
                    return [...currentPlayers, player];
                }
            }
        });
    }

    const isPlayerSelected = myPlayers.some((p) => p.id === player.id);
    const playerTeamName = playerTeam.find((t : Team) => t.id === player.team).short_name;
    let team_id : string = player.team.toString()
    

    return (
        <Pressable 
            onPress={addPlayerToMyTeam}
            style={[
                styles.container,
                { 
                    backgroundColor: isPlayerSelected ? "#d170db" : 
                                    numberOfPlayerFromPlayerTeam < 7 ? "#ffffff" : "#aaaaaa",
                    opacity: isPlayerSelected ? 1 : numberOfPlayerFromPlayerTeam < 7 ? 1 : 0.5
                }
            ]}
        >
            <Image 
                style={styles.image}
                source={jersey[team_id]}
            />

            <View style={[styles.colContainer, { flexGrow: 1 }]}>
                <Text 
                    numberOfLines={1}
                    style={styles.name}>{player.name}</Text>
                <Text>{playerTeamName}</Text>
            </View>

            <View style={styles.colContainer}>
                <Text style={styles.stats}>£{(player.price / 10).toFixed(1)}m</Text>
            </View>
            <View style={styles.colContainer}>
                <Text style={styles.points}>{player.totalPoints}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 5,
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee"
    },
    colContainer: {
        marginHorizontal: 15,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    image: {
        width: 40,
        height: 55
    },
    name: {
        fontWeight: "bold",
        fontSize: 14,
        width: 100
    },
    stats: {
        fontWeight: "bold",
        fontSize: 16
    },
    points: {

    }
})

export default PlayerListItem
