import { Component, Inject, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/services/article.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  currentRate = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { article: Article },
    private articleService: ArticleService,
    private dialogRef: MatDialogRef<RateComponent>) { }

  ngOnInit(): void {
  }

  rate(): Promise<void> {
    const rating = this.data.article.rating;
    if (rating === 0) {
      this.data.article.rating = this.currentRate;
    }
    else {
      this.data.article.rating = (rating + this.currentRate) / 2;
    }
    return this.articleService.saveArticle(this.data.article).then(() => {
      this.dialogRef.close();
    });
  }


}
