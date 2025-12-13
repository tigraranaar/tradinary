import { z } from "zod";

const serverEnv = z.object({
  TRADING_SIGNALS_SERVICE_API_URL: z.url(),
  TRADING_SIGNALS_SERVICE_API_KEY: z.string().min(1),
});

const clientEnv = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const envSchema = serverEnv.extend(clientEnv.shape);

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const errorTree = z.treeifyError(parsedEnv.error);
  console.error("Invalid environment variables:", JSON.stringify(errorTree, null, 2));
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;

export type ServerEnv = z.infer<typeof serverEnv>;
export type ClientEnv = z.infer<typeof clientEnv>;
