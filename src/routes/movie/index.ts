
import { FastifyPluginAsync, } from 'fastify';

import moviesController from '../../controllers/movies.controller'; // Menggunakan alias moviesController untuk import dari movies.controller
const { getMoviesHandler, createMovieHandler, updateMovieHandler, deleteMovieHandler } = moviesController; // Destructure handler fungsi dari moviesController

const movie: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        return getMoviesHandler(request, reply, fastify);
    });

    fastify.post('/', async function (request, reply) {
        return createMovieHandler(request, reply, fastify);
    });

    fastify.put('/:id', async function (request, reply) {
        return updateMovieHandler(request, reply, fastify);
    });

    fastify.delete('/:id', async function (request, reply) {
        return deleteMovieHandler(request, reply, fastify);
    });
};

export default movie
