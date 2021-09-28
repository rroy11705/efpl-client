import * as React from 'react';
import { StyleSheet, ImageBackground, Text, View } from 'react-native';

import FieldPlayer from './FieldPlayer';

import field from "../assets/images/field.jpg"
import { useRecoilValue } from 'recoil';
import { myPlayersByPosition } from '../atoms/MyTeam';

// const players: { [key: string]: null[] } = {
//     FWD: [null, null, null],
//     MID: [null, null, null],
//     DEF: [null, null, null, null],
//     GKP: [null]
// };

const Field = () => {

    const players = useRecoilValue(myPlayersByPosition);

    return (
        <ImageBackground
            source={field}
            resizeMethod="resize"
            style={styles.fieldImage}
        >

            {Object.keys(players).map((position) =>
            (
                <View
                    key = {position}
                    style={styles.playerRowView}
                >
                    {players[position].map((player, i) => (
                        <FieldPlayer
                          key={i}
                          player={player} 
                          position={position} 
                        />
                    ))}
                </View>
            )
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    fieldImage: {
        width: "100%",
        aspectRatio: 2 / 3,
        alignItems: "center",
        justifyContent: "space-around"
    },
    playerRowView: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    }
})

export default Field;