import { HttpException, HttpResponse } from '@/httpModals';
import { MediaModel } from '@/models/media';
import { Service } from 'typedi';

@Service()
export class MediaService {
  private mediaModel = new MediaModel().getInstance();

  public async insertMedia(media: any): Promise<HttpResponse> {
    try {
      const res = await this.mediaModel.create(media);
      return new HttpResponse(res);
    } catch (error) {
      throw new HttpException({ statusCode: 500 });
    }
  }
}
