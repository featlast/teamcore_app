import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../presentation/screens/HomeScreen';
import FormScreen from '../../presentation/screens/FormScreen';
import {screenOptions} from './screenOptions';

export type RootStackParams = {
  Home: undefined;
  Form: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export default function MyStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Form" component={FormScreen} />
    </Stack.Navigator>
  );
}
