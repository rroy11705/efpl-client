import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

type FieldPlayerProps = {
    player: null;
    position: string;
}

const FieldPlayer = (props: FieldPlayerProps) => {

    const { player, position } = props;

    return (
        <View
            style={styles.playerSingle}>
            <FontAwesome5 name="tshirt" size={32} color={player ? "#d170db" : "#5c5c5cbb"} />
            <Text
                style={styles.playerSingleText}
            >{player ? player.name : position}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    playerSingle: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    playerSingleText: {
        backgroundColor: "#333333bb",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 12,
        padding: 2,
        paddingHorizontal: 7
    }
})

export default FieldPlayer;