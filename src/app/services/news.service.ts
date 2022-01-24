import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // el of  convierte a un observable lo que le mandemos como parametro
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Article, ArticlesByCategoryAndPage, NewsResponse } from '../interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor( private http: HttpClient ) { }

  private articlesByCategoryAndPage:ArticlesByCategoryAndPage = { }

  private executeQuery<T>( endpoint: string) {
    console.log('Petición HTTP realizada');

    return this.http.get<T>(`${ apiUrl }${ endpoint}`, {
        params: {
          apikey: apiKey,
          country: 'de'
        }
    });
  }



  getTopHeadlines(): Observable<Article[]> {
    return this.getTopHeadlinesByCategory('business');
    // return this.executeQuery<NewsResponse>(`/top-headlines?category=sports`)
    //   .pipe(
    //       map( ({ articles }) => articles )
    //   );   
  }

  
  getTopHeadlinesByCategory( category: string, loadMore: boolean = false):Observable<Article[]> {

    if( loadMore ) {
      return this.getArticlesByCategoy(category);
    }

    if(this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
      // el of  convierte a un observable lo que le mandemos como parametro
    }

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }`)
      .pipe(
        map( ({ articles }) => articles )
      );
  }

  // solo debe funcionar en  el servicio
  private getArticlesByCategoy( category: string): Observable<Article[]> {

    if( !Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      // no existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`)
      .pipe(
        map( ({ articles }) => {

          if (articles.length === 0) return this.articlesByCategoryAndPage[category].articles;

          this.articlesByCategoryAndPage[category] = {
            page: page,
            articles: [...this.articlesByCategoryAndPage[category].articles, ... articles]
          }

          return this.articlesByCategoryAndPage[category].articles;
        })
      );

  }

}
