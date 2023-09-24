import { StyleSheet, Text, View } from 'react-native';

export default function HomeList() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>HomeList</Text>
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
