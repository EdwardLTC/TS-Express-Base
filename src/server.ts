import { App } from '@/app';
import { UserRoute } from '@/routes/users';
import { ValidateEnv } from '@utils/validateEnv';
import { AuthRoute } from './routes/auth';
import { MediaRoute } from './routes/media';
import { ArticleRoute } from './routes/articles';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new MediaRoute(), new ArticleRoute()]);

app.listen();
