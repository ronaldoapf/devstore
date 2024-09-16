import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  APP_URL: z.string().url(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(
    'Invalid environment variables',
    _env.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables')
}

export const env = _env.data
