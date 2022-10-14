import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const [busqueda, setBusqueda] = useState({ciudad: '', pais: ''});
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgcolor, setBgcolor] = useState('rgb(71,149,212)');

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    const {ciudad, pais} = busqueda;
    const consultarClima = async () => {
      if (consultar) {
        const appId = '15d5344bb3359ac40a0e74153df5bf96';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setResultado(resultado);
          setConsultar(false);

          // Modifica los colores de fondo basado en la temperatura
          const kelvin = 273.15;
          const {main} = resultado;
          const actual = main.temp - kelvin;
          if (actual < 10) {
            setBgcolor('rgb(105,108,149)');
          } else if (actual >= 10 && actual < 25) {
            setBgcolor('rgb(71,149,212)');
          } else {
            setBgcolor('rgb(178,28,61)');
          }
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consultarClima();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Intenta con otra ciudad o país', [
      {text: 'Entendido'},
    ]);
  };

  const bgColorApp = {
    backgroundColor: bgcolor,
  };

  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima resultado={resultado} />
          <Formulario
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setConsultar={setConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
