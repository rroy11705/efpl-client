import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import { useRecoilState } from 'recoil'
import { positionFilterState } from '../atoms/Players'

const positions = ['GKP', 'DEF', 'MID', 'FWD']

const Filters = () => {

    const [positionFilter, setPositionFilter] = useRecoilState(positionFilterState)

    const onFilterPress = (position: string) => {
        setPositionFilter((currPositionFilter) => [position])
    }

    const isSelected = (position: string) => {
        return positionFilter.includes(position);
    }
    
    return (
        <View style={styles.container}>
            {positions.map( (position) => (
                <Pressable
                key={position}
                onPress={() => onFilterPress(position)}
                    style={
                        [styles.textContainer, 
                            {backgroundColor: isSelected(position) ? "purple" : "#dddddd"}
                        ]}
                >
                    <Text style={[styles.text, { color: isSelected(position) ? "#ffffff" : "#333333" }]}>{position}</Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        padding: 10
    },
    textContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {

    }
});

export default Filters
