import React, { forwardRef, MutableRefObject, useRef } from 'react';
import { StyleSheet, ImageBackground, Text, View, Pressable } from 'react-native';

import FieldPlayer from './FieldPlayer';

import { useRecoilValue } from 'recoil';
import { myPlayersByPosition } from '../atoms/MyTeam';

const Field = () => {

    const players = useRecoilValue(myPlayersByPosition);

    return (
        <ImageBackground
            source={require("../assets/images/field.jpg")}
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
        aspectRatio: 12 / 16,
        alignItems: "center",
        justifyContent: "space-around"
    },
    playerRowView: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%"
    }
})

export default Field;