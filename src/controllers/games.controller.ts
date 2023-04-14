import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';

import * as jwt from 'jsonwebtoken';
import isEmpty from '../configs/string';

async function getGames(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance): Promise<void> {
    try {
        const { data } = await fastify.supabase.from('games').select();

        const sort: any = data?.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        });

        if (sort.comments && sort.comments.length > 0) {
            sort.comments = await transformComments(sort.comments, fastify);
        }
        return reply.status(200).send({ data: sort });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}


async function createGame(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance): Promise<void> {
    const body: any = request.body;
    const idToken = await getUserIdFromToken(request);

    const { title } = body;
    try {
        await fastify.supabase.from('games').insert({ title, played: false, creator: idToken });
        return reply.status(200).send({
            success: true,
            message: "Create game successfuly"
        });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}

async function updateGame(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance): Promise<void> {
    const idToken = await getUserIdFromToken(request);
    const { id }: any = request.params;
    const body = request.body;

    try {

        const { data }: any = await fastify.supabase.from('games').select().eq('id', id);
        const [firstEl] = data;
        if (idToken !== firstEl.creator) {
            return reply.status(500).send({
                success: false,
                message: "Unauthorized update game"
            });
        }
        await fastify.supabase.from('games').update(body).eq('id', id);

        return reply.status(200).send({
            success: true,
            message: "Update game successfuly"
        });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}


async function deleteGame(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance): Promise<void> {
    const { id }: any = request.params;

    const idToken = await getUserIdFromToken(request);

    try {
        const { data }: any = await fastify.supabase.from('games').select().eq('id', id);
        const [firstEl] = data;
        if (idToken !== firstEl.creator) {
            return reply.status(500).send({
                success: false,
                message: "Unauthorized delete game"
            });
        }
        await fastify.supabase.from('games').delete().eq('id', id);
        return reply.status(200).send({
            success: true,
            message: "Delete game successfuly"
        });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}


async function getGame(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance): Promise<void> {
    const { id }: any = request.params;
    try {
        const { data } = await fastify.supabase.from('games').select().eq('id', id);
        const [game]: any = data;

        if (game.comments && game.comments.length > 0) {
            game.comments = await transformComments(game.comments, fastify);
        }

        return reply.status(200).send(game);
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}


async function likeGame(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance): Promise<void> {
    const { id }: any = request.params;

    const idToken = await getUserIdFromToken(request);

    try {
        const { data } = await fastify.supabase.from('games').select().eq('id', id);
        const [game]: any = data;
        const liked = game.likes;

        if (isEmpty(liked)) {
            await fastify.supabase.from('games').update({ likes: [idToken] }).eq('id', id);
        } else {
            const index = liked.findIndex((id: any) => id === idToken);
            if (index === -1) {
                game.likes.push(idToken);
                await fastify.supabase.from('games').update(game).eq('id', id);
            } else {
                game.likes = game.likes.filter((id: any) => id !== idToken);
                await fastify.supabase.from('games').update(game).eq('id', id);
            }
        }

        return reply.status(200).send({
            game,
            success: true,
            message: "Like game successfuly"
        });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}


async function commentGame(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance): Promise<void> {

    const idToken = await getUserIdFromToken(request);

    const { id }: any = request.params;
    const body: any = request.body;
    const { comment } = body;

    try {
        const { data } = await fastify.supabase.from('games').select().eq('id', id);
        const [game]: any = data;

        const query = { id: idToken, comment: comment }
        const commentGame = game.comments;

        if (isEmpty(commentGame)) {
            await fastify.supabase.from('games').update({ comments: [query] }).eq('id', id);
        } else {
            game.comments.push(query);
            await fastify.supabase.from('games').update(game).eq('id', id);
        }

        return reply.status(200).send({
            game,
            success: true,
            message: "Comment game successfuly"
        });
    } catch (error) {
        return reply.status(500).send({ message: error });
    }
}


async function getUserIdFromToken(request: FastifyRequest): Promise<string> {
    let token: any = request.headers["x-access-token"] || request.headers["authorization"];
    token = token.slice(7);
    const decodedToken: any = jwt.decode(token);
    return decodedToken.id;
}
async function transformComments(comments: any[], fastify: FastifyInstance): Promise<any[]> {
    const transformedComments = [];
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const user = await fastify.supabase.from('user_login').select('name').eq('id', comment.id).single();
        if (user) {
            const { data: { name } }: any = user;
            transformedComments.push({ ...comment, name });
        }
    }
    return transformedComments;
}

export default {
    getGames,
    createGame,
    updateGame,
    deleteGame,
    getGame,
    likeGame,
    commentGame,
}