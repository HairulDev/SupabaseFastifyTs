import { FastifyPluginAsync, } from 'fastify';
import { SupabaseClient } from '@supabase/supabase-js';


import userController from '../../controllers/user.controller';
const { registerHandler, loginHandler } = userController;

declare module 'fastify' {
    export interface FastifyInstance {
        supabase: SupabaseClient;
    }
}


const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/login', async function (request, reply) {
        return loginHandler(request, reply, fastify);
    });
    fastify.post('/register', async function (request, reply) {
        return registerHandler(request, reply, fastify);
    });

};

export default user