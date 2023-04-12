import fp from 'fastify-plugin'

import * as jwt from 'jsonwebtoken';
const jwtSecret = 'secret';
const oneDay = 86400;

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  // Register JWT plugin
  fastify.decorate('jwtSign', (data: any) => jwt.sign(data, jwtSecret, { expiresIn: oneDay }));

  // Decorate fastify instance with jwtVerify method
  fastify.decorate('jwtVerify', (token: string) => {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (err) {
      return null;
    }
  });
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    jwtSign: (data: any) => string;
    jwtVerify: (token: string) => any | null;
  }
}