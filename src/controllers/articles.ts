import { HttpException } from '@/httpModals';
import { Article } from '@/interfaces/articles';
import { BaseRequest } from '@/interfaces/baseRequest';
import { ArticleService } from '@/services/articles';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class ArticleController {
  private article = Container.get(ArticleService);

  public getArticles = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const articles = await this.article.getArticles();
      res.status(articles.statusCode).json(articles);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public getArticleById = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        next(new HttpException({ statusCode: 400, message: 'No article id found in request params' }));
      }
      const article = await this.article.getArticleById(id);
      res.status(article.statusCode).json(article);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public createArticle = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.user;
      if (!_id) {
        next(new HttpException({ statusCode: 401, message: 'No user found in request body' }));
      }
      const { title, content, image } = req.body;
      if (!title || !content || !image) {
        next(new HttpException({ statusCode: 400, message: 'Article missing attribute' }));
      }
      const articleData: Article = { title, content, image, createdAt: new Date(), createdBy: _id };
      const article = await this.article.createArticle(articleData);
      res.status(article.statusCode).json(article);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public updateArticle = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        next(new HttpException({ statusCode: 400, message: 'No article id found in request params' }));
      }
      const articleReq = req.body;
      if (!articleReq) {
        next(new HttpException({ statusCode: 400, message: 'No article found in request body' }));
      }

      const article = await this.article.updateArticle(id, articleReq);
      res.status(article.statusCode).json(article);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public deleteArticle = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        next(new HttpException({ statusCode: 400, message: 'No article id found in request params' }));
      }
      const article = await this.article.deleteArticle(id);
      res.status(article.statusCode).json(article);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public getArticleByUser = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        next(new HttpException({ statusCode: 400, message: 'No user id found in request params' }));
      }
      const article = await this.article.getArticlesByUserId(id);
      res.status(article.statusCode).json(article);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public getMyArticle = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.user;
      if (!_id) {
        next(new HttpException({ statusCode: 401, message: 'Missing token' }));
      }
      const article = await this.article.getArticlesByUserId(_id.toString());
      res.status(article.statusCode).json(article);
    } catch (error) {
      next(new HttpException(error));
    }
  };
}
