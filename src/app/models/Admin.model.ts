import { User } from './user.model';
import { Article } from './article.model';

export { Admin };

class Admin extends User {
  adminToken: string;
  articles: Article[];
}
