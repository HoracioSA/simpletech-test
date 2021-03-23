import { StatusBar } from 'expo-status-bar';
import React,{useCallback, useEffect, useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
interface TextInputProps{
  value: number;
  limit: number;
}
export default function App(props: TextInputProps) {
  const [ wordCounter, setWordCounter] = useState(0)
  const [text, setText] = useState('');

  const [smsnumber, setSMS] = useState(0)
  function WordCounterHeandler(){
    if(text.length <= 0) {
      setSMS (0);
      return;
    }

    if(wordCounter <= 0) {
      setSMS (1);
      return;
    }
    let count = 0;
    const words = text.split(' ');
    let neededSms = words.length > 0 ? 1 : 0;
    words.forEach(word => {
      if((count + word.length)  > wordCounter) {
        count = word.length > wordCounter ? 0 : word.length;
        neededSms++;
      } else {
        count += word.length;
      }
    });
    setSMS (neededSms);
  }
  // React.useEffect(()=> {
  //   WordCounterHeandler();
  // },[wordCounter, text]);
  
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} onChangeText={text => setText(text)} placeholder="Isert  here your text" multiline={true}>
      </TextInput>
      <View style={styles.viewInputGroup}>
      <TextInput style={styles.textInputLimite} onChangeText={text => setWordCounter(Number(text))}>
      </TextInput>
      <Text>quantity of simbols</Text>
      </View>
      <TouchableOpacity onPress={WordCounterHeandler} style={styles.button}>
          <Text style={styles.text}>Scan quantity of SMS</Text>
      </TouchableOpacity>
      <Text style={styles.results}>Needed SMS: {smsnumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfcfcf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    height:60,
    width:300,
    backgroundColor: '#417ed9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    marginTop:10,
    borderColor:'#0c0d0d',
    borderWidth:1,
    
    
  },
  text:{
    color: 'white',
    fontSize:18,
  },
  textInput:{
    height:300,
    width:300,
    backgroundColor: '#fff',
    borderColor:'#0c0d0d',
    borderWidth:1,
    padding:10
  },
  textInputLimite:{
    height:50,
    width:60,
    backgroundColor: '#fff',
    marginTop:10,
    padding:10,
    borderColor:'#0c0d0d',
    borderWidth:1,
    fontSize:20,
  },
  viewInputGroup:{
    width:'70%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  results:{
    marginTop:20,
    fontSize:20,
  }
});
