import { HttpResponse } from '@/httpModals';
import { Event } from '@/interfaces/event.interface';
import { EventService } from '@/services/events';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class EventController {
  public event = Container.get(EventService);

  public searchEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event: HttpResponse = await this.event.searchEvent(req.query.name as string);
      res.status(event.statusCode).json(event);
    } catch (error) {
      next(error);
    }
  };

  public createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event: HttpResponse = await this.event.createEvent(req.body);
      res.status(event.statusCode).json(event);
    } catch (error) {
      next(error);
    }
  };

  public updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const eventData: Event = req.body;
      const event: HttpResponse = await this.event.updateEvent(id, eventData);
      res.status(event.statusCode).json(event);
    } catch (error) {
      next(error);
    }
  };

  public deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event: HttpResponse = await this.event.deleteEvent(req.params.id);
      res.status(event.statusCode).json(event);
    } catch (error) {
      next(error);
    }
  };
}
