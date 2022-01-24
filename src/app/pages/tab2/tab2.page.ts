import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public categories: string[] = ['business','entertainment','general','health', 'science','sports','technology'];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  constructor( private newsServices:NewsService) {}


  ngOnInit(): void {
    this.newsServices.getTopHeadlinesByCategory(this.selectedCategory) 
      .subscribe( articles => {
        this.articles = [...articles];
      });
    
  }

  segmentChanged( event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsServices.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        this.articles = [...this.articles, ...articles];
      });
  }

  loadData( event: any) {
    this.newsServices.getTopHeadlinesByCategory( this.selectedCategory, true)
    .subscribe( articles => {
        this.articles = articles;

        event.target.complete();
    })
  }

}
