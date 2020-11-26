import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/services/user.service';
import { Article } from '../../../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() user: User;
  @Input() isWriter: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
