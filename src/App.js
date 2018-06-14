import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
  user: {
    name: 'Daniela',
    playlists: [
      {
        name: 'Playlist1',
        songs: [
          { name: 'donna',
            duration: 1134
          }, 
          { name: 'hector',
            duration: 2134,
          } 
        ]
      },
      {
        name: 'Playlist2',
        songs: [
          { name: 'barb',
            duration: 1134
          }, 
          { name: 'helen',
            duration: 2134,
          } 
        ]
      },
      {
        name: 'Playlist3',
        songs: [
          { name: 'love',
            duration: 112
          }, 
          { name: 'yoooooo',
            duration: 2124,
          } 
        ]
      },
      {
        name: 'Playlist4',
        songs: [
          { name: 'dingus',
            duration: 1235
          }, 
          { name: 'dingusii',
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
        <input 
          onChange={ (e) => this.props.updateSearchString(e.target.value) }
          type='text' />
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    let songs = this.props.songs.map((song, i) => {
      return <li key={i}>{song.name}</li>
    })
    return (
      <div className='Playlist'>
        <img alt=''/>
        <h3>{ this.props.name }</h3>
        <ul>
          { songs }
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData })
    }, 1000)
  }

  updateSearchString = (filterString) => {
    this.setState({ filterString })
  }

  render() {
    const { user } = this.state.serverData;

    return (
      <div className="App">
        {
          user ? 
          <div>
            <h1>{ user.name }'s Playlists </h1>
            <PlaylistCounter 
              playlists={ user.playlists }
            />
            <HoursCounter 
              playlists={ user.playlists }
            />
            <Filter updateSearchString={ this.updateSearchString }/>
            {
              user.playlists.filter(playlist => {
                return playlist.name.includes(this.state.filterString);
              }).map((playlist, i) => {
                return <Playlist { ...playlist } key={i} />;
              })
            }
          </div> :
          <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
