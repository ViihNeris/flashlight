import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // Liga o Flash do Celular
    Torch.switchState(toggle);
    console.log(`Trocou o estado do flash (${toggle}).`);
  }, [toggle]);

  useEffect(() => {
    /*
      Quando o celular for chacoalhado, mudaremos o toggle.
    */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
    /* Essa func vai ser chamada quando o componente
       For desmontado.
    */
    return () => subscription.remove();
  }, []);
  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={style.dioLogo}
          source={
            toggle
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')
          }
        />
        <Image
          style={toggle ? style.lightImgOn : style.lightImgOff}
          source={
            toggle
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
          }
        />
        <Image
          style={style.dioLogo2}
          source={
            toggle
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lightImgOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
    position: 'absolute',
    marginTop: 250,
  },
  lightImgOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
    position: 'absolute',
    marginTop: 250,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 120,
    height: 120,
    marginBottom: 250,
  },
  dioLogo2: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 120,
    height: 120,
    marginTop: 180,
  },
});
