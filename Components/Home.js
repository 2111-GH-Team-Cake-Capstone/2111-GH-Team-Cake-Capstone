import { StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';


export default function Home() {
  return (
    <View style={styles.container}>
      <Headline>Welcome to Leashed!</Headline>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
