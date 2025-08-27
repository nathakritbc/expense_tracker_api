import 'dotenv/config';
import { ConfigModuleOptions } from '@nestjs/config';
import { Builder } from 'builder-pattern';

export const configModule = Builder<ConfigModuleOptions>()
  .envFilePath(['.env', '.env.development.local'])
  .isGlobal(true)
  .build();

export const nodeEnv = process.env.NODE_ENV ?? 'develop';
export const port = process.env.PORT ?? 7000;
export const defaultTimeZone = process.env.DEFAULT_TIME_ZONE ?? 'Asia/Bangkok';
