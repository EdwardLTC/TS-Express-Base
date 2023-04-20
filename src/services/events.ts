import { Service } from 'typedi';
import { HttpException, HttpResponse } from '@/httpModals';
import { EventModel } from '@/models/events';
import { Event } from '@/interfaces/event.interface';

@Service()
export class EventService {
  private eventModel = new EventModel().getInstance();

  public async searchEvent(search: string): Promise<HttpResponse> {
    try {
      const event: Event[] = await this.eventModel.find({ name: { $regex: search, $options: 'i' } });
      return new HttpResponse(event);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async createEvent(eventData: Event): Promise<HttpResponse> {
    try {
      const createEventData: Event = await this.eventModel.create(eventData);
      return new HttpResponse(createEventData);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async updateEvent(eventId: string, eventData: Event): Promise<HttpResponse> {
    try {
      const updateEvent: Event[] = await this.eventModel.findOneAndUpdate({ _id: eventId }, eventData, { returnDocument: 'after' });
      return new HttpResponse(updateEvent);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async deleteEvent(eventId: string): Promise<HttpResponse> {
    try {
      const deleteEvent: Event[] = await this.eventModel.findByIdAndDelete(eventId);
      return new HttpResponse(deleteEvent);
    } catch (error) {
      throw new HttpException(error);
    }
  }
}
