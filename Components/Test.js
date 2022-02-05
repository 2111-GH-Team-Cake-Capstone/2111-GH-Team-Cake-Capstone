import React from 'react';
import { View } from 'react-native';
import { Headline, Text } from "react-native-paper";
import { useDog } from '../context/DogContext';

export default function Test() {
  return <View>
    <Headline>Hello</Headline>
    <Text>{useDog()}</Text>
  </View>;
}
