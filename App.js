import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, Image, Switch} from 'react-native';
import {
  Player,
  Recorder,
  MediaStates
} from 'react-native-audio-toolkit';
import Sound from 'react-native-sound';
import VolumeSlider from 'react-native-volume-slider';
import VolumeControl, {
  VolumeControlEvents
} from "react-native-volume-control";
import Slider from '@react-native-community/slider';

const width = Dimensions.get("window").width

const bird = new Sound('bird.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error){
    console.log(error)
  }
});

const waves = new Sound('WavesSound.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log(error)
  }
});

const rain = new Sound('RainSounds.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log(error)
  }
});


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      birdVolume: 0.5,
      wavesVolume: 0.5,
      rainVolume: 0.5,
      switchValue: false,
    }
  }

  switchToggle(){
    if (this.state.switchValue == false ){
      this.playButton()
    }else {
      rain.stop()
      waves.stop()
      bird.stop()
    }


    this.setState({switchValue: !this.state.switchValue})
  }
  // this.playButton()
  // this.setState({switchValue: !this.state.switchValue})


  birdSliderChange(value) {
    if (value < 0.08){
      value = 0
    }
      this.setState({birdVolume: value})
      bird.setVolume(this.state.birdVolume)
      console.log(this.state.birdVolume)
  }
  
  wavesSliderChange(value) {
    if (value < 0.08){
      value = 0
    }
    this.setState({wavesVolume: value})
    waves.setVolume(this.state.wavesVolume)
  }
  
  rainSliderChange(value) {
    if (value < 0.08){
      value = 0
    }
    this.setState({rainVolume: value})
    rain.setVolume(this.state.rainVolume)
  }
  
  playButton(){
    rain.setNumberOfLoops(100).play();
    waves.play()  
    bird.play()
  }
  
  render() {
    return (
      <View style={styles.container}>

        <Switch
          ios_backgroundColor={'#000'}
          trackColor={'#000'}
          tintColor={'#000'}
          // thumbColor={'#000'}
          // thumbTintColor={'#000'}
          onValueChange={() => this.switchToggle()}
          value={this.state.switchValue}
        />

        <Button
          title="Play"
          onPress={() => this.playButton()}
        />
        <Text>Bird</Text>
        <Slider
          value={this.state.birdVolume}
          minimumValue={0}
          maximumValue={1}
          onValueChange={this.birdSliderChange.bind(this)}
          style={{width: width-100, height: 40}}
        />
        <Text>Waves</Text>
        <Slider
          value={this.state.wavesVolume}
          minimumValue={0}
          maximumValue={1}
          onValueChange={this.wavesSliderChange.bind(this)}
          style={{width:width-100}}
        />
        <Text>Rain</Text>
        <Slider
          value={this.state.rainVolume}
          minimumValue={0}
          maximumValue={1}
          onValueChange={this.rainSliderChange.bind(this)}
          style={{width:width-100}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
