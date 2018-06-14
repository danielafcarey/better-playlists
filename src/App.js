import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
  user: {
    name: 'Daniela',
    playlists: [
      {
        name: 'Playlist1',
        songs: [
          { name: 'song1',
            duration: 1134
          }, 
          { name: 'song2',
            duration: 2134,
          } 
        ]
      },
      {
        name: 'Playlist2',
        songs: [
          { name: 'song1',
            duration: 1134
          }, 
          { name: 'song2',
            duration: 2134,
          } 
        ]
      },
      {
        name: 'Playlist3',
        songs: [
          { name: 'song1',
            duration: 112
          }, 
          { name: 'song2',
            duration: 2124,
          } 
        ]
      },
      {
        name: 'Playlist4',
        songs: [
          { name: 'song1',
            duration: 1235
          }, 
          { name: 'song2',
            duration: 235134,
          } 
        ]
      },
    ]
  }
}

class PlaylistCounter extends Component {
  render () {
    return (
      <div className='Aggregate'>
        <h2>{ this.props.playlists && this.props.playlists.length } Playlists</h2> 
      </div>
    )
  }
}

class HoursCounter extends Component {
  render () {
    let allSongs = this.props.playlists.reduce((allSongs, playlist) => {
      allSongs = [...allSongs, ...playlist.songs] 
      return allSongs;
    }, [])
    let totalDuration = allSongs.reduce((totalDuration, song) => {
      return totalDuration + song.duration;
    }, 0);
    return (
      <div className='Aggregate'>
        <h2>{ this.props.playlists && Math.floor(totalDuration/3600) } Hours</h2> 
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div className='Filter'>
        <img alt=''/>
        <input type='text' />
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return (
      <div className='Playlist'>
        <img alt=''/>
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li> 
          <li>Song 2</li>
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {}
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData })
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        {
          this.state.serverData.user ? 
          <div>
            <h1>{ this.state.serverData.user.name }'s Playlists </h1>
            <PlaylistCounter 
              playlists={ this.state.serverData.user.playlists }
            />
            <HoursCounter 
              playlists={ this.state.serverData.user.playlists }
            />
          </div> :
            <h1>Loading...</h1>
        }
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
