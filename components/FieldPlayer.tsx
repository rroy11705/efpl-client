import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Player } from "../types";
import { jersey } from "../assets/data/jersey";

type FieldPlayerProps = {
    player: Player;
    position: string;
}

const FieldPlayer = (props: FieldPlayerProps) => {

    const { player, position } = props;
    let team_id : string = player.team.toString()

    return (
        <View
            style={[styles.playerSingle, {
                opacity: player.team? 1 : 0.9
            }]}
        >
            <Image style={styles.jerseyImage} source={jersey[team_id]} />
            <Text
                numberOfLines={1}
                style={styles.playerSingleText}
            >{player.id ? player.short_name : position}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    playerSingle: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    jerseyImage: {
        transform: [{translateY: 5}, {scaleX: 0.75}, {scaleY: 0.75}]
    },
    playerSingleText: {
        backgroundColor: "#333333bb",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 14,
        padding: 2,
        paddingHorizontal: 7,
        maxWidth: 80
    }
})

export default FieldPlayer;