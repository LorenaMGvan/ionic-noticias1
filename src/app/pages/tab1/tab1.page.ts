import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = [];

  constructor( private newsServices:NewsService ) {}

  ngOnInit() {

    // llamamos el servicio
    this.newsServices.getTopHeadlines()
      .subscribe( articles  => {
         this.articles.push(... articles); 
         //this.articles = [ ... articles, ... this.articles ];
      }); 
  }

}
