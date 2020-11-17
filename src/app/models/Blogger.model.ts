import { User } from './user.model';
import { Article } from './article.model';

export class Blogger extends User {
  articles: Article[];
  isBlocked: boolean;
  rating: number;
}