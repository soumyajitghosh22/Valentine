// Simple interaction and confetti. Editable message saved to localStorage.
(() => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const result = document.getElementById('result');
  const resultTitle = document.getElementById('resultTitle');
  const resultMsg = document.getElementById('resultMsg');
  const messageForm = document.getElementById('messageForm');
  const fromName = document.getElementById('fromName');
  const note = document.getElementById('note');
  const sendBtn = document.getElementById('sendBtn');
  const resetBtn = document.getElementById('resetBtn');
  const copyBtn = document.getElementById('copyBtn');
  const mailto = document.getElementById('mailto');
  const shareArea = document.getElementById('share');
  const confettiRoot = document.getElementById('confetti-root');

  // load saved if present
  const saved = JSON.parse(localStorage.getItem('valentine-msg') || 'null');
  if (saved) {
    fromName.value = saved.name || '';
    note.value = saved.note || '';
  }

  function showResult(title, msg) {
    resultTitle.textContent = title;
    resultMsg.textContent = msg;
    result.classList.remove('hidden');
  }

  function showMessageForm() {
    messageForm.classList.remove('hidden');
    messageForm.setAttribute('aria-hidden','false');
    shareArea.classList.remove('hidden');
  }

  yesBtn.addEventListener('click', () => {
    showResult("They said Yes! 💞", "Yay — a new chapter begins. Add your name and a sweet note below and share it!");
    showMessageForm();
    launchConfetti(110);
  });

  noBtn.addEventListener('click', () => {
    showResult("It’s okay 💛", "Not every love story starts today. You can always try again or send a friendly note.");
    messageForm.classList.add('hidden');
    shareArea.classList.remove('hidden');
    launchConfetti(20, {colors:['#FFD8B1','#F4C2C2']});
  });

  sendBtn.addEventListener('click', () => {
    const name = fromName.value.trim() || 'Someone special';
    const noteText = note.value.trim() || "Thinking of you 💌";
    localStorage.setItem('valentine-msg', JSON.stringify({name, note: noteText}));
    resultMsg.textContent = `Message saved — "${noteText}" — from ${name}.`;
    updateShareLink(name, noteText);
  });

  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('valentine-msg');
    fromName.value = '';
    note.value = '';
    resultMsg.textContent = 'Message reset.';
    updateShareLink('', '');
  });

  copyBtn.addEventListener('click', async () => {
    const name = fromName.value.trim() || 'Someone special';
    const noteText = note.value.trim() || "Thinking of you 💌";
    const text = `Will you be my Valentine?\n\n"${noteText}"\n— ${name}`;
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Copied!';
      setTimeout(()=> copyBtn.textContent = 'Copy message', 1500);
    } catch(e){ alert('Copy failed — you can select and copy manually.'); }
  });

  function updateShareLink(name, noteText){
    const subject = encodeURIComponent('A little Valentine 💌');
    const body = encodeURIComponent(`Will you be my Valentine?\n\n"${noteText}"\n— ${name}`);
    mailto.href = `mailto:?subject=${subject}&body=${body}`;
  }

  // Confetti: creates small divs with random colors and fall animation
  function launchConfetti(count = 60, opts = {}) {
    const colors = opts.colors || ['#ff6ea1','#ffd166','#ff9a9e','#f6c1ff','#ffe3f1','#ffb3d6'];
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i=0;i<count;i++){
      const el = document.createElement('div');
      el.className = 'confetti';
      const size = (Math.random()*10)+6;
      el.style.width = `${size}px`;
      el.style.height = `${Math.random()*12 + 8}px`;
      el.style.left = `${Math.random()*w}px`;
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.opacity = Math.random()*0.9 + 0.4;
      confettiRoot.appendChild(el);

      // animate using CSS transforms via requestAnimationFrame
      const rotation = (Math.random()*720)-360;
      const duration = Math.random()*2200 + 1200;
      const fall = h + 100 + Math.random()*200;
      const startX = parseFloat(el.style.left);
      const drift = (Math.random()-0.5) * 300;

      const start = performance.now();
      function frame(now){
        const t = Math.min(1, (now - start)/duration);
        el.style.transform = `translate3d(${drift*t}px, ${fall*t}px, 0) rotate(${rotation * t}deg)`;
        el.style.opacity = String(1 - t);
        if (t < 1) requestAnimationFrame(frame);
        else el.remove();
      }
      requestAnimationFrame(frame);
    }
  }

  // initialize share link from saved or empty
  updateShareLink((fromName.value||''), (note.value||''));
})();