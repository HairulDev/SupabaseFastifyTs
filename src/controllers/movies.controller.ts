import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';

async function getMoviesHandler(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) {
    try {
        const data = await fastify.supabase.from('movies').select();
        return reply.status(200).send(data);
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}

async function createMovieHandler(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) {
    const body = request.body;
    try {
        await fastify.supabase.from('movies').insert(body);
        return reply.status(200).send({
            success: true,
            message: "Create movie successfuly"
        });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}

async function updateMovieHandler(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) {
    const { id }: any = request.params;

    const body = request.body;
    try {
        await fastify.supabase.from('movies').update(body).eq('id', id);
        return reply.status(200).send({
            success: true,
            message: "Update movie successfuly"
        });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}


async function deleteMovieHandler(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance) {
    const { id }: any = request.params;

    try {
        await fastify.supabase.from('movies').delete().eq('id', id);
        return reply.status(200).send({
            success: true,
            message: "Delete movie successfuly"
        });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}

export default {
    getMoviesHandler,
    createMovieHandler,
    updateMovieHandler,
    deleteMovieHandler
}