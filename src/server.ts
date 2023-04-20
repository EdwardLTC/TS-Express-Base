import { App } from '@/app';
import { UserRoute } from '@/routes/users';
import { ValidateEnv } from '@utils/validateEnv';
import { ProductRoute } from './routes/products';
import { EventRoute } from './routes/events';

ValidateEnv();

const app = new App([new UserRoute(), new ProductRoute(), new EventRoute()]);

app.listen();
