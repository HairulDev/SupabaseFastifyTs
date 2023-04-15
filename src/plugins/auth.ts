import fp from 'fastify-plugin'



export default fp(async (fastify, opts) => {
    // Add an onRequest hook to verify the user's authentication status
    fastify.addHook('onRequest', async (request, reply) => {
        // Menyebutkan path/route yang ingin diabaikan dari hook
        const publicRoutes = ['/', '/user/login', '/user/register', '/game'];

        let token = request.headers["x-access-token"] || request.headers["authorization"];
        let currentUrl = request.url;

        if (publicRoutes.includes(currentUrl)) {
            return true;
        } else {
            if (!token) {
                reply.status(401).send({ message: 'Unauthorized' });
                return;
            }
            if (typeof token === 'string' && token.startsWith("Bearer ")) {
                token = token.slice(7);
                try {
                    await fastify.jwtVerify(token);
                } catch (err) {
                    return reply.status(401).send({ message: 'Authentication token is not valid' });
                }
            } else {
                return reply.status(401).send({
                    status: "ERROR",
                    statusCode: 401,
                    message: "Authentication token is not supplied.",
                    errors: [],
                });
            }
        }
    });

});
