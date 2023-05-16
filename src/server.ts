import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { UserRoute } from '@/routes/apis/users';
import { AuthRoute } from './routes/apis/auth';
import { MediaRoute } from './routes/apis/media';
import { ProductRoute } from './routes/apis/product';
import { HomeCpanel } from './routes/cpanel/home';
import { BillRoute } from './routes/apis/bill';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new MediaRoute(), new ProductRoute(), new BillRoute()], [new HomeCpanel()]);

app.listen();
