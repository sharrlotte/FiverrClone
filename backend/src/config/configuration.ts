export interface AppConfig {
  port: number;
  'url.frontend'?: string;
  'auth.jwt.secret'?: string;
  'auth.jwt.expiresInSeconds'?: number;
  'auth.github.clientId'?: string;
  'auth.github.clientSecret'?: string;
  'auth.github.callbackURL'?: string;
  'cloudinary.secret': string;
  'cloudinary.key': string;
  'cloudinary.cloudName': string;
  'transport.host': string;
  'transport.user': string;
  'transport.password': string;
  'transport.from': string;
}

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

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
  cloudinary: {
    secret: process.env.CLOUDINARY_SECRET as string,
    key: process.env.CLOUDINARY_KEY as string,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  },
  transport: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
  },
});
