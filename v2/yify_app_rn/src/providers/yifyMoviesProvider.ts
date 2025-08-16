import axios from 'axios';
import {
  Response,
  SubsceneResults,
  TMDbResponse,
  YifySubtitleResultJson,
} from '../models/moviesjson';

const yifysites = [
  'https://yts.lt/api/v2',
  'https://yts.unblocked.lat/api/v2',
  'https://yts.bypassed.org/api/v2',
  'https://yts.pe/api/v2/',
  'https://yifymovie.co/api/v2',
  'https://yifytorrent.to/api/v2/',
  'https://yts.me/api/v2',
  'https://yts.gs/api/v2',
];
const yifysubUrl = 'https://www.yifysubtitles.com/movie-imdb/';
const Tmdburl =
  'https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=REPLACE_WITH_REAL_ONE';
const ServerIp = 'http://18.217.205.247:7070/';

export class YifyMoviesProvider {
  private siteIndex: number = 0;
  private Url: string = yifysites[0];

  setUrl(index: number) {
    this.siteIndex = index;
    this.Url = yifysites[index];
    console.log(this.Url);
  }
  getUrl() {
    return this.Url;
  }

  async loadYifyMovies(limit: number, page: number): Promise<Response> {
    const url = `${this.Url}/list_movies.json?limit=${limit}&page=${page}`;
    const res = await axios.get(url);
    return res.data as Response;
  }

  async loadYifyTopRatedMovies(limit: number, page: number): Promise<Response> {
    const url = `${this.Url}/list_movies.json?sort_by=rating&limit=${limit}&page=${page}`;
    const res = await axios.get(url);
    return res.data as Response;
  }

  async loadYifyMovieDetails(movie_id: number): Promise<Response> {
    const url = `${this.Url}/movie_details.json?movie_id=${movie_id}&with_images=true&with_cast=true`;
    const res = await axios.get(url);
    return res.data as Response;
  }

  async searchYifyMovies(query_term: string): Promise<Response> {
    const url = `${this.Url}/list_movies.json?sort_by=rating&limit=30&query_term=${query_term}`;
    const res = await axios.get(url);
    return res.data as Response;
  }

  async advancedSearchYifyMovies(
    limit: number,
    page: number,
    criteria: string
  ): Promise<Response> {
    const url = `${this.Url}/list_movies.json?limit=${limit}&page=${page}&${criteria}`;
    const res = await axios.get(url);
    return res.data as Response;
  }

  async getYifySubTitles(imdb_code: string): Promise<YifySubtitleResultJson> {
    const body = {
      url: `${yifysubUrl}${imdb_code}`,
      json_data: JSON.stringify({
        /* queryjson structure here */
      }),
    };
    const res = await axios.post(ServerIp, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });
    return res.data as YifySubtitleResultJson;
  }

  async getSubSceneSubTitles(suburl: string): Promise<SubsceneResults> {
    const body = {
      url: suburl,
      json_data: JSON.stringify({
        /* subscene_queryjson structure here */
      }),
    };
    const res = await axios.post(ServerIp, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });
    return res.data as SubsceneResults;
  }

  async downloadSubsceneSubs(suburl: string): Promise<SubsceneResults> {
    const body = {
      url: suburl,
      json_data: JSON.stringify({
        /* subscene_download_json structure here */
      }),
    };
    const res = await axios.post(ServerIp, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });
    return res.data as SubsceneResults;
  }

  async searchTMDbQueryData(
    query_term: string,
    page: number
  ): Promise<TMDbResponse> {
    const url = `${Tmdburl}&query=${query_term}&page=${page}`;
    const res = await axios.get(url);
    return res.data as TMDbResponse;
  }
}
