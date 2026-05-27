import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Explicitly pull variables out of your .env file
dotenv.config();

export default defineConfig({
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL,
  },
});