import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View ,TouchableHighlight } from 'react-native';
import {Actions} from 'react-native-router-flux';

const MAX_RESULT = 14;
const PLAYLIST_ID1 = "PLZv9axzuJvQYWWuqK3547k1PBfm4o96th";
const PLAYLIST_ID2 = "PL3tKo37yAfLVQtJ7GDd_4RMF4d3UI4FWr";
const API_KEY = "AIzaSyCc-lUTze1DqleW2odaxnvyhkJ0YN4l8hQ";

export default class Home extends Component<{}> {
  
  home(){
    Actions.home();
  }

  watchVideo(video_url){
    Actions.watchvideo({video_url: video_url});
  }

  componentWillMount() {
    this.fetchPlaylistData1();
    this.fetchPlaylistData2();
  }

  fetchPlaylistData1 = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAYLIST_ID1}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`);
    const json = await response.json();
    this.setState({ videos1: json['items']});
    console.log(this.state.videos1)
  };

  fetchPlaylistData2 = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAYLIST_ID2}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`);
    const json = await response.json();
    this.setState({ videos2: json['items']});
    console.log(this.state.videos2)
  };

  constructor(props) {
    super(props);
    this.state = {
      videos1: [],
      videos2: [],
    }
  }

  render() {
    const videos1 = this.state.videos1;
    const videos2 = this.state.videos2;

    return (
      <SafeAreaView style={styles.safeArea}>
            <View style={{height:'50%', backgroundColor: '#87BDCC'}}>
              <Text style={[styles.title,{ backgroundColor: '#87BDCC'}]}> 
                PLAYLIST DE LA AGRUPACIÓN "NO TE VA GUSTAR"
              </Text>

              <FlatList
                data={this.state.videos1}
                renderItem={
                  ({item}) => 
                  <TouchableHighlight
                    style={styles.buttomSong}
                    onPress={() => this.watchVideo(item.contentDetails.videoId)}
                  >
                    <Text style={styles.buttomText}> 
                      {item.snippet.title} 
                    </Text>
                  </TouchableHighlight>
                }
              />
            </View>

            <View style={{height:'50%', backgroundColor: '#8ED4E8', marginTop: 10}}>
            <Text style={[styles.title,{ backgroundColor: '#8ED4E8'}]}> 
                PLAYLIST DE LA AGRUPACIÓN "LA VELA PUERCA"
              </Text>

              <FlatList
                data={this.state.videos2}
                renderItem={
                  ({item}) => 
                  <TouchableHighlight
                    style={styles.buttomSong}
                    onPress={() => this.watchVideo(item.contentDetails.videoId)}
                  >
                    <Text style={styles.buttomText}> 
                      {item.snippet.title} 
                    </Text>
                  </TouchableHighlight>
                }
              />
            </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttomSong: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius:20,
    backgroundColor: 'grey',
    margin: 5
  },
  buttomText: {
    padding: 10,
    fontSize: 15,
    height: 50,
    color: 'white'    
  },
  title: {
    padding: 10,
    fontSize: 20,
    height: 50,
    color: 'white', 
    fontWeight: "bold"
  }
});