import {NavigationContainer} from '@react-navigation/native';
import MyStackNavigation from '../routes/stack/MyStackNavigation';
import {ThemeProvider} from 'styled-components';
import {theme} from '../theme';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toast />
      <NavigationContainer>
        <MyStackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
