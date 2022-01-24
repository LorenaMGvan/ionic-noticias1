import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})

// implements OnInit
export class ArticlesComponent {

  @Input() articles: Article[] = [];
  
  constructor() { }

  ngOnInit() {}

}
