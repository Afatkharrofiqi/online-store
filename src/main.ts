import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MainModule } from 'src/main.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  const config = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  hbs.registerPartials(join(__dirname, '..', 'src/views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(
    join(__dirname, '..', 'src/views/layouts'),
  );
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: 'online-store',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    const flashErrors: string[] = req.session.flashErrors;
    if (flashErrors) {
      res.locals.flashErrors = flashErrors;
      req.session.flashErrors = null;
    }
    next();
  });
  app.use('/admin*', function (req, res, next) {
    if (req.session.user && req.session.user.role == 'admin') {
      next();
    } else {
      res.redirect('/');
    }
  });
  app.use('/account*', function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  const logger = new Logger('Bootstrap');
  await app.listen(config.get('app.port'), () => {
    logger.log(
      `Server is listen on http://localhost:${config.get('app.port')}`,
    );
  });
}
bootstrap();
