import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';

import {Picker} from '@react-native-community/picker';

const Formulario = ({busqueda, setBusqueda}) => {
  const {ciudad, pais} = busqueda;
  const [animacionBoton] = useState(new Animated.Value(1));

  const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.9,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      friction: 4,
      tension: 30,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionBoton}],
  };

  const consultarClima = () => {
    if (ciudad.trim() === '' || pais.trim() === '') {
      mostrarAlerta();
      return;
    }

    // consultar la API
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agrega una ciudad y país para la búsqueda', [
      {text: 'Entendido'},
    ]);
  };

  return (
    <View style={styles.formulario}>
      <View>
        <TextInput
          value={ciudad}
          onChangeText={ciudad => setBusqueda({...busqueda, ciudad})}
          style={styles.input}
          placeholder="Ciudad"
          placeholderTextColor="#666"
        />
      </View>
      <View>
        <Picker
          selectedValue={pais}
          itemStyle={{height: 120, backgroundColor: '#FFF'}}
          onValueChange={pais => setBusqueda({...busqueda, pais})}>
          <Picker.Item label="-- Seleccione un país --" value="" />
          <Picker.Item label="Estados Unidos" value="US" />
          <Picker.Item label="México" value="MX" />
          <Picker.Item label="Argentina" value="AR" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="Costa Rica" value="CR" />
          <Picker.Item label="España" value="ES" />
          <Picker.Item label="Perú" value="PE" />
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPressIn={() => animacionEntrada()}
        onPressOut={() => animacionSalida()}
        onPress={() => consultarClima()}>
        <Animated.View style={[styles.bntBuscar, estiloAnimacion]}>
          <Text style={styles.textoBuscar}>Buscar Clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  bntBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Formulario;
