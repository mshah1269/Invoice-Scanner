import React from 'react';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,

} from 'react-native';



import Images from './components/Images';
import { useState } from 'react'; 




const App = () => {
  const [text,setText] = useState("Scan Text!!") 
  const [imguri,setimguri] = useState(null);


  const pickImage = () =>{
    const options = {
      title: 'Select Avatar',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const imguri = { uri: response.uri };
        const imagepath = response.path
        setimguri(imguri);
        console.log('image :' + imagepath);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };


                
          const imgPath=imagepath;
          console.log('imgpath :' + imgPath)
          const lang='LANG_ENGLISH';

          const tessOptions = {
            whitelist: null, 
            blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
          };
          RNTesseractOcr.recognize(imgPath, lang, tessOptions)
            .then((result) => {
              setText(result);
              console.log("OCR Result: ", result);
              console.log('success!!')
            })
            .catch((err) => {
              console.log("OCR Error: ", err);
            })
            .done();
          
      }
    });


  }





  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center'}}>Hello</Text>
      <Button title="Pick Image" onPress={pickImage}/>
      <ScrollView>
        <Image
          style={{height: 500,width:300}}
          source={imguri}
        />
      </ScrollView>
      <ScrollView>
        <View style={styles.result}>
         
          <Text> 
            {text}
          </Text>
        </View>

      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding:30,
    
  },
  result:{
    margin:10,
    backgroundColor: '#F5FCFF',
    padding:20,
    marginTop:10
    

  }


});

export default App;
