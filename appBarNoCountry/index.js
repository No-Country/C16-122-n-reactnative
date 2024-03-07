
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {TamaguiProvider} from 'tamagui';
import config from './tamagui.config';

const RNRedux = () => (
  <Provider store={store}>
    <TamaguiProvider config={config}>
      <App />
    </TamaguiProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
