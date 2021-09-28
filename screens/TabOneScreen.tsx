import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Pressable, View, Text } from 'react-native';

import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"

import TeamStats from '../components/TeamStats';
import Field from '../components/Field';
import PlayerList from '../components/PlayerList';
import Filters from '../components/Filters';


export default function TabOneScreen() {

  const playerListBottomSheet = useRef<BottomSheet>(null);
  const filterPlayerListBottomSheet = useRef<BottomSheet>(null);

  const viewPlayers = () => {
    playerListBottomSheet.current?.expand();
  }

  const snapPoints = [0, "80%"];

  return (
    <SafeAreaView style={styles.container}>
      <TeamStats />
      <Field />
      <Pressable 
        onPress={viewPlayers}
        style={styles.ViewPlayerButton}  
      >
        <Text>View Player</Text>
      </Pressable>

      <BottomSheet
        ref={playerListBottomSheet}
        index={0}
        snapPoints={snapPoints}
      >
        <PlayerList />
      </BottomSheet>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    alignItems: 'center',
    backgroundColor: "#4ccf4d"
  },
  ViewPlayerButton: {
    backgroundColor: "#ffa64d",
    width: "90%",
    margin: 20,
    marginTop: "auto",
    padding: 10,
    alignItems: "center",
    borderRadius: 50
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  }
})