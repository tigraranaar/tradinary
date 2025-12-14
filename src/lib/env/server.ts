import { z } from "zod";

const serverSchema = z.object({
  TRADING_SIGNALS_SERVICE_API_URL: z.url(),
  TRADING_SIGNALS_SERVICE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export const env = serverSchema.parse(process.env);
