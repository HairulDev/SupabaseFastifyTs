
import { FastifyPluginAsync, } from 'fastify';

import gamesController from '../../controllers/games.controller';
const { getGames, createGame, updateGame, deleteGame, getGame, likeGame, commentGame } = gamesController;

const game: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        return getGames(request, reply, fastify);
    });

    fastify.post('/createGame', async function (request, reply) {
        return createGame(request, reply, fastify);
    });

    fastify.put('/updateGame/:id', async function (request, reply) {
        return updateGame(request, reply, fastify);
    });

    fastify.delete('/deleteGame/:id', async function (request, reply) {
        return deleteGame(request, reply, fastify);
    });

    fastify.get('/:id', async function (request, reply) {
        return getGame(request, reply, fastify);
    });

    fastify.put('/likeGame/:id', async function (request, reply) {
        return likeGame(request, reply, fastify);
    });

    fastify.post('/commentGame/:id', async function (request, reply) {
        return commentGame(request, reply, fastify);
    });
};

export default game