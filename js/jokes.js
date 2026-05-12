// jokes.js - Random Joke Generator
document.addEventListener('DOMContentLoaded', () => {
  const getJokeBtn = document.getElementById('getJokeBtn');
  const copyBtn = document.getElementById('copyBtn');
  const shareBtn = document.getElementById('shareBtn');
  const apiSelect = document.getElementById('apiSelect');
  const jokeSetup = document.getElementById('jokeSetup');
  const jokePunchline = document.getElementById('jokePunchline');

  async function fetchOfficialJoke() {
    // Official Joke API returns {setup, punchline}
    const url = 'https://official-joke-api.appspot.com/random_joke';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch from Official Joke API');
    return await res.json();
  }

  async function fetchIcanhazJoke() {
    const url = 'https://icanhazdadjoke.com/';
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error('Failed to fetch from icanhazdadjoke');
    return await res.json();
  }

  function renderJoke(text, punch = '') {
    if (punch) {
      jokeSetup.textContent = text;
      jokePunchline.textContent = punch;
    } else {
      jokeSetup.textContent = text;
      jokePunchline.textContent = '';
    }
  }

  async function getJoke() {
    getJokeBtn.disabled = true;
    getJokeBtn.textContent = 'Loading...';
    try {
      if (apiSelect.value === 'official') {
        const data = await fetchOfficialJoke();
        renderJoke(data.setup || data.joke || '', data.punchline || '');
      } else {
        const data = await fetchIcanhazJoke();
        renderJoke(data.joke || data.title || 'No joke found');
      }
    } catch (err) {
      renderJoke('Sorry, could not load a joke right now.');
      console.error(err);
    } finally {
      getJokeBtn.disabled = false;
      getJokeBtn.textContent = 'Get Joke';
    }
  }

  getJokeBtn.addEventListener('click', getJoke);

  copyBtn.addEventListener('click', () => {
    const text = jokePunchline.textContent ? `${jokeSetup.textContent}\n${jokePunchline.textContent}` : jokeSetup.textContent;
    if (!text) return alert('No joke to copy');
    navigator.clipboard.writeText(text).then(() => {
      alert('Joke copied to clipboard');
    }).catch(err => {
      console.error(err);
      alert('Could not copy');
    });
  });

  shareBtn.addEventListener('click', async () => {
    const text = jokePunchline.textContent ? `${jokeSetup.textContent}\n${jokePunchline.textContent}` : jokeSetup.textContent;
    if (!text) return alert('No joke to share');
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Funny Joke', text });
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Web Share API not available in this browser. Copy the joke instead.');
    }
  });
});
