import React from 'react';
import { View } from 'react-native';
import { Headline, Text } from "react-native-paper";
import { useDog } from '../context/DogContext';

export default function Test() {
  return <View>
    {console.log("TEST use dog", useDog())}
    <Headline>Hello</Headline>
    <Text>{useDog().name}</Text>
  </View>;
}
