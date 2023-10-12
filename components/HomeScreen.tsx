import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { HomeScreenProps } from '../types/home';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <ScrollView>
      <Text>dkdkd</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
