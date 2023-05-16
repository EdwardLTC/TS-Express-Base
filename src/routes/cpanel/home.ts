import { HomeController } from '@/controllers/cpanel/home';
import { Routes } from '@/interfaces/base/routes.interface';
import { Router } from 'express';

export class HomeCpanel implements Routes {
  public path = '/';
  public router = Router();
  public home = new HomeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.home.home);
  }
}
