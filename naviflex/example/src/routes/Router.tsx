import {createAppContainer, createStackNavigator} from 'react-navigation';

import FirstScreen from '../screens/First';
import SecondScreen from '../screens/Second';
import ThirdScreen from '../screens/Third';

const AppStack = createStackNavigator({
  first: FirstScreen,
  second: SecondScreen,
  third: ThirdScreen,
});

export default createAppContainer(AppStack);
