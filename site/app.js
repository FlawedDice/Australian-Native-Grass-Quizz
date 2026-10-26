(() => {
  const CONFIG = { autoAdvance: false, matchCount: 3, showBotanical: true };

  const AX = ['water', 'tempo', 'company', 'fire', 'season', 'stature'];
  const AXM = {
    water: { name: 'Water', left: 'Arid', right: 'Wet', notes: ['Thrives on very little', 'Takes what comes', 'Wants it wet'] },
    tempo: { name: 'Tempo', left: 'Slow & steady', right: 'Quick to act', notes: ['In it for decades', 'Measured pace', 'First off the mark'] },
    company: { name: 'Company', left: 'Solitary', right: 'Social', notes: ['Keeps to itself', 'A few close neighbours', 'Spreads into everyone'] },
    fire: { name: 'Fire', left: 'Fire-shy', right: 'Fire-forged', notes: ['Avoids the heat', 'Recovers in time', 'Comes back stronger'] },
    season: { name: 'Season', left: 'Cool-season', right: 'Warm-season', notes: ['Grows in the cool months', 'Shoulder seasons', 'Loves the summer heat'] },
    stature: { name: 'Stature', left: 'Low', right: 'Tall', notes: ['Close to the ground', 'Mid-height', 'Stands above the rest'] }
  };

  const SCENES = {
    plains: { sky: '#e3e6dc', sky2: '#f2ede1', h1: '#a9a06a', h2: '#c3b884', h3: '#dcd2a9', sun: '#fff8e8', dot: '#a9a06a' },
    forest: { sky: '#d6e2dc', sky2: '#eef0e8', h1: '#6f8c76', h2: '#93ab92', h3: '#bccab3', sun: '#fbf6ea', dot: '#6f8c76' },
    arid: { sky: '#f1d9bf', sky2: '#f6e8d6', h1: '#b8734a', h2: '#c98a5a', h3: '#dcae80', sun: '#fbefe0', dot: '#c47a4c' },
    coast: { sky: '#cfdee4', sky2: '#eef2ef', h1: '#e3d2ae', h2: '#a8c2c8', h3: '#efe2c8', sun: '#fffaf0', dot: '#7fa3ad' },
    dusk: { sky: '#ecd3cd', sky2: '#f5e9e2', h1: '#a58d88', h2: '#c3a9a2', h3: '#dcc4b3', sun: '#fdf3ec', dot: '#c48f86' }
  };
  const HERO_SCENE = 'radial-gradient(circle at 80% 26%, #fff8ea 0 6%, transparent 6.4%), radial-gradient(70% 20% at 18% 100%, #a9a06a 98%, transparent 100%), radial-gradient(75% 17% at 84% 100%, #93ab92 98%, transparent 100%), radial-gradient(130% 28% at 50% 108%, #d8cfa6 98%, transparent 100%), radial-gradient(90% 24% at 30% 100%, #e8c9a6 98%, transparent 100%), linear-gradient(180deg, #e3d6cb 0%, #efe6da 55%, #f3eee4 100%)';

  function scene(key) {
    const s = SCENES[key];
    return `radial-gradient(circle at 76% 30%, ${s.sun} 0 8%, transparent 8.4%), radial-gradient(70% 36% at 20% 100%, ${s.h1} 98%, transparent 100%), radial-gradient(78% 32% at 84% 100%, ${s.h2} 98%, transparent 100%), radial-gradient(130% 52% at 50% 114%, ${s.h3} 98%, transparent 100%), linear-gradient(180deg, ${s.sky} 0%, ${s.sky2} 100%)`;
  }

  const G = [
    { id: 'kangaroo', name: 'Kangaroo Grass', bot: 'Themeda triandra', badge: 'The Returner', sc: 'plains', v: [.45, .45, .6, .95, .9, .7],
      epi: 'You come back stronger after the hard years.', blurb: 'Kangaroo Grass once covered much of the continent and still turns whole hillsides rust-red in summer. It relies on fire to clear old growth and resprouts quickly afterwards. People with this sign are resilient, warm in company, and a little suspicious of anyone who has never been tested.',
      habitat: 'Grasslands & woodlands, every state', height: 'Up to 1.5 m', flower: 'Summer', form: 'Warm-season tussock',
      traits: ['Treats setbacks as a fresh start', 'Comfortable in a crowd, never dependent on it', 'Turns heads in late summer'], strength: 'Resilience under pressure', shadow: 'Mistaking hardship for virtue', prompt: 'What was the hardest year that ended up being good for you?' },
    { id: 'weeping', name: 'Weeping Grass', bot: 'Microlaena stipoides', badge: 'The Quiet Anchor', sc: 'forest', v: [.7, .5, .8, .2, .15, .3],
      epi: 'You do your best work where nobody thought to look.', blurb: 'Weeping Grass grows in the shade of eucalypt forests, staying green almost all year and holding slopes together. Its fine seed heads droop softly. This sign is the dependable one: gentle, adaptable, and the reason the group stays intact.',
      habitat: 'Shaded forest & lawns, eastern Australia', height: 'Up to 0.7 m', flower: 'Spring to autumn', form: 'Cool-season, spreading',
      traits: ['Happy outside the spotlight', 'Binds a group together without leading it', 'Slow to say no'], strength: 'Steady, quiet reliability', shadow: 'Being taken for granted', prompt: 'Who do you rely on that probably doesn’t know it?' },
    { id: 'triodia', name: 'Hummock Spinifex', bot: 'Triodia basedowii', badge: 'The Ascetic', sc: 'arid', v: [.05, .15, .35, .8, .9, .4],
      epi: 'You need almost nothing, and you won’t be moved.', blurb: 'Hummock Spinifex forms spiky domes and rings across the red sandplains, some growing outward for decades. Its resin was traditionally used as an adhesive. This sign is prickly on approach, deeply self-sufficient, and loyal for life once you’re in.',
      habitat: 'Sandplains of the arid interior', height: 'Hummocks to 1 m', flower: 'After rain', form: 'Warm-season hummock',
      traits: ['Survives on a rumour of water', 'Spiny outside, warm inside', 'Thinks in decades, not weeks'], strength: 'Total self-sufficiency', shadow: 'Holding people at arm’s length', prompt: 'What could you happily live without for a year?' },
    { id: 'wallaby', name: 'Wallaby Grass', bot: 'Rytidosperma caespitosum', badge: 'The Early Riser', sc: 'dusk', v: [.35, .65, .55, .45, .15, .3],
      epi: 'You’re already up, already useful, already halfway there.', blurb: 'Wallaby Grass greens up early in the cool season, before most others have started, and its fluffy seed heads catch the light on roadsides. This sign is cheerful, eager and first to volunteer.',
      habitat: 'Temperate grasslands, south-east', height: 'Up to 0.6 m', flower: 'Spring', form: 'Cool-season tussock',
      traits: ['First to show up', 'Makes the most of poor ground', 'Generous with energy, careless with rest'], strength: 'Optimism and initiative', shadow: 'Filling every silence', prompt: 'What do you always volunteer for?' },
    { id: 'mitchell', name: 'Mitchell Grass', bot: 'Astrebla lappacea', badge: 'The Long-Hauler', sc: 'arid', v: [.15, .3, .7, .45, .85, .55],
      epi: 'You keep the promise you made in a better year.', blurb: 'Mitchell Grass covers the cracking clay downs of the inland and survives long droughts on deep roots, greening again when the wet arrives. This sign is steady, reliable and endlessly patient.',
      habitat: 'Clay downs of inland QLD, NT & NSW', height: 'Up to 0.8 m', flower: 'Summer, after rain', form: 'Warm-season tussock',
      traits: ['Roots deeper than the drought is long', 'Holds a whole community in place', 'Slow to change, changes for good'], strength: 'Endurance', shadow: 'Staying too long', prompt: 'What’s something you’ve stuck with far longer than most people would?' },
    { id: 'poa', name: 'Common Tussock Grass', bot: 'Poa labillardierei', badge: 'The Homebody', sc: 'forest', v: [.75, .25, .2, .35, .1, .8],
      epi: 'You keep your own edges, and keep them well.', blurb: 'Common Tussock Grass forms large blue-grey clumps along creeks and damp flats, sheltering small animals between them. This sign is self-contained and formidable, happiest in one place done properly.',
      habitat: 'Creek banks & damp flats, SE Aus & Tas', height: 'Up to 1.2 m', flower: 'Spring to summer', form: 'Cool-season tussock',
      traits: ['Dense at the centre, calm at the edge', 'Shelters others without announcing it', 'Prefers depth to breadth'], strength: 'Grounded presence', shadow: 'Boundaries that become walls', prompt: 'Where is the one place you feel most like yourself?' },
    { id: 'bluegrass', name: 'Queensland Bluegrass', bot: 'Dichanthium sericeum', badge: 'The Charmer', sc: 'plains', v: [.4, .7, .65, .6, .85, .55],
      epi: 'You make the whole paddock look like it planned itself.', blurb: 'Queensland Bluegrass has soft, silvery-blue seed heads and is prized by graziers for being palatable and quick to establish. This sign is likeable, quick to settle in and good at first impressions.',
      habitat: 'Eastern & northern grasslands', height: 'Up to 1 m', flower: 'Summer to autumn', form: 'Warm-season tussock',
      traits: ['Settles in anywhere, fast', 'Liked by almost everyone', 'Needs honest friends'], strength: 'Effortless charm', shadow: 'Spreading wide, rooting shallow', prompt: 'What’s your go-to first-day-somewhere-new move?' },
    { id: 'barbed', name: 'Barbed Wire Grass', bot: 'Cymbopogon refractus', badge: 'The Contrarian', sc: 'dusk', v: [.35, .5, .15, .7, .8, .7],
      epi: 'You point in a direction nobody else agreed on.', blurb: 'Barbed Wire Grass holds its seed heads out at sharp, zig-zag angles and smells of lemon when crushed. Stock tend to leave it alone. This sign is principled, distinctive and a little awkward on purpose.',
      habitat: 'Open forest & dry hillsides, east coast', height: 'Up to 1.5 m', flower: 'Summer', form: 'Warm-season, aromatic',
      traits: ['Recognisable from fifty metres', 'Gets more interesting under pressure', 'Stands longest when others are gone'], strength: 'Independent thinking', shadow: 'Disagreeing on reflex', prompt: 'What popular opinion do you quietly disagree with?' },
    { id: 'windmill', name: 'Windmill Grass', bot: 'Chloris truncata', badge: 'The Opportunist', sc: 'plains', v: [.25, .95, .45, .45, .75, .25],
      epi: 'You arrive the moment the ground opens up.', blurb: 'Windmill Grass colonises bare ground quickly, and its spoked seed heads snap off and tumble away in the wind. This sign thrives on new beginnings and gets restless once things settle.',
      habitat: 'Open & disturbed ground, inland', height: 'Up to 0.5 m', flower: 'Spring to autumn', form: 'Warm-season, short-lived',
      traits: ['Spots a gap before anyone else', 'Packs light, travels often', 'Rarely there for the slow middle'], strength: 'Speed and adaptability', shadow: 'Leaving before the hard part', prompt: 'What’s the fastest decision you’ve ever made?' },
    { id: 'plume', name: 'Long-hair Plume Grass', bot: 'Dichelachne crinita', badge: 'The Romantic', sc: 'forest', v: [.5, .7, .35, .3, .2, .65],
      epi: 'You have never once entered a room quietly.', blurb: 'Long-hair Plume Grass lifts soft, feathery seed heads high above its leaves, glowing when backlit. This sign is expressive, sentimental and sincere about all of it.',
      habitat: 'Open forest & grassland, south & east', height: 'Up to 1 m', flower: 'Spring to summer', form: 'Cool-season tussock',
      traits: ['Expressive well beyond requirement', 'Notices beauty in small things', 'Bends in a hard wind'], strength: 'Openness and warmth', shadow: 'Taking things to heart', prompt: 'What’s the most beautiful ordinary thing you saw this week?' },
    { id: 'spear', name: 'Rough Spear Grass', bot: 'Austrostipa scabra', badge: 'The Straight Shooter', sc: 'dusk', v: [.2, .55, .3, .55, .2, .45],
      epi: 'You say the thing, and you’re usually right.', blurb: 'Rough Spear Grass grows in dry temperate country, and its sharp, twisting seeds drill themselves into the soil. This sign is direct, tough and gets to the point quickly.',
      habitat: 'Dry temperate & semi-arid southern Aus', height: 'Up to 0.8 m', flower: 'Spring', form: 'Cool-season tussock',
      traits: ['Gets to the point', 'Thrives where it’s dry and tough', 'Sticks with you, for better or worse'], strength: 'Honesty', shadow: 'Sharper than intended', prompt: 'What’s the most useful blunt advice you’ve been given?' },
    { id: 'beach', name: 'Beach Spinifex', bot: 'Spinifex sericeus', badge: 'The Connector', sc: 'coast', v: [.6, .6, .95, .15, .85, .25],
      epi: 'You’re everywhere at once, holding it all together.', blurb: 'Beach Spinifex sends long silver runners across coastal foredunes, binding the sand, and its round seed heads roll along the beach in the wind. This sign is social, easygoing and three degrees from everyone.',
      habitat: 'Coastal foredunes, east, south & west', height: 'Up to 0.3 m', flower: 'Spring to summer', form: 'Warm-season, running',
      traits: ['Knows everyone, somehow', 'Thrives in salt, sun and wind', 'Hard to pin to one place'], strength: 'Bringing people together', shadow: 'Spread too thin', prompt: 'Who’s the most unexpected connection in your life?' }
  ];

  const Q = [
    { k: 'Morning', p: 'The alarm goes off. What happens next?', s: 'Be honest, nobody is watching.', o: [
      ['Up before it finished ringing', 'The day is already underway', { tempo: .85, season: .3 }],
      ['Snooze, and then snooze again', 'Good things are not rushed', { tempo: .2 }]] },
    { k: 'Drought', p: 'It hasn’t rained in nine weeks.', s: 'The tank is low and the forecast is a rumour.', o: [
      ['Dig in and wait it out', 'Roots down, growth paused', { water: .1, tempo: .2, season: .8 }],
      ['Conserve everything, change nothing', 'Hold the line', { water: .3, stature: .55 }],
      ['Act fast before it gets worse', 'Make a move while you can', { water: .3, tempo: .9 }],
      ['Go where the water still is', 'Thirst is not a personality', { water: .85, company: .6 }]] },
    { k: 'Company', p: 'Your ideal Saturday night.', s: 'Pick the one that sounds like a recharge.', o: [
      ['A quiet night on my own', 'Just me and my thoughts', { company: .1 }],
      ['Dinner with two or three close friends', 'Small and good', { company: .45 }],
      ['A big gathering, the more the merrier', 'Bring everyone', { company: .95 }]] },
    { k: 'Fire', p: 'A bushfire passes through your paddock.', s: 'It’s over in minutes. The smoke takes an hour to clear.', o: [
      ['Resprout greener within a fortnight', 'This is what I’m built for', { fire: .95 }],
      ['Lose a season but keep my roots', 'Down, not out', { fire: .55, tempo: .35 }],
      ['I was somewhere it couldn’t reach', 'Wet feet, lucky address', { fire: .1, water: .75 }],
      ['Burn bright and take the shrubs with me', 'If it’s happening, it’s happening', { fire: .85, stature: .75 }]] },
    { k: 'Season', p: 'Which time of year feels most like you?', s: 'When do you do your best growing?', o: [
      ['Crisp, frosty winter mornings', 'Jumpers and clear skies', { season: .05 }],
      ['Mild spring days', 'Everything just starting', { season: .3 }],
      ['Long, hot summer afternoons', 'The hotter the better', { season: .95 }],
      ['The humid build-up before the wet', 'Heavy air, storms on the way', { season: .8, water: .65 }]] },
    { k: 'Country', p: 'Where would you put down roots?', s: 'Not the holiday. The home.', o: [
      ['Red sand under a huge sky', 'Space and silence', { water: .05, company: .3 }],
      ['Open plains that go to the horizon', 'Big skies, hard work', { water: .25, company: .7 }],
      ['A shady gully with a creek in it', 'Green all year round', { water: .75, company: .5 }],
      ['Sand dunes by the ocean', 'Salt air, always moving', { water: .6, company: .9 }]] },
    { k: 'Stature', p: 'In the group photo, you’re…', s: 'Where do you naturally end up?', o: [
      ['Back row, standing tall', 'Seen above the crowd', { stature: .9 }],
      ['Somewhere in the middle', 'Part of it all', { stature: .5 }],
      ['Front, kneeling down', 'Low-key and close to the ground', { stature: .2 }]] },
    { k: 'First impressions', p: 'A stranger strikes up a conversation.', s: 'How do you meet them?', o: [
      ['Guarded at first, warm once I know them', 'Trust is earned', { company: .25, fire: .65 }],
      ['Open straight away', 'Come on in', { company: .8, fire: .3 }]] },
    { k: 'Opportunity', p: 'An exciting opportunity comes up out of nowhere.', s: 'It means changing your plans.', o: [
      ['Yes, immediately', 'I’ll figure it out on the way', { tempo: .95 }],
      ['Try a small version first', 'Test the ground', { tempo: .55 }],
      ['Sit with it for a while', 'Good things wait', { tempo: .2 }]] },
    { k: 'Legacy', p: 'Fifty years from now, what’s your mark?', s: 'Last one. Think big.', o: [
      ['Something that slowly grew wider every year', 'Patience, compounded', { tempo: .1, water: .1 }],
      ['A community that held together because of me', 'Quiet, but essential', { company: .85, water: .65 }],
      ['A trail of adventures in a hundred places', 'Seeds on the wind', { tempo: .9, company: .5 }],
      ['One place, made truly my own', 'Deep, not wide', { company: .2, stature: .8 }]] }
  ];

  // ---------- Scoring ----------
  function compat(a, b) {
    const sim = AX.map((_, i) => 1 - Math.abs(a.v[i] - b.v[i]));
    const harmony = (sim[1] + sim[2]) / 2;
    const ground = (sim[0] + sim[4]) / 2;
    const spark = Math.min(1, .3 + ((1 - sim[3]) + (1 - sim[5])) / 2 * 1.4);
    const overall = Math.round((harmony * .4 + ground * .4 + spark * .2) * 100);
    return { sim, harmony, ground, spark, overall };
  }
  function verdict(n) {
    if (n >= 85) return 'Same paddock, same rain';
    if (n >= 75) return 'Grow well together';
    if (n >= 62) return 'Worth the negotiation';
    return 'Separate paddocks';
  }
  function heat(n) {
    const t = Math.max(0, Math.min(1, (n - 45) / 50));
    const stops = [[236, 211, 205], [239, 230, 212], [169, 187, 163], [93, 124, 104]];
    const seg = Math.min(2, Math.floor(t * 3)), lt = t * 3 - seg;
    const c = stops[seg].map((v, i) => Math.round(v + (stops[seg + 1][i] - v) * lt));
    return { bg: `rgb(${c.join(',')})`, fg: t > .72 ? '#fbf8f1' : '#2c3a30' };
  }
  const pct = x => `${Math.round(x * 100)}%`;
  const dotPos = x => `calc(${(x * 100).toFixed(1)}% - 8px)`;
  const byId = id => G.find(g => g.id === id) || G[0];
  const ranked = g => G.filter(x => x.id !== g.id).map(x => ({ g: x, c: compat(g, x) })).sort((a, b) => b.c.overall - a.c.overall);

  function matchAnswers() {
    const acc = {}, n = {};
    AX.forEach(a => { acc[a] = 0; n[a] = 0; });
    Object.keys(state.answers).forEach(qi => {
      const eff = Q[qi].o[state.answers[qi]][2];
      Object.keys(eff).forEach(a => { acc[a] += eff[a]; n[a]++; });
    });
    const me = AX.map(a => n[a] ? acc[a] / n[a] : .5);
    const w = AX.map(a => n[a] ? 1 : .2);
    let best = G[0], bd = Infinity;
    G.forEach(g => {
      const d = g.v.reduce((s, v, i) => s + w[i] * (v - me[i]) ** 2, 0);
      if (d < bd) { bd = d; best = g; }
    });
    return best;
  }

  // ---------- State ----------
  const state = { screen: 'landing', qi: 0, answers: {}, resultId: null, profileId: 'kangaroo', cA: 'kangaroo', cB: 'wallaby' };
  const $app = document.getElementById('app');
  const $nav = document.getElementById('nav');
  let lastKey = '';
  let lastAnswered = 0;

  function set(patch, scroll) {
    Object.assign(state, patch);
    render();
    if (scroll) window.scrollTo(0, 0);
  }

  // ---------- Partials ----------
  const bot = g => CONFIG.showBotanical ? `<div class="botanical">${g.bot}</div>` : '';

  function factorBars(g) {
    return `<div class="factors">${AX.map((a, i) => {
      const m = AXM[a], v = g.v[i];
      return `<div>
        <div class="factor-head"><span class="factor-name">${m.name}</span><span class="factor-note">${m.notes[Math.min(2, Math.floor(v * 3))]}</span></div>
        <div class="bar"><div class="bar-fill" style="width:${pct(v)}"></div><div class="bar-dot" style="left:${dotPos(v)}"></div></div>
        <div class="factor-ends"><span>${m.left}</span><span>${m.right}</span></div>
      </div>`;
    }).join('')}</div>`;
  }

  function rowList(list, bad, from) {
    return `<div class="rows">${list.map(m => `
      <button class="row" data-action="pair" data-arg="${from.id}|${m.g.id}">
        <span class="row-name"><span class="dot" style="background:${SCENES[m.g.sc].dot}"></span>${m.g.name}</span>
        <span class="row-score${bad ? ' bad' : ''}">${m.c.overall}%</span>
      </button>`).join('')}</div>`;
  }

  // ---------- Views ----------
  function viewLanding() {
    const steps = [
      ['1 · Answer', 'Ten quick questions', 'Multiple choice, two to four answers each. No wrong ones.'],
      ['2 · Discover', 'Your grass sign', 'Read across six factors, from habitat to height.'],
      ['3 · Compare', 'Find your paddock', 'See your closest matches and start a conversation.']
    ];
    return `<div class="wrap">
      <section class="scene scene-hero" style="background:${HERO_SCENE}">
        <div class="hero-copy rise">
          <div class="pill pill-sage">12 native grasses · 10 questions · 2 minutes</div>
          <h1 class="display">Which native grass <em>are you?</em></h1>
          <p class="lede">Answer ten questions about water, pace, company and fire. We’ll match you to one of twelve Australian grasses, then show who you grow best beside.</p>
          <div class="actions">
            <button class="btn btn-primary" data-action="start">Start the quiz</button>
            <button class="btn btn-secondary" data-action="grasses">Meet the twelve</button>
          </div>
        </div>
      </section>
      <div class="grid cols-3 mt-sm">${steps.map(s => `
        <div class="card"><div class="kicker">${s[0]}</div><div class="step-title">${s[1]}</div><div class="muted">${s[2]}</div></div>`).join('')}
      </div>
    </div>`;
  }

  function viewQuiz(anim) {
    const q = Q[state.qi];
    const sel = state.answers[state.qi];
    const answered = Object.keys(state.answers).length;
    const blades = Q.map((_, i) => {
      const done = state.answers[i] !== undefined;
      const cur = i === state.qi;
      const isNew = done && answered > lastAnswered && i === state.qi;
      const h = done ? `height:${18 + ((i * 7) % 12)}px` : '';
      return `<div class="blade${done ? ' done' : ''}${cur ? ' cur' : ''}${isNew ? ' new' : ''}" style="${h}"></div>`;
    }).join('');
    lastAnswered = answered;
    const last = state.qi === Q.length - 1;
    return `<div class="wrap-narrow">
      <div class="blades" role="progressbar" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${answered}">${blades}</div>
      <div class="quiz-meta"><span>Question ${state.qi + 1} of ${Q.length}</span><span>${q.k}</span></div>
      <div class="${anim ? 'rise' : ''}">
        <h2 class="q-title">${q.p}</h2>
        <div class="q-sub">${q.s}</div>
        <div class="options" role="radiogroup">${q.o.map((o, i) => `
          <button class="opt${sel === i ? ' on' : ''}" role="radio" aria-checked="${sel === i}" data-action="choose" data-arg="${i}">
            <span class="opt-key">${i + 1}</span>
            <span><div class="opt-label">${o[0]}</div><div class="opt-hint">${o[1]}</div></span>
          </button>`).join('')}
        </div>
      </div>
      <div class="quiz-foot">
        <button class="btn btn-text" data-action="back">← Back</button>
        <span class="kbd-hint">Press 1–${q.o.length} to choose, Enter to continue</span>
        <button class="btn btn-primary" data-action="next" ${sel === undefined ? 'disabled' : ''}>${last ? 'See my grass' : 'Next'}</button>
      </div>
    </div>`;
  }

  function viewResult() {
    const r = byId(state.resultId);
    const rk = ranked(r);
    const mc = Math.max(2, Math.min(5, CONFIG.matchCount));
    return `<div class="wrap">
      <section class="scene scene-result fade" style="background:${scene(r.sc)}">
        <div class="scene-inner">
          <div class="pill rise d1">Your grass sign</div>
          <h1 class="scene-name rise d2">${r.name}</h1>
          <div class="rise d3">${bot(r)}</div>
        </div>
      </section>
      <div class="grid cols-2 mt rise d4">
        <div class="card">
          <div class="epithet">${r.epi}</div>
          <p class="body">${r.blurb}</p>
          <div class="tip"><div class="kicker">Conversation starter</div>${r.prompt}</div>
        </div>
        <div class="card"><div class="label">Your six factors</div>${factorBars(r)}</div>
      </div>
      <section class="mt-xl fade d5">
        <div class="section-head">
          <h3 class="section-title">Your closest matches</h3>
          <button class="link" data-action="pair" data-arg="${r.id}|${rk[0].g.id}">Full compatibility →</button>
        </div>
        <div class="grid cols-3">${rk.slice(0, mc).map(m => `
          <button class="match" data-action="pair" data-arg="${r.id}|${m.g.id}">
            <div class="match-scene" style="background:${scene(m.g.sc)}"></div>
            <div class="match-body">
              <div class="match-row"><span class="match-name">${m.g.name}</span><span class="match-score">${m.c.overall}%</span></div>
              <div class="muted" style="font-size:14px;margin-top:6px">${verdict(m.c.overall)}</div>
            </div>
          </button>`).join('')}
        </div>
      </section>
      <div class="actions mt-lg">
        <button class="btn btn-primary" data-action="profile" data-arg="${r.id}">Read my full profile</button>
        <button class="btn btn-outline" data-action="start">Retake quiz</button>
      </div>
    </div>`;
  }

  function viewGrasses(anim) {
    const p = byId(state.profileId);
    const pi = G.indexOf(p);
    const rk = ranked(p);
    const facts = [['Habitat', p.habitat], ['Height', p.height], ['Flowers', p.flower], ['Growth form', p.form]];
    return `<div class="wrap">
      <h1 class="page-title">The twelve grasses</h1>
      <p class="intro">Each grass is read across six factors. Choose one to see its full breakdown.</p>
      <div class="chips">${G.map(g => `
        <button class="chip${g.id === p.id ? ' on' : ''}" data-action="select" data-arg="${g.id}">
          <span class="dot" style="background:${SCENES[g.sc].dot}"></span>${g.name}${g.id === state.resultId ? ' · You' : ''}
        </button>`).join('')}
      </div>
      <div class="${anim ? 'rise' : ''}">
        <section class="scene scene-profile" style="background:${scene(p.sc)}">
          <div class="scene-inner profile-head">
            <div>
              <div class="pill">No. ${String(pi + 1).padStart(2, '0')} · ${p.badge}</div>
              <h2 class="profile-name">${p.name}</h2>
              ${bot(p)}
            </div>
            <div class="actions" style="gap:8px">
              <button class="round-btn" data-action="prev" aria-label="Previous grass">←</button>
              <button class="round-btn" data-action="nextGrass" aria-label="Next grass">→</button>
            </div>
          </div>
        </section>
        <div class="grid cols-facts mt-sm">${facts.map(f => `<div class="fact"><div class="fact-k">${f[0]}</div><div class="fact-v">${f[1]}</div></div>`).join('')}</div>
        <div class="grid cols-2 mt">
          <div class="card">
            <div class="epithet">${p.epi}</div>
            <p class="body">${p.blurb}</p>
            <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
              <div class="tip tip-good"><div class="kicker">Strength</div>${p.strength}</div>
              <div class="tip tip-bad"><div class="kicker">Shadow</div>${p.shadow}</div>
            </div>
            <div class="label" style="margin:22px 0 10px">Personality traits</div>
            <div class="traits">${p.traits.map(t => `<div class="trait">${t}</div>`).join('')}</div>
          </div>
          <div class="card"><div class="label">Factor breakdown</div>${factorBars(p)}</div>
        </div>
        <div class="grid cols-2 mt">
          <div class="card card-sm"><div class="label" style="margin-bottom:12px">Grows best beside</div>${rowList(rk.slice(0, 3), false, p)}</div>
          <div class="card card-sm">
            <div class="label" style="margin-bottom:12px">Needs a separate paddock from</div>
            ${rowList(rk.slice(-2).reverse(), true, p)}
            <div class="tip mt"><div class="kicker">Ask a ${p.name}</div>${p.prompt}</div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function viewCompare(anim) {
    const A = byId(state.cA), B = byId(state.cB);
    const c = compat(A, B);
    const same = A.id === B.id;
    const dotA = SCENES[A.sc].dot;
    const dotB = SCENES[B.sc].dot === dotA ? '#2c3a30' : SCENES[B.sc].dot;
    const order = c.sim.map((s, i) => ({ s, i })).sort((x, y) => y.s - x.s);
    const agree = AXM[AX[order[0].i]].name.toLowerCase();
    const differ = AXM[AX[order[5].i]].name.toLowerCase();
    const options = sel => G.map(g => `<option value="${g.id}"${g.id === sel ? ' selected' : ''}>${g.name}</option>`).join('');
    const readings = [['Harmony', c.harmony, 'Pace and social energy'], ['Shared ground', c.ground, 'Habitat and season'], ['Spark', c.spark, 'Opposites in fire and height']];

    const factors = AX.map((a, i) => {
      const m = AXM[a], s = c.sim[i];
      const lo = Math.min(A.v[i], B.v[i]), hi = Math.max(A.v[i], B.v[i]);
      const col = s > .7 ? 'var(--sage-deep)' : s > .45 ? 'var(--ochre-deep)' : 'var(--rose-deep)';
      return `<div>
        <div class="factor-head" style="margin-bottom:8px"><span class="factor-name">${m.name}</span><span class="factor-score" style="color:${col}">${Math.round(s * 100)}% alike</span></div>
        <div class="bar">
          <div class="bar-span" style="left:${pct(lo)};width:${pct(hi - lo)}"></div>
          <div class="bar-dot" style="left:${dotPos(A.v[i])};background:${dotA}"></div>
          <div class="bar-dot hollow" style="left:${dotPos(B.v[i])};border-color:${dotB}"></div>
        </div>
        <div class="factor-ends"><span>${m.left}</span><span>${m.right}</span></div>
      </div>`;
    }).join('');

    const head = G.map((g, i) => `<div class="chart-head${g.id === B.id ? ' on' : ''}">${String(i + 1).padStart(2, '0')}</div>`).join('');
    const rows = G.map((g, i) => {
      const cells = G.map(h => {
        if (g.id === h.id) return `<div class="cell self" title="${g.name}">•</div>`;
        const v = compat(g, h).overall, hc = heat(v);
        const on = g.id === A.id && h.id === B.id;
        return `<button class="cell${on ? ' on' : ''}" title="${g.name} + ${h.name}: ${v}%" style="background:${hc.bg};color:${hc.fg}" data-action="cell" data-arg="${g.id}|${h.id}">${v}</button>`;
      }).join('');
      return `<div class="chart-row${g.id === A.id ? ' on' : ''}"><small>${String(i + 1).padStart(2, '0')}</small>${g.name}</div>${cells}`;
    }).join('');

    return `<div class="wrap">
      <h1 class="page-title">Compatibility</h1>
      <p class="intro">Like star signs, but with soil. Pick two grasses to see how they get along across six factors.</p>
      <div class="pickers">
        <div class="picker">
          <div class="picker-scene" style="background:${scene(A.sc)}"></div>
          <div class="picker-body"><label class="picker-label" for="pickA">Grass A</label><select id="pickA" data-change="cA">${options(A.id)}</select></div>
        </div>
        <button class="swap" data-action="swap" aria-label="Swap grasses">⇄</button>
        <div class="picker">
          <div class="picker-scene" style="background:${scene(B.sc)}"></div>
          <div class="picker-body"><label class="picker-label" for="pickB">Grass B</label><select id="pickB" data-change="cB">${options(B.id)}</select></div>
        </div>
      </div>
      <div class="grid cols-2 mt ${anim ? 'rise' : ''}">
        <div class="card score-card">
          <div class="score-top">
            <div class="ring" style="background:conic-gradient(var(--sage) ${c.overall}%, var(--track) 0)">
              <div class="ring-inner"><div class="ring-num">${c.overall}%</div><div class="ring-cap">overall</div></div>
            </div>
            <div>
              <div class="verdict">${same ? 'A perfect mirror' : verdict(c.overall)}</div>
              <div class="muted" style="font-size:15px;margin-top:4px">${same ? 'Two of the same sign. Expect total agreement and very little surprise.' : `Most aligned on ${agree}. Most different on ${differ}.`}</div>
            </div>
          </div>
          <div class="readings">${readings.map(r => `<div class="reading"><div class="reading-name">${r[0]}</div><div class="reading-score">${pct(r[1])}</div><div class="reading-desc">${r[2]}</div></div>`).join('')}</div>
          <div class="tip"><div class="kicker">Talk about this</div>${same ? A.prompt : `${A.name}, ask: “${B.prompt}”`}</div>
        </div>
        <div class="card">
          <div class="section-head" style="margin-bottom:18px">
            <div class="label" style="margin:0">Factor by factor</div>
            <div class="legend"><span><i style="background:${dotA}"></i>${A.name}</span><span><i style="background:var(--card);box-shadow:inset 0 0 0 2px ${dotB}"></i>${B.name}</span></div>
          </div>
          <div class="factors">${factors}</div>
        </div>
      </div>
      <div class="card mt">
        <div class="section-head" style="margin-bottom:16px">
          <div><div class="step-title" style="font-size:28px">The compatibility chart</div><div class="muted" style="font-size:14px">Every pairing at a glance. Tap a square to compare.</div></div>
          <div class="scale"><span>Low</span><i></i><span>High</span></div>
        </div>
        <div class="chart-scroll"><div class="chart"><div></div>${head}${rows}</div></div>
      </div>
    </div>`;
  }

  // ---------- Render ----------
  function render() {
    const s = state.screen;
    const navs = [['Quiz', 'navQuiz', s === 'quiz' || s === 'result'], ['Grasses', 'grasses', s === 'grasses'], ['Compatibility', 'compare', s === 'compare']];
    $nav.innerHTML = navs.map(n => `<button class="seg-item${n[2] ? ' on' : ''}" data-action="${n[1]}"${n[2] ? ' aria-current="page"' : ''}>${n[0]}</button>`).join('');

    const key = s + ':' + (s === 'quiz' ? state.qi : s === 'grasses' ? state.profileId : s === 'compare' ? state.cA + state.cB : state.resultId);
    const anim = key !== lastKey;
    lastKey = key;
    const views = { landing: viewLanding, quiz: viewQuiz, result: viewResult, grasses: viewGrasses, compare: viewCompare };
    $app.innerHTML = views[s](anim);
  }

  // ---------- Actions ----------
  function choose(i) {
    state.answers[state.qi] = i;
    render();
    if (CONFIG.autoAdvance) setTimeout(next, 280);
  }
  function next() {
    if (state.answers[state.qi] === undefined) return;
    if (state.qi < Q.length - 1) return set({ qi: state.qi + 1 });
    const r = matchAnswers();
    set({ screen: 'result', resultId: r.id, profileId: r.id, cA: r.id, cB: ranked(r)[0].g.id }, true);
  }

  const actions = {
    home: () => set({ screen: 'landing' }, true),
    start: () => { lastAnswered = 0; set({ screen: 'quiz', qi: 0, answers: {} }, true); },
    navQuiz: () => state.resultId ? set({ screen: 'result' }, true) : actions.start(),
    grasses: () => set({ screen: 'grasses' }, true),
    compare: () => set({ screen: 'compare' }, true),
    choose: i => choose(Number(i)),
    next,
    back: () => state.qi > 0 ? set({ qi: state.qi - 1 }) : actions.home(),
    profile: id => set({ screen: 'grasses', profileId: id }, true),
    select: id => set({ profileId: id }),
    prev: () => set({ profileId: G[(G.indexOf(byId(state.profileId)) + G.length - 1) % G.length].id }),
    nextGrass: () => set({ profileId: G[(G.indexOf(byId(state.profileId)) + 1) % G.length].id }),
    pair: arg => { const [a, b] = arg.split('|'); set({ screen: 'compare', cA: a, cB: b }, true); },
    cell: arg => { const [a, b] = arg.split('|'); set({ cA: a, cB: b }); },
    swap: () => set({ cA: state.cB, cB: state.cA })
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el || el.disabled) return;
    actions[el.dataset.action](el.dataset.arg);
  });
  document.addEventListener('change', e => {
    const k = e.target.dataset && e.target.dataset.change;
    if (k) set({ [k]: e.target.value });
  });
  window.addEventListener('keydown', e => {
    if (state.screen !== 'quiz') return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= Q[state.qi].o.length) choose(n - 1);
    else if (e.key === 'Enter') next();
  });

  render();
})();
