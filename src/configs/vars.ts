require("dotenv").config();

const supabaseUrl: string | undefined = process.env.SUPABASE_URL;
const supabaseKey: string | undefined = process.env.SUPABASE_API_KEY;
const discordId: string | undefined = process.env.DISCORD_ID;
const discordKey: string | undefined = process.env.DISCORD_PUBLIC_KEY;
const discordRedirects: string | undefined = process.env.DISCORD_REDIRECTS;
const jwtSecret: string | undefined = process.env.JWT_SECRET;

export default {
    supabaseUrl,
    supabaseKey,
    discordId,
    discordKey,
    discordRedirects,
    jwtSecret
};
