import fp from 'fastify-plugin'


const env = require('../configs/vars')

// Setup Supabase
// const { createClient } = require('@supabase/supabase-js');
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = env.supabaseUrl;
const supabaseKey = env.supabaseKey;
const supabaseClient = createClient(supabaseUrl, supabaseKey);
const supabaseAuth = supabaseClient.auth;




export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  // fastify.decorate('someSupport', function () {
  //   return 'hugs'
  // })

  fastify.decorate('supabase', supabaseClient);
  fastify.decorate('supabaseAuth', supabaseAuth);


})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
  }
}
