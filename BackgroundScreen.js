import { View, StyleSheet, ImageBackground, Text } from "react-native";

const image = require('./assets/logo2.jpg')
const BackgroundScreen =() =>{
    return(
      <View style={styles.container1}>
        <ImageBackground source={image} style={styles.imageStyle} >
          <Text></Text>
       </ImageBackground>
      </View>
    );
  };

  const styles = StyleSheet.create({
      container1:{
        flex:1,
        
      },
      imageStyle: {
        flex:1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        opacity: 0.9
      }

  })
export default BackgroundScreen;