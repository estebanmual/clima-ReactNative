import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

import {Picker} from '@react-native-community/picker';

const Formulario = () => {
  return (
    <View style={styles.formulario}>
      <View>
        <TextInput placeholder="Ciudad" placeholderTextColor="#666" />
      </View>
      <View>
        <Picker>
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
      <TouchableWithoutFeedback>
        <View>
          <Text>Buscar Clima</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  formulario: {
    marginTop: 100,
  },
});

export default Formulario;
