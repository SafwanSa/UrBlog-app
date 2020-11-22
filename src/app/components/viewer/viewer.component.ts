import { Component, Input, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  article: Article = new Article();

  constructor(private route: ActivatedRoute, private articleService: ArticleService, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.articleService.get$(id).subscribe(article => {
        this.article = article;
      });
    }
  }

}
