// Author: Oskari Juntunen

import React, { useState } from 'react';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';


export default function App() {

  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(1);
  const [time, setTime] = useState(1);
  const [gender, setGender] = useState('male');
  const [promilles, setPromilles] = useState(0);

  const bottlesArray = Array();
  bottlesArray.push({ label: '1 bottle', value: 1 });
  bottlesArray.push({ label: '3 bottles', value: 3 });
  bottlesArray.push({ label: '6 bottles', value: 7 });
  bottlesArray.push({ label: '12 bottles', value: 12 });
  bottlesArray.push({ label: '24 bottles', value: 24 });

  const timeArray = Array();
  timeArray.push({ label: '1 hour', value: 1 });
  timeArray.push({ label: '2 hours', value: 2 });
  timeArray.push({ label: '3 hours', value: 3 });
  timeArray.push({ label: '4 hours', value: 4 });
  timeArray.push({ label: '5 hours', value: 5 });

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ]

  function calculate() {
    let result = 0;
    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight / 10;
    let gramsLeft = grams - burning * time;
    
    if (gender === 'male') {
      result = gramsLeft / (weight * 0.7);
    }
    else {
      result = gramsLeft / (weight * 0.6);
    }
    if (result < 0) {
      result = 0;
    }
    setPromilles(result);
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setWeight(text)}
          placeholder="in kilograms"
          keyboardType='numeric'> 
        </TextInput>
      </View>
      <View style={styles.field}>
        <Text>Bottles</Text>
        <Picker
          onValueChange={(itemValue) => setBottles(itemValue)}
          selectedValue={bottles}
        >
          {bottlesArray.map((bottles, index) => (
            <Picker.Item key={index} label={bottles.label}
            value={bottles.value}/>
          ))
          }
        </Picker>
      </View>
      <View style={styles.field}>
        <Text>Time</Text>
        <Picker
          onValueChange={(itemValue) => setTime(itemValue)}
          selectedValue={time}
        >
          {timeArray.map((time, index) => (
            <Picker.Item key={index} label={time.label}
            value={time.value}/>
          ))
          }
        </Picker>
      </View>

      <View style={styles.field}>
        <Text>Gender</Text>
        <RadioForm 
          style={styles.radio}
          buttonSize={10}
          radio_props={genders}
          initial={0}
          onPress={(value)=> {setGender(value)}}
        />
        
      </View>
      <View style={styles.field}>
        <Text>Promilles</Text>
        <Text>{promilles.toFixed(2)}</Text>
      </View>
      <Button onPress={calculate} title="Calculate"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  field: {
    margin: 10,
    paddingTop: 10
  },
  input: {
    marginLeft: 10
  },
  radio: {
    marginTop: 10,
    marginBottom: 10
  }
});
