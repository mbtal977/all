const state = {
  posts: [],
  companies: [],
  projects: [],
  tasks: [],
  memory: []
};

const views = {
  home: () => `
    <section class="section">
      <h2>Hybrid Feed</h2>
      <p class="muted">Post updates and retain searchable history.</p>
      <textarea id="postInput" placeholder="Share update..."></textarea>
      <button class="primary" id="postBtn">Create Post</button>
      <ul class="list" id="postList">${state.posts.map(p => `<li>${p}</li>`).join('')}</ul>
    </section>
  `,
  network: () => `<section class="section"><h2>Network</h2><p class="muted">People, companies, and opportunities feed.</p></section>`,
  workspace: () => `
    <section class="section grid2">
      <div>
        <h3>Create Company</h3>
        <input id="companyName" placeholder="Company name" />
        <button class="primary" id="companyBtn">Create</button>
      </div>
      <div>
        <h3>Companies</h3>
        <ul class="list">${state.companies.map(c => `<li>${c}</li>`).join('')}</ul>
      </div>
    </section>
  `,
  projects: () => `
    <section class="section grid2">
      <div>
        <h3>Create Project</h3>
        <input id="projectTitle" placeholder="Project title" />
        <button class="primary" id="projectBtn">Create</button>
      </div>
      <div>
        <h3>Projects</h3>
        <ul class="list">${state.projects.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>
    </section>
  `,
  tasks: () => `
    <section class="section grid2">
      <div>
        <h3>Create Task</h3>
        <input id="taskTitle" placeholder="Task title" />
        <select id="taskStatus"><option>todo</option><option>in_progress</option><option>done</option></select>
        <button class="primary" id="taskBtn">Create</button>
      </div>
      <div>
        <h3>Tasks</h3>
        <ul class="list">${state.tasks.map(t => `<li>${t.title} (${t.status})</li>`).join('')}</ul>
      </div>
    </section>
  `,
  memory: () => `
    <section class="section">
      <h2>Memory Threads</h2>
      <input id="memorySearch" placeholder="Search memory..." />
      <ul class="list" id="memoryResults">${state.memory.map(m => `<li>${m}</li>`).join('')}</ul>
    </section>
  `,
  handover: () => `
    <section class="section">
      <h2>Handover Studio v1</h2>
      <p class="muted">Generate package from project + tasks context.</p>
      <button class="primary" id="handoverBtn">Generate Demo Package</button>
      <pre id="handoverOut"></pre>
    </section>
  `
};

let current = 'home';
const main = document.getElementById('main');

function render(){
  main.innerHTML = views[current]();
  bindViewHandlers();
}

function addMemory(text){ state.memory.unshift(text); }

function bindViewHandlers(){
  const postBtn = document.getElementById('postBtn');
  if (postBtn) postBtn.onclick = () => {
    const t = document.getElementById('postInput').value.trim();
    if (!t) return;
    state.posts.unshift(t); addMemory(`Post: ${t}`); render();
  };

  const companyBtn = document.getElementById('companyBtn');
  if (companyBtn) companyBtn.onclick = () => {
    const t = document.getElementById('companyName').value.trim();
    if (!t) return;
    state.companies.unshift(t); addMemory(`Company created: ${t}`); render();
  };

  const projectBtn = document.getElementById('projectBtn');
  if (projectBtn) projectBtn.onclick = () => {
    const t = document.getElementById('projectTitle').value.trim();
    if (!t) return;
    state.projects.unshift(t); addMemory(`Project created: ${t}`); render();
  };

  const taskBtn = document.getElementById('taskBtn');
  if (taskBtn) taskBtn.onclick = () => {
    const title = document.getElementById('taskTitle').value.trim();
    const status = document.getElementById('taskStatus').value;
    if (!title) return;
    state.tasks.unshift({ title, status }); addMemory(`Task: ${title} (${status})`); render();
  };

  const memorySearch = document.getElementById('memorySearch');
  if (memorySearch) memorySearch.oninput = (e) => {
    const q = e.target.value.toLowerCase();
    const r = state.memory.filter(m => m.toLowerCase().includes(q));
    document.getElementById('memoryResults').innerHTML = r.map(x => `<li>${x}</li>`).join('');
  };

  const handoverBtn = document.getElementById('handoverBtn');
  if (handoverBtn) handoverBtn.onclick = () => {
    const pack = {
      project: state.projects[0] || 'N/A',
      tasks: state.tasks.slice(0, 5),
      memory_highlights: state.memory.slice(0, 8),
      generated_at: new Date().toISOString()
    };
    document.getElementById('handoverOut').textContent = JSON.stringify(pack, null, 2);
  };
}

document.querySelectorAll('.nav').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.nav').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    current = btn.dataset.view;
    render();
  };
});

const askBtn = document.getElementById('askBtn');
askBtn.onclick = () => {
  const q = document.getElementById('aiInput').value.trim();
  const out = {
    question: q,
    answer: `Found ${state.memory.length} memory items and ${state.tasks.length} tasks in scope.`,
    recommendations: [
      'Prioritize overdue tasks',
      'Assign owner to blockers',
      'Generate handover package before transition'
    ]
  };
  document.getElementById('aiOut').textContent = JSON.stringify(out, null, 2);
};

render();
