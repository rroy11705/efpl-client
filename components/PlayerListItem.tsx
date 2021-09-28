import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Player } from "../types"
import { myFormationState, myPlayersState } from '../atoms/MyTeam'

interface Props {
    player: Player;
}

const PlayerListItem = ({ player } : Props) => {

    const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState);
    const myFormation = useRecoilValue(myFormationState);

    const numberOfPlayerInPosition = myPlayers.filter(
        (p) => p.position === player.position
    ).length

    const addPlayerToMyTeam = () => {
        setMyPlayers((currentPlayer) => {
            if (myPlayers.some((p) => p.id === player.id)) {
                return currentPlayer.filter((p) => p.id !== player.id)
            }
            else {
                if (numberOfPlayerInPosition < myFormation[player.position]) {
                    return [...currentPlayer, player];
                } else {
                    return currentPlayer;
                }
            }
        });
    }

    const isPlayerSelected = myPlayers.some((p) => p.id === player.id);

    return (
        <Pressable 
            onPress={addPlayerToMyTeam}
            style={[
                styles.container,
                { backgroundColor: isPlayerSelected ? "#d170db" : "#ffffff"}
            ]}
        >
            {/* <Image style={styles.image} /> */}

            <View style={{ flexGrow: 1 }}>
                <Text style={styles.name}>{player.name}</Text>
                <Text>{player.team}</Text>
            </View>

            <View style={styles.colContainer}>
                <Text style={styles.name}>£{(player.price / 1000000).toFixed(1)}m</Text>
                <Text>{player.position}</Text>
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
        marginHorizontal: 15
    },
    image: {

    },
    name: {
        fontWeight: "bold"
    },
    points: {

    }
})

export default PlayerListItem
