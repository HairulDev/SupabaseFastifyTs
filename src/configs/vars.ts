require("dotenv").config();

const supabaseUrl: string | undefined = process.env.SUPABASE_URL;
const supabaseKey: string | undefined = process.env.SUPABASE_API_KEY;
const discordId: string | undefined = process.env.DISCORD_ID;
const discordKey: string | undefined = process.env.DISCORD_PUBLIC_KEY;
const discordRedirects: string | undefined = process.env.DISCORD_REDIRECTS;

export {
    supabaseUrl,
    supabaseKey,
    discordId,
    discordKey,
    discordRedirects
};
