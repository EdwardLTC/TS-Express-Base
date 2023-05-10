import { ArticleController } from '@/controllers/articles';
import { AuthController } from '@/controllers/auth';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

export class ArticleRoute implements Routes {
  public path = '/articles';
  public router = Router();
  public article = new ArticleController();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.article.getArticles);
    this.router.get(`${this.path}/my-articles`, this.auth.checkToken, this.article.getMyArticle);
    this.router.get(`${this.path}/:id`, this.auth.checkToken, this.article.getArticleById);
    this.router.get(`${this.path}/user/:id`, this.auth.checkToken, this.article.getArticleByUser);
    this.router.post(`${this.path}`, this.auth.checkToken, this.article.createArticle);
    this.router.put(`${this.path}/:id`, this.auth.checkToken, this.article.updateArticle);
    this.router.delete(`${this.path}/:id`, this.auth.checkToken, this.article.deleteArticle);
  }
}
