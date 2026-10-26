const callbackUrl = process.env.GITHUB_OAUTH_CALLBACK_URL;

const getCookie = (cookieHeader, name) => {
  const match = cookieHeader?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match?.[1];
};

function messagePage(status, token = '') {
  const payload = JSON.stringify({ token });
  return `<!doctype html><html><head><meta charset="utf-8"><title>Portfolio editor</title></head><body><p>${status === 'success' ? 'Signing you in…' : 'Unable to sign you in.'}</p><script>
    const receiveMessage = () => {
      window.opener.postMessage('authorization:github:${status}:${payload}', '*');
      window.removeEventListener('message', receiveMessage, false);
    };
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  </script></body></html>`;
}

export default async function handler(request, response) {
  const { code, state } = request.query;
  const expectedState = getCookie(request.headers.cookie, 'decap_oauth_state');
  if (!code || !state || state !== expectedState || !process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET || !callbackUrl) {
    response.status(400).send(messagePage('error'));
    return;
  }

  const githubResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: callbackUrl,
    }),
  });
  const data = await githubResponse.json();

  if (!githubResponse.ok || !data.access_token) {
    response.status(401).send(messagePage('error'));
    return;
  }
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('Set-Cookie', 'decap_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0');
  response.status(200).send(messagePage('success', data.access_token));
}
