require("dotenv").config();

const supabaseUrl: string | undefined = 'https://wnpukijoybwfgrpearge.supabase.co';
const supabaseKey: string | undefined = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducHVraWpveWJ3ZmdycGVhcmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNDE2MTgsImV4cCI6MTk5NjcxNzYxOH0.B7-sjP0h-iXM0SPxBEHoS-P6R5kcPJnGYIiFnkkzw4w';
const discordId: string | undefined = '1095013857136738404';
const discordKey: string | undefined = 'e07713c69156487b0be6dcaac211c1c770ea93b76c80e5050dd4a70eb03935de';
const discordRedirects: string | undefined = 'https://wnpukijoybwfgrpearge.supabase.co/auth/v1/callback';
const jwtSecret: string | undefined = 'b3cEC/CpCKzAAbit38scC05HIUlToDPl1PpB7Qy0DydeTW26VwZSRvZkUFcS4WRWNpLqN1rLFdxtNEPQJODZ7g==';

export default {
    supabaseUrl,
    supabaseKey,
    discordId,
    discordKey,
    discordRedirects,
    jwtSecret
};
