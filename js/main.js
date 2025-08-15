// ===== Nav active state (for safety if class not set) =====
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active');
  });
})();

// ===== Generic modal helpers =====
function openModal(id){ const m = document.getElementById(id); if(!m) return; m.setAttribute('aria-hidden','false'); }
function closeModal(id){ const m = document.getElementById(id); if(!m) return; const iframe = m.querySelector('iframe'); if(iframe) iframe.src = ''; m.setAttribute('aria-hidden','true'); }

// Close modal on [x] or backdrop
document.addEventListener('click', e=>{
  if(e.target.matches('[data-close]')){
    const modal = e.target.closest('.modal') || document.querySelector('.modal[aria-hidden="false"]');
    if(modal){ closeModal(modal.id); }
  }
});

  openers.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.article;
      const a = articles[id];
      if(!a) return;
      container.innerHTML = `
        <header style="padding:18px 22px;border-bottom:1px solid #2a2a2b">
          <h2 style="margin:.2rem 0;font-family:'Playfair Display',serif">${a.title}</h2>
          <p class="muted" style="margin:0">By ${a.author}</p>
        </header>
        <div style="padding:18px 22px">${a.body}</div>
      `;
      openModal(modalId);
    });
  });
})();

// ===== Games: Word Scramble =====
(function(){
  const words = ['homework','cafeteria','science','library','debate','project','innovation','deadline','magazine','article'];
  const out = document.getElementById('scrambled');
  const input = document.getElementById('guess');
  const check = document.getElementById('checkGuess');
  const newBtn = document.getElementById('newWord');
  const result = document.getElementById('scrambleResult');
  if(!out) {
    console.error("Scrambled word element not found!");
    return;
  }
  let current='';

  function shuffle(str){
    return str.split('').sort(()=>Math.random()-0.5).join('');
  }
  function newWord(){
    current = words[Math.floor(Math.random()*words.length)];
    let s = shuffle(current);
    while(s===current){ s = shuffle(current); }
    out.textContent = s.toUpperCase();
    input.value=''; 
    result.textContent='';
  }
  newWord();

  check?.addEventListener('click', ()=>{
    if(input.value.trim().toLowerCase() === current){
      result.textContent = 'Correct 🎉'; 
    } else {
      result.textContent = 'Try again 👀';
    }
  });
  newBtn?.addEventListener('click', newWord);
})();

// ===== Games: Mini Crossword (toy) =====
(function(){
  const btn = document.getElementById('checkCrossword');
  const res = document.getElementById('crosswordResult');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    const cells = Array.from(document.querySelectorAll('.crossword input')).map(i=>i.value.toLowerCase());
    // simple checker for a made-up solution: row1 = "win", col2 = "math", diag "recess" -> minimal toy check
    const okRow1 = (cells[0]+cells[1]+cells[2]) === 'win';
    const okCol2 = (cells[1]+cells[4]+cells[7]).startsWith('mat'); // relaxed
    const okDiag = (cells[0]+cells[4]+cells[8]).startsWith('rec'); // relaxed
    res.textContent = (okRow1 && okCol2 && okDiag) ? 'Nice! ✅' : 'Not quite. Keep going.';
  });
})();
