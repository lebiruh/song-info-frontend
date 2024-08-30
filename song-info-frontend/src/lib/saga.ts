import { call, put, takeLatest, StrictEffect } from 'redux-saga/effects'
import {fetchSongsStart, fetchSongsSuccess, fetchSongsFailure, fetchTotalSongsStatisticsSuccess, fetchTotalArtistsStatisticsSuccess, fetchTotalAlbumsStatisticsSuccess, fetchTotalGenresStatisticsSuccess, createSongSuccess, updateSongSuccess, deleteSongSuccess} from '../features/songSlice'
import ACTION_TYPES from './action.types'
import axios, { AxiosResponse } from 'axios'
import { PayloadAction } from '@reduxjs/toolkit'


const baseUrl = import.meta.env.VITE_BASE_URL


type CreateLoad = {
  title: string
  artist: string
  album: string
  genre: string
}

type UpdateLoad = {
  id: string
  title: string
  artist: string
  album: string
  genre: string
}


function* fetchSongsSaga() {
  yield put(fetchSongsStart());
  try {
    const response: AxiosResponse = yield call(axios.get, `${baseUrl}/api/songs`);
    yield put(fetchSongsSuccess(response.data));
  } catch (error: unknown ) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    }
  }
}

function* createSongSaga(action: PayloadAction<CreateLoad>) {  

  try {
    const response: AxiosResponse = yield call ( axios.post,`${baseUrl}/api/songs`, action.payload);
    yield put(createSongSuccess(response.data));
  } catch (error: unknown ) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    }
  }
}

function* updateSongSaga(action: PayloadAction<UpdateLoad>) {

  const {id, title, artist, album, genre} = action.payload;

  try {
    const response: AxiosResponse = yield call ( axios.put,`${baseUrl}/api/song/${id}`, {id, title, artist, album, genre});
    yield put(updateSongSuccess(response.data));
  } catch (error: unknown ) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    }
  }
}

function* deleteSongSaga(action: PayloadAction<UpdateLoad>) {

  try {
    yield put(deleteSongSuccess(action.payload))
    const response: AxiosResponse = yield call ( axios.delete,`${baseUrl}/api/song/${action.payload}`);
    yield put(deleteSongSuccess(response.data));
  } catch (error: unknown ) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    }
  }
}

function* fetchTotalSongsStatisticsSaga() {
  try {

    const response: AxiosResponse = yield call(axios.get, `${baseUrl}/api/songs/stats/total`);
    yield put(fetchTotalSongsStatisticsSuccess(response.data));
  } catch (error: unknown ) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    }
  }
}

function* fetchTotalArtistsStatisticsSaga() {
  try {

    const response: AxiosResponse = yield call(axios.get, `${baseUrl}/api/songs/stats/artists`);
    yield put(fetchTotalArtistsStatisticsSuccess(response.data));
  } catch (error: unknown ) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    }
  }
}

function* fetchTotalAlbumssStatisticsSaga() {
  try {

    const response: AxiosResponse = yield call(axios.get, `${baseUrl}/api/songs/stats/albums`);
    yield put(fetchTotalAlbumsStatisticsSuccess(response.data));
  } catch (error: unknown ) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    }
  }
}

function* fetchTotalGenresStatisticsSaga() {
  try {

    const response: AxiosResponse = yield call(axios.get, `${baseUrl}/api/songs/stats/genres`);
    yield put(fetchTotalGenresStatisticsSuccess(response.data));
  } catch (error: unknown ) {
    if (error instanceof Error) {
      yield put(fetchSongsFailure(error.message));
    }
  }
}

function* songsSaga(): Generator<StrictEffect> {
  yield takeLatest(ACTION_TYPES.FETCH_SONGS, fetchSongsSaga)
  yield takeLatest(ACTION_TYPES.CREATE_SONG, createSongSaga)
  yield takeLatest(ACTION_TYPES.UPDATE_SONG, updateSongSaga)
  yield takeLatest(ACTION_TYPES.DELETE_SONG, deleteSongSaga)
  yield takeLatest(ACTION_TYPES.FETCH_SONG_STATISTICS, fetchTotalSongsStatisticsSaga)
  yield takeLatest(ACTION_TYPES.FETCH_ARTIST_STATISTICS, fetchTotalArtistsStatisticsSaga)
  yield takeLatest(ACTION_TYPES.FETCH_ALBUM_STATISTICS, fetchTotalAlbumssStatisticsSaga)
  yield takeLatest(ACTION_TYPES.FETCH_GENRE_STATISTICS, fetchTotalGenresStatisticsSaga)
}


export default songsSaga;
