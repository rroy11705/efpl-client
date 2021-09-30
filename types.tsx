/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export enum Positions {
  FWD = "FWD",
  MID = "MID",
  DEF = "DEF",
  GKP = "GKP"
}

export type Player = {
  id: number;
  name: string;
  short_name: string;
  team: number;
  price: number;
  position: Positions;
  totalPoints: number;
};

export type Team = {
  id: number;
  name: string;
  short_name: string;
  strength: number;
}

export type Fixture = {
  id: number,
  finished: boolean,
  kickoff_time: string,
  matchday: number,
  minutes: number,
  started: boolean,
  stats: [],
  away_team: number,
  away_team_score: number,
  home_team: number,
  home_team_score: number
}