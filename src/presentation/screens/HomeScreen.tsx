import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../routes/stack/MyStackNavigation';
import * as Styled from './style/stylehomescreen';

const HomeScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Styled.ContainerView>
      <Styled.StyledIcon name="touch-app" height={height} size={35} />
      <SvgUri
        width="100%"
        height="100%"
        uri="https://www.teamcore.net/wp-content/uploads/2020/10/logoteamcore-azul-37.svg"
        onPress={() => navigation.navigate('Form')}
      />
    </Styled.ContainerView>
  );
};

export default HomeScreen;
