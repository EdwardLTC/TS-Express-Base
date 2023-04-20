import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { EventController } from '@/controllers/events';

export class EventRoute implements Routes {
  public path = '/events';
  public router = Router();
  public event = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.event.searchEvent);
    this.router.post(`${this.path}`, this.event.createEvent);
    this.router.put(`${this.path}/:id`, this.event.updateEvent);
    this.router.delete(`${this.path}/:id`, this.event.deleteEvent);
  }
}
