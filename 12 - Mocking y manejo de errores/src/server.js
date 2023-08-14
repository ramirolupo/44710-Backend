import './db/db.js';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import config from './config.js';
import routerApi from './routes/index.js';
import './passport/local.js';
import './passport/github.js';


const app = express();

app.use(
  session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl: config.MONGO_DB,
      ttl: 180,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routerApi);

app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));