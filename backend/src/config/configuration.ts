export interface AppConfig {
  port: number;
  'url.frontend'?: string;
  'auth.jwt.secret'?: string;
  'auth.jwt.expiresInSeconds'?: number;
  'auth.github.clientId'?: string;
  'auth.github.clientSecret'?: string;
  'auth.github.callbackURL'?: string;
}

export default () => ({
  port: parseInt(process.env.PORT || '8080'),
  url: {
    frontend: 'http://localhost:3000',
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET as string,
      expiresInSeconds: parseInt(process.env.JWT_EXPIRATION_TIME_SECONDS ?? '900'),
    },
    github: {
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL as string,
    },
  },
});
