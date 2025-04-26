import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuthRedirect() {
      try {
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');

        if (!code) {
          console.error('No code found in URL.');
          return;
        }

        console.log('Authorization code:', code);

        // Send the code to your backend Lambda to exchange for token + get dashboard URL
        const response = await fetch('https://your-api-gateway-url/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });

        if (!response.ok) {
          throw new Error(`Failed to get dashboard URL: ${response.statusText}`);
        }

        const data = await response.json();
        const embedUrl = data.embed_url;

        console.log('Received QuickSight embed URL:', embedUrl);

        // Redirect user to the QuickSight dashboard
        window.location.href = embedUrl;

      } catch (error) {
        console.error('Login failed:', error);
      }
    }

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div>
      Logging you in...
    </div>
  );
}

export default Callback;
