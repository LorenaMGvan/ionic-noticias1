import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Article, NewsResponse } from '../interfaces';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient ) { }

  getTopHeadlines(): Observable<Article[]> {

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/everything?q=tesla&from=2021-12-19&sortBy=publishedAt`, {
      params: {
        apiKey //  a partir de ecmacscript6 se puede omitit esto "apiKey:apiKey", si se llaman igual
      }
    }).pipe( //  transforma la salida, mas nop la data
      map(({ articles }) => articles)
      // map(resp => resp.articles)
    );
    
    //return this.http.get('')
    // return this.http.get(`https://newsapi.org/v2/everything?q=tesla&from=2021-12-19&sortBy=publishedAt&apiKey=${ apiKey }`, {

    // });    
  }


}
