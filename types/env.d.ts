declare namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    AUTH_SECRET: string;
    AUTH_GITHUB_ID: string;
    AUTH_GITHUB_SECRET: string;
    AUTH_GITHUB_CALLBACK_URL: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    AUTH_GOOGLE_CALLBACK_URL: string;
    DATABASE_URL: string;
    UPLOADTHING_TOKEN: string;
    ARCJET_KEY: string;
    // Add other environment variables here
    NEXT_PUBLIC_BACKEND_URL: string;
  }
}
