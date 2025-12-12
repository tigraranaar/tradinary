import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
}

export function createServerSupabaseClient() {
    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });
}

export async function verifyAuth(authHeader: string | null) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { user: null, error: 'Missing or invalid authorization header' };
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createServerSupabaseClient();

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return { user: null, error: error?.message || 'Invalid token' };
        }

        return { user, error: null };
    } catch {
        return { user: null, error: 'Authentication failed' };
    }
}

export async function getUserFromRequest(request: Request) {
    const authHeader = request.headers.get('Authorization');
    return verifyAuth(authHeader);
}
