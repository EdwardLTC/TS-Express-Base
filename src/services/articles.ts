import { HttpResponse } from '@/httpModals';
import { Article } from '@/interfaces/articles';
import { ArticleModel } from '@/models/articles';
import { Service } from 'typedi';

@Service()
export class ArticleService {
  private article = new ArticleModel().getInstance();

  public async getArticles(): Promise<HttpResponse> {
    try {
      const articles = await this.article.find().sort({ createdAt: -1 }).skip(0).populate({
        path: 'createdBy',
        select: 'name avatar _id',
      });
      return new HttpResponse(articles);
    } catch (error) {
      throw error;
    }
  }

  public async getArticleById(id: string): Promise<HttpResponse> {
    try {
      const article = await this.article.findById(id).populate({
        path: 'createdBy',
        select: 'name avatar _id',
      });
      return new HttpResponse([article]);
    } catch (error) {
      throw error;
    }
  }

  public async createArticle(articleData: Article): Promise<HttpResponse> {
    try {
      const article = await this.article.create(articleData);
      return new HttpResponse(article);
    } catch (error) {
      throw error;
    }
  }

  public async updateArticle(id: string, articleData: Article): Promise<HttpResponse> {
    try {
      const updateArticle = await this.article.findByIdAndUpdate(id, articleData, { returnDocument: 'after', new: true });
      return new HttpResponse(updateArticle);
    } catch (error) {
      throw error;
    }
  }

  public async deleteArticle(id: string): Promise<HttpResponse> {
    try {
      const deleteArticle = await this.article.findByIdAndDelete(id);
      return new HttpResponse(deleteArticle);
    } catch (error) {
      throw error;
    }
  }

  public async getArticlesByUserId(id: string): Promise<HttpResponse> {
    try {
      const articles = await this.article.find({ createdBy: id }).sort({ createdAt: -1 }).skip(0);
      return new HttpResponse(articles);
    } catch (error) {
      throw error;
    }
  }
}
