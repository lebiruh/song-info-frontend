import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Song = {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
}


type InitialState = {
  songs: Song[]
  isLoading: boolean
  error: string | null
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
}


const initialState: InitialState = {
  songs: [],
  isLoading: false,
  error: null,
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,
};


const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    fetchSongsFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    updateSongSuccess: (state, action) => {
      const index = state.songs.findIndex((song) => song._id === action.payload._id);
      state.songs[index] = action.payload;
    },
    deleteSongSuccess: (state, action) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    fetchTotalSongsStatisticsSuccess: (state, action) => {
      state.totalSongs = action.payload.totalSongs;
 
    },
    fetchTotalArtistsStatisticsSuccess: (state, action) => {
      state.totalArtists = action.payload.totalArtists;
    },
    fetchTotalAlbumsStatisticsSuccess: (state, action) => {
      state.totalAlbums = action.payload.totalAlbums;
    },
    fetchTotalGenresStatisticsSuccess: (state, action) => {
      state.totalGenres = action.payload.totalGenres;
    },
  },
  
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  fetchTotalSongsStatisticsSuccess,
  fetchTotalArtistsStatisticsSuccess,
  fetchTotalAlbumsStatisticsSuccess,
  fetchTotalGenresStatisticsSuccess
} = songSlice.actions;

export default songSlice.reducer;