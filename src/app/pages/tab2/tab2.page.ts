import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article, EtiquetasCategory } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  // busca el elemento IonInfiniteScroll
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public categories  = [
                    {'label': 'business',         'icon': 'briefcase-outline'},
                    {'label': 'entertainment',    'icon': 'film-outline'},
                    {'label': 'general',          'icon': 'color-filter-outline'},
                    {'label': 'health',           'icon': 'heart-outline'},
                    {'label': 'science',          'icon': 'settings-outline'},
                    {'label': 'sports',           'icon': 'football-outline'},
                    {'label': 'technology',       'icon': 'hardware-chip-outline'}
                  ];

  public selectedCategory: any = this.categories[0].label;
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
    console.log(this.selectedCategory);
    this.newsServices.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        this.articles = [...this.articles, ...articles];
      });
  }

  loadData( event: any) {
    this.newsServices.getTopHeadlinesByCategory( this.selectedCategory, true)

    .subscribe( articles => {
      if( articles.length === this.articles.length ) {
        this.infiniteScroll.disabled = true;
        // event.target.disabled = true;
        return;
      }

        this.articles = articles;
        this.infiniteScroll.complete();
        // event.target.complete();
        
    })
  }

}
