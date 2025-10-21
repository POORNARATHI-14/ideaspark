const form = document.getElementById('ideaForm');
const ideaCard = document.getElementById('ideaCard');
const title = document.getElementById('ideaTitle');
const desc = document.getElementById('ideaDesc');
const elevator = document.getElementById('ideaElevator');
const featuresEl = document.getElementById('ideaFeatures');
const stepsEl = document.getElementById('ideaSteps');
const impactEl = document.getElementById('ideaImpact');
const scoreEl = document.getElementById('ideaScore');
const saveBtn = document.getElementById('saveIdea');
const newBtn = document.getElementById('newIdea');
const clearBtn = document.getElementById('clearBtn');

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  try{
    const res = await fetch('/api/idea', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
    const json = await res.json();
    // populate UI
    title.textContent = json.title;
    elevator.textContent = json.elevator;
    desc.textContent = json.description;
    featuresEl.innerHTML='';
    json.features.forEach(f=>{
      const div = document.createElement('div'); div.className='feature-pill'; div.innerHTML = `<strong>${f.title}</strong><div style="font-size:0.9rem">${f.detail}</div>`;
      featuresEl.appendChild(div);
    });
    stepsEl.innerHTML=''; json.steps.forEach(s=>{ const li=document.createElement('li'); li.textContent=s; stepsEl.appendChild(li); });
    impactEl.textContent = json.impact;
    scoreEl.textContent = `Feasibility: ${json.feasibilityScore}%`;
    ideaCard.classList.remove('hidden');
    ideaCard.scrollIntoView({behavior:'smooth'});
    // save current idea to session for saving action
    sessionStorage.setItem('lastIdea', JSON.stringify(json));
  }catch(err){
    alert('Server error. Make sure you ran: npm install && npm start');
  }
});

saveBtn.addEventListener('click', ()=>{
  const last = sessionStorage.getItem('lastIdea');
  if(!last){ alert('No idea to save yet.'); return; }
  let saved = JSON.parse(localStorage.getItem('savedIdeas')||'[]');
  saved.push(JSON.parse(last));
  localStorage.setItem('savedIdeas', JSON.stringify(saved));
  alert('Idea saved to browser (Local Storage).');
});

newBtn.addEventListener('click', ()=>{
  ideaCard.classList.add('hidden');
  window.scrollTo({top:document.getElementById('demo').offsetTop - 60, behavior:'smooth'});
});

clearBtn.addEventListener('click', ()=>{ form.reset(); ideaCard.classList.add('hidden'); sessionStorage.removeItem('lastIdea'); });
