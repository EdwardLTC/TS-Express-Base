import { Article } from '@/interfaces/articles';
import { Model, Schema, model } from 'mongoose';

export class ArticleModel {
  private static instance: Model<Article>;
  constructor() {
    const ArticleSchema: Schema = new Schema<Article>(
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
      },
      { timestamps: true },
    );

    try {
      model('article', ArticleSchema);
    } catch (e) {}
  }

  getInstance() {
    if (!ArticleModel.instance) {
      ArticleModel.instance = model<Article>('article');
    }

    return ArticleModel.instance;
  }
}
