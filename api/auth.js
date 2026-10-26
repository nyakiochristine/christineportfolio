import { randomBytes } from 'node:crypto';

const callbackUrl = process.env.GITHUB_OAUTH_CALLBACK_URL;

export default function handler(request, response) {
  if (!process.env.GITHUB_CLIENT_ID || !callbackUrl) {
    response.status(500).send('GitHub sign-in is not configured yet.');
    return;
  }

  const authorizationUrl = new URL('https://github.com/login/oauth/authorize');
  authorizationUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID);
  authorizationUrl.searchParams.set('redirect_uri', callbackUrl);
  authorizationUrl.searchParams.set('scope', 'repo,user');
  const state = randomBytes(24).toString('hex');
  authorizationUrl.searchParams.set('state', state);

  response.setHeader('Set-Cookie', `decap_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`);
  response.redirect(302, authorizationUrl.toString());
}
