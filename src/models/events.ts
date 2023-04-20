import { model, Schema } from 'mongoose';
import { Event } from '@/interfaces/event.interface';

export class EventModel {
  constructor() {
    const eventSchema: Schema = new Schema<Event>(
      {
        name: { type: String, required: true },
        date: { type: String, required: true },
        place: { type: String, required: true },
        Department: { type: String, required: true },
      },
      { timestamps: true },
    );

    try {
      model<Event>('event', eventSchema);
    } catch (error) {}
  }
  getInstance() {
    return model<Event>('event');
  }
}
