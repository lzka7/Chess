/* =====================================================================
   ✏️  EDIT HERE — THIS IS THE ONLY PART YOU NEED TO CHANGE
   =====================================================================
   For each player, change the numbers after every game:
     rW / rD / rL = Rapid wins / draws / losses
     bW / bD / bL = Blitz wins / draws / losses
   Points and rankings are calculated AUTOMATICALLY. Do not type points.
   (Rapid: win 4, draw 2 | Blitz: win 2, draw 1 | loss 0)
   ===================================================================== */
const PLAYERS = [
  { name: "Lzka (muthallath)",           rW: 0, rD: 0, rL: 0,  bW: 0, bD: 0, bL: 0 },
  { name: "Zezo Hosam",                  rW: 0, rD: 0, rL: 0,  bW: 0, bD: 0, bL: 0 },
  { name: "Abdul",                       rW: 0, rD: 0, rL: 0,  bW: 0, bD: 0, bL: 0 },
  { name: "Khaled Yasser (abo 3obayda)", rW: 0, rD: 0, rL: 0,  bW: 0, bD: 0, bL: 0 },
  { name: "Diaa Said (QuotientKnight)",  rW: 0, rD: 0, rL: 0,  bW: 0, bD: 0, bL: 0 },
  { name: "Abdo Gad",                    rW: 0, rD: 0, rL: 0,  bW: 0, bD: 0, bL: 0 },
  { name: "3zz Eldeen",                  rW: 0, rD: 0, rL: 0,  bW: 0, bD: 0, bL: 0 },
];

/* ✏️  OPTIONAL — HEAD-TO-HEAD (used only to break ties in total points)
   Add one line per finished pairing: points each player scored vs the other
   (Rapid win 4 + Blitz win 2 = max 6). Example (remove the // to use):
     { a: "Abdul", b: "Zezo Hosam", aPts: 5, bPts: 1 },
   Names must match the names above exactly. */
const HEAD_TO_HEAD = [
  // { a: "Abdul", b: "Zezo Hosam", aPts: 5, bPts: 1 },
];

/* ✏️  Scoring values (change only if you change the league rules) */
const SCORE = { rapidWin: 4, rapidDraw: 2, blitzWin: 2, blitzDraw: 1 };

/* =====================================================================
   BELOW THIS LINE: automatic code. No need to edit.
   ===================================================================== */
/* Each pair is [Rapid White, Rapid Black]. Blitz is reversed automatically.
   Every player has exactly 3 White + 3 Black in Rapid and 3 + 3 in Blitz. */
const SCHEDULE = [
  { bye: 0, pairs: [[6,1],[2,5],[3,4]] },
  { bye: 4, pairs: [[0,1],[6,2],[3,5]] },
  { bye: 1, pairs: [[0,2],[3,6],[4,5]] },
  { bye: 5, pairs: [[0,3],[1,2],[4,6]] },
  { bye: 2, pairs: [[4,0],[1,3],[5,6]] },
  { bye: 6, pairs: [[5,0],[1,4],[2,3]] },
  { bye: 3, pairs: [[6,0],[5,1],[2,4]] },
];
const names = PLAYERS.map(p => p.name);

function stats(p) {
  const rapidPts = p.rW * SCORE.rapidWin + p.rD * SCORE.rapidDraw;
  const blitzPts = p.bW * SCORE.blitzWin + p.bD * SCORE.blitzDraw;
  const games = p.rW + p.rD + p.rL + p.bW + p.bD + p.bL;
  const gs = p.rW + p.bW + (p.rD + p.bD) / 2;
  return { ...p, rapidPts, blitzPts, total: rapidPts + blitzPts, games, gs };
}

function h2h(a, b) { // points a scored minus points b scored in their pairing
  for (const m of HEAD_TO_HEAD) {
    if (m.a === a && m.b === b) return m.aPts - m.bPts;
    if (m.a === b && m.b === a) return m.bPts - m.aPts;
  }
  return 0;
}

// negative = a ranks above b
function compare(a, b) {
  if (b.total !== a.total) return b.total - a.total;      // 1. total points
  const h = h2h(a.name, b.name);                          // 2. head-to-head
  if (h !== 0) return -h;
  if (b.rW !== a.rW) return b.rW - a.rW;                  // 3. Rapid wins
  if (b.bW !== a.bW) return b.bW - a.bW;                  // 4. Blitz wins
  return 0;                                               // 5. still tied -> playoff
}

function renderStandings() {
  const rows = PLAYERS.map(stats).sort((a, b) => compare(a, b) || a.name.localeCompare(b.name));
  let rank = 0;
  const html = rows.map((r, i) => {
    if (i === 0 || compare(rows[i - 1], r) !== 0) rank = i + 1; // equal rows share a rank
    const leader = rank === 1 && r.total > 0 ? "leader" : "";
    return `<tr class="${leader}">
      <td>${rank}</td><td class="name">${r.name}</td><td>${r.games}</td>
      <td>${r.rW}</td><td>${r.rD}</td><td>${r.rL}</td>
      <td>${r.bW}</td><td>${r.bD}</td><td>${r.bL}</td>
      <td>${r.rapidPts}</td><td>${r.blitzPts}</td><td><b>${r.total}</b></td><td>${r.gs}</td></tr>`;
  }).join("");
  document.querySelector("#standings tbody").innerHTML = html;
}

function renderStatic() {
  document.getElementById("players").innerHTML = names.map(n => `<span>${n}</span>`).join("");
  let n = 0;
  document.getElementById("rounds").innerHTML = SCHEDULE.map((r, i) =>
    `<div class="rd"><h3>Round ${i + 1}</h3>` +
    r.pairs.map(([a, b]) => { n++;
      return `<div class="m"><b>Match ${n}</b>
        <small>Rapid: ${names[a]} (W) vs ${names[b]} (B)</small>
        <small>Blitz: ${names[b]} (W) vs ${names[a]} (B)</small></div>`;
    }).join("") +
    `<div class="bye">BYE: ${names[r.bye]} (0 pts)</div></div>`
  ).join("");
}

renderStatic();
renderStandings();
