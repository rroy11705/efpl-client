import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React from 'react';
import PlayerListItem from './PlayerListItem';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useRecoilState, useRecoilValue } from 'recoil';
import { filteredPlayers, playerSortState } from '../atoms/Players';

const PlayerList = () => {

    const player = useRecoilValue(filteredPlayers);
    const [playerSort, setPlayerSort] = useRecoilState(playerSortState);

    const switchPriceSorter = () => {
        setPlayerSort((currentState) => {
            let state = {}
            if (currentState.price === "desc") {
                state = {
                    price: "asc"
                }
            }
            else {
                state = {
                    price: "desc"
                }
            }
            return state
        });
    }

    const switchPointSorter = () => {
        setPlayerSort((currentState) => {
            let state = {}
            if (currentState.totalPoints === "desc") {
                state = {
                    totalPoints: "asc",
                }
            }
            else {
                state = {
                    totalPoints: "desc",
                }
            }
            return state
        });
    }

    return (
        <>
            <View style={styles.container}>
                <View style={[styles.colContainer, { flexGrow: 1 }]}>
                    <Text style={styles.name}>Player Name</Text>
                </View>
                <Pressable 
                    onPress={switchPriceSorter}
                    style={styles.colContainer}>
                    <Text style={styles.name}>Price</Text>
                    {playerSort.price === "desc" ?
                        <AntDesign name="arrowdown" size={24} color="black" />
                        :
                        playerSort.price === "asc" ?
                            <AntDesign name="arrowup" size={24} color="black" />
                            :
                            <></>
                    }
                </Pressable>
                <Pressable
                    onPress={switchPointSorter} 
                    style={styles.colContainer}>
                    <Text style={styles.name}>Points</Text>
                    {playerSort.totalPoints === "desc" ?
                        <AntDesign name="arrowdown" size={24} color="black" />
                        :
                        playerSort.totalPoints === "asc" ?
                            <AntDesign name="arrowup" size={24} color="black" />
                            :
                            <></>
                    }
                </Pressable>
            </View>
            <BottomSheetFlatList
                data={player}
                renderItem={({ item }) => 
                    <PlayerListItem player={item} />
                }
            />
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 5,
        alignItems: "flex-start",
        borderBottomWidth: 3,
        borderBottomColor: "#eeeeee"
    },
    colContainer: {
        flexDirection: "row",
        marginHorizontal: 10,
        paddingHorizontal: 5
    },
    name: {
        fontWeight: "bold",
        fontSize: 16
    }
})



export default PlayerList
