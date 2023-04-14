
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';

import isEmpty from "../configs/string";
import * as bcrypt from 'bcrypt';

declare module 'bcrypt' {
    export function hashSync(data: string, saltOrRounds: number | string): string;
    export function compareSync(data: string, encrypted: string): boolean;
}


async function registerHandler(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) {
    const { email, name, password }: any = request.body;

    try {
        const { data } = await fastify.supabase.from('user_login').select().eq('email', email);
        if (!isEmpty(data)) return reply.status(401).send({ message: 'User has registered' });

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hashSync(password, saltRounds);
        const user = { email, name, password: hashedPassword };
        await fastify.supabase.from('user_login').insert(user);
        return reply.status(200).send({ message: "Register successfully", });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}


async function loginHandler(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) {
    const { email, password }: any = request.body;

    try {
        const { data } = await fastify.supabase.from('user_login').select().eq('email', email);
        const [firstElement]: any = data;

        if (isEmpty(firstElement)) {
            return reply.status(401).send({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compareSync(password, firstElement.password);
        if (!isPasswordCorrect) {
            return reply.status(401).send({ message: 'Incorrect password' });
        }
        const dataUser = { id: firstElement.id, email: firstElement.email, name: firstElement.name };
        const token = await fastify.jwtSign(dataUser);

        return reply.status(200).send({ token, user: dataUser });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}



export default { registerHandler, loginHandler };
