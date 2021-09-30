import React, { Suspense, useRef } from 'react';
import { StyleSheet, SafeAreaView, Pressable, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import BottomSheet from "@gorhom/bottom-sheet"

import TeamStats from '../components/TeamStats';
import Field from '../components/Field';
import PlayerList from '../components/PlayerList';
import Filters from '../components/Filters';


export default function TabOneScreen() {

  const playerListBottomSheet = useRef<BottomSheet>(null);

  const viewPlayers = () => {
    playerListBottomSheet.current?.expand();
  }

  const snapPoints = [0, "78%"];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#227101', '#43bb02', '#227100']}
        style={styles.background}
        start={[1, 0]}
        end={[0, 0]}
      />
      <Suspense fallback={<Text>Loading Stats</Text>}>
        <TeamStats />
      </Suspense>

      <Field />
      <View style={styles.buttonContainer}>
        <Pressable 
          onPress={viewPlayers}
          style={styles.ViewPlayerButton}  
        >
          <Text>Select Player</Text>
        </Pressable>

        <Pressable 
          onPress={viewPlayers}
          style={styles.ViewPlayerButton}  
        >
          <Text>Save Team</Text>
        </Pressable>
      </View>

      <BottomSheet
        ref={playerListBottomSheet}
        index={0}
        snapPoints={snapPoints}
      >
        <Filters />
        <Suspense fallback={<Text>Loading Elements...</Text>}>
          <PlayerList />
        </Suspense>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: "100%",
    height: "105%",
  },
  ViewPlayerButton: {
    backgroundColor: "#ffa64d",
    width: "30%",
    margin: 30,
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 50
  },
  buttonContainer: {
    flexDirection: "row",
  }
})