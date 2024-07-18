import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StyledIconProps {
  height: number;
}

export const ContainerView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${props => props.theme.colors.white};
`;

export const StyledIcon = styled(Icon)<StyledIconProps>`
  position: absolute;
  top: ${({height}) => (height as number) * 0.55}px;
  color: ${props => props.theme.colors.primary};
`;
