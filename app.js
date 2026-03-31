// ===================================================
//  🌟 My Fun Learning World - KinderGarden Homework
// ===================================================

// ---- Screen Navigation ----
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'alphabet-screen') buildAlphabet();
  if (id === 'numbers-screen') buildNumbers();
  if (id === 'colors-screen')  startColorGame();
  if (id === 'shapes-screen')  startShapesGame();
  if (id === 'spelling-screen') startSpelling();
  if (id === 'math-screen')    startMath();
}

// ---- Mascot Easter Egg ----
document.querySelector('.mascot').addEventListener('click', () => {
  const messages = ['Yay! You clicked me! 🌈','Let\'s learn today! 🎉','You\'re a superstar! ⭐','Keep going! 🦋','I believe in you! 💪'];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  showCelebration(msg, false);
});

// ===================================================
//  🔤 ALPHABET
// ===================================================
const ALPHABET = [
  {l:'A', emoji:'🍎', word:'Apple'},  {l:'B', emoji:'🐝', word:'Bee'},
  {l:'C', emoji:'🐱', word:'Cat'},    {l:'D', emoji:'🦆', word:'Duck'},
  {l:'E', emoji:'🐘', word:'Elephant'},{l:'F', emoji:'🐸', word:'Frog'},
  {l:'G', emoji:'🍇', word:'Grapes'}, {l:'H', emoji:'🐴', word:'Horse'},
  {l:'I', emoji:'🍦', word:'Ice cream'},{l:'J', emoji:'🃏', word:'Joker'},
  {l:'K', emoji:'🪁', word:'Kite'},   {l:'L', emoji:'🦁', word:'Lion'},
  {l:'M', emoji:'🐭', word:'Mouse'},  {l:'N', emoji:'🌙', word:'Night'},
  {l:'O', emoji:'🐙', word:'Octopus'},{l:'P', emoji:'🐧', word:'Penguin'},
  {l:'Q', emoji:'👑', word:'Queen'},  {l:'R', emoji:'🌈', word:'Rainbow'},
  {l:'S', emoji:'🌟', word:'Star'},   {l:'T', emoji:'🐢', word:'Turtle'},
  {l:'U', emoji:'☂️', word:'Umbrella'},{l:'V', emoji:'🌸', word:'Violet'},
  {l:'W', emoji:'🐋', word:'Whale'},  {l:'X', emoji:'🎸', word:'Xylophone'},
  {l:'Y', emoji:'🪀', word:'Yo-yo'},  {l:'Z', emoji:'🦓', word:'Zebra'}
];

function buildAlphabet() {
  const grid = document.getElementById('alphabet-grid');
  if (grid.children.length > 0) return;
  const colors = ['#FFB3C6','#B3E5FC','#C8E6C9','#FFF9C4','#E1BEE7','#FFE0B2','#F8BBD0','#B2EBF2'];
  ALPHABET.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.className = 'alpha-btn';
    btn.style.borderColor = colors[i % colors.length];
    btn.innerHTML = `
      <span class="alpha-letter">${item.l}</span>
      <span class="alpha-emoji">${item.emoji}</span>
      <span class="alpha-word">${item.word}</span>`;
    btn.addEventListener('click', () => {
      speak(`${item.l} is for ${item.word}`);
      btn.style.animation = 'none';
      btn.offsetHeight;
      btn.style.animation = 'wiggle 0.4s ease';
    });
    grid.appendChild(btn);
  });
}

// ===================================================
//  🔢 NUMBERS
// ===================================================
const NUM_EMOJIS = ['🌸','⭐','🍭','🐶','🎈','🦋','🌈','🍦','🐠','🎀'];
const NUM_NAMES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten'];

function buildNumbers() {
  const disp = document.getElementById('numbers-display');
  if (disp.children.length > 0) return;
  for (let n = 0; n <= 10; n++) {
    const btn = document.createElement('button');
    btn.className = 'num-btn';
    btn.textContent = n;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.num-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showNumber(n);
    });
    disp.appendChild(btn);
  }
}

function showNumber(n) {
  const stage = document.getElementById('emoji-stage');
  const pick = NUM_EMOJIS[n % NUM_EMOJIS.length];
  stage.style.animation = 'none';
  stage.offsetHeight;
  stage.style.animation = 'popIn 0.3s ease';
  if (n === 0) {
    stage.innerHTML = '<span style="font-size:1.2rem;color:#6B7280">Nothing! Zero means empty 😮</span>';
  } else {
    stage.textContent = (pick + ' ').repeat(n).trim();
  }
  speak(`${n}! ${NUM_NAMES[n]}`);
}

// ===================================================
//  🎨 COLORS GAME
// ===================================================
const COLORS = [
  {name:'Red',     hex:'#EF4444', emoji:'🔴'},
  {name:'Blue',    hex:'#3B82F6', emoji:'🔵'},
  {name:'Yellow',  hex:'#FBBF24', emoji:'🟡'},
  {name:'Green',   hex:'#22C55E', emoji:'🟢'},
  {name:'Orange',  hex:'#F97316', emoji:'🟠'},
  {name:'Purple',  hex:'#A855F7', emoji:'🟣'},
  {name:'Pink',    hex:'#EC4899', emoji:'🩷'},
  {name:'Brown',   hex:'#92400E', emoji:'🟤'},
  {name:'Black',   hex:'#1C1917', emoji:'⚫'},
  {name:'White',   hex:'#F5F5F4', emoji:'⚪'},
];

let colorScore = 0;
let currentColor = null;

function startColorGame() {
  colorScore = 0;
  document.getElementById('color-score').textContent = 0;
  nextColor();
}

function nextColor() {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
  currentColor = shuffled[0];
  const wrongChoices = shuffled.slice(1, 3);
  const choices = [...wrongChoices, currentColor].sort(() => Math.random() - 0.5);

  const swatch = document.getElementById('color-swatch');
  swatch.style.background = currentColor.hex;
  swatch.style.border = currentColor.name === 'White' ? '3px solid #E5E7EB' : 'none';
  swatch.style.animation = 'none';
  swatch.offsetHeight;
  swatch.style.animation = 'popIn 0.4s ease';

  const choicesDiv = document.getElementById('color-choices');
  choicesDiv.innerHTML = '';
  choices.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'color-choice-btn';
    btn.textContent = c.emoji + ' ' + c.name;
    btn.addEventListener('click', () => handleColorAnswer(btn, c));
    choicesDiv.appendChild(btn);
  });

  document.getElementById('color-instruction').textContent = 'Which color is this? 👇';
}

function handleColorAnswer(btn, chosen) {
  const btns = document.querySelectorAll('.color-choice-btn');
  btns.forEach(b => b.disabled = true);
  if (chosen.name === currentColor.name) {
    btn.classList.add('correct');
    colorScore++;
    document.getElementById('color-score').textContent = colorScore;
    speak(`Yes! That\'s ${currentColor.name}! Great job!`);
    showCelebration(`${currentColor.emoji} That\'s ${currentColor.name}! You\'re so smart! 🌟`);
    setTimeout(nextColor, 2200);
  } else {
    btn.classList.add('wrong');
    speak(`Oops! Try again! It\'s ${currentColor.name}`);
    document.getElementById('color-instruction').textContent = `Oops! It was ${currentColor.emoji} ${currentColor.name}! Try again!`;
    setTimeout(() => {
      btns.forEach(b => { b.disabled = false; b.classList.remove('wrong','correct'); });
    }, 1200);
  }
}

// ===================================================
//  🔵 SHAPES GAME
// ===================================================
const SHAPES = [
  {name:'Circle',   emoji:'⭕', desc:'Round like a ball!'},
  {name:'Square',   emoji:'🟥', desc:'4 equal sides!'},
  {name:'Triangle', emoji:'🔺', desc:'3 pointy corners!'},
  {name:'Star',     emoji:'⭐', desc:'Shiny points!'},
  {name:'Heart',    emoji:'❤️', desc:'Full of love!'},
  {name:'Diamond',  emoji:'🔷', desc:'Like a kite!'},
  {name:'Moon',     emoji:'🌙', desc:'Like the night sky!'},
  {name:'Oval',     emoji:'🥚', desc:'Like an egg!'},
];

let shapesScore = 0;
let currentShape = null;

function startShapesGame() {
  shapesScore = 0;
  document.getElementById('shapes-score').textContent = 0;
  nextShape();
}

function nextShape() {
  const shuffled = [...SHAPES].sort(() => Math.random() - 0.5);
  currentShape = shuffled[0];
  const wrongChoices = shuffled.slice(1, 3);
  const choices = [...wrongChoices, currentShape].sort(() => Math.random() - 0.5);

  const target = document.getElementById('shapes-target');
  target.innerHTML = currentShape.emoji;
  target.style.animation = 'none';
  target.offsetHeight;
  target.style.animation = 'popIn 0.4s ease';

  document.getElementById('shapes-instruction').textContent = `What shape is this? ${currentShape.desc}`;

  const choicesDiv = document.getElementById('shapes-choices');
  choicesDiv.innerHTML = '';
  choices.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'shape-choice-btn';
    btn.title = s.name;
    btn.innerHTML = `<span style="font-size:2.5rem">${s.emoji}</span><br><span style="font-size:0.8rem;font-weight:800">${s.name}</span>`;
    btn.addEventListener('click', () => handleShapeAnswer(btn, s));
    choicesDiv.appendChild(btn);
  });
}

function handleShapeAnswer(btn, chosen) {
  const btns = document.querySelectorAll('.shape-choice-btn');
  btns.forEach(b => b.disabled = true);
  if (chosen.name === currentShape.name) {
    btn.classList.add('correct');
    shapesScore++;
    document.getElementById('shapes-score').textContent = shapesScore;
    speak(`Yes! That\'s a ${currentShape.name}! Awesome!`);
    showCelebration(`${currentShape.emoji} That\'s a ${currentShape.name}! Brilliant! 🌟`);
    setTimeout(nextShape, 2200);
  } else {
    btn.classList.add('wrong');
    speak(`Oops! That\'s a ${chosen.name}. We\'re looking for ${currentShape.name}`);
    setTimeout(() => {
      btns.forEach(b => { b.disabled = false; b.classList.remove('wrong','correct'); });
    }, 1200);
  }
}

// ===================================================
//  ✏️ SPELLING
// ===================================================
const SPELL_WORDS = [
  {word:'CAT',  emoji:'🐱', hint:'A furry pet that says meow!'},
  {word:'DOG',  emoji:'🐶', hint:'Man\'s best friend!'},
  {word:'SUN',  emoji:'☀️',  hint:'It shines bright in the sky!'},
  {word:'BUS',  emoji:'🚌', hint:'We ride it to school!'},
  {word:'HAT',  emoji:'🎩', hint:'We wear it on our head!'},
  {word:'MAP',  emoji:'🗺️',  hint:'Shows us where to go!'},
  {word:'PIG',  emoji:'🐷', hint:'It goes oink oink!'},
  {word:'BEE',  emoji:'🐝', hint:'Makes yummy honey!'},
  {word:'ICE',  emoji:'🧊', hint:'It\'s very cold!'},
  {word:'JAM',  emoji:'🍓', hint:'Goes on toast!'},
  {word:'COW',  emoji:'🐄', hint:'Gives us milk!'},
  {word:'OWL',  emoji:'🦉', hint:'Who who! Night bird!'},
  {word:'HEN',  emoji:'🐔', hint:'Lays eggs for us!'},
  {word:'FAN',  emoji:'🌀', hint:'Keeps us cool!'},
  {word:'TOP',  emoji:'🪀', hint:'It spins around!'},
];

let spellScore = 0;
let currentSpell = null;
let typedLetters = [];

function startSpelling() {
  spellScore = 0;
  document.getElementById('spell-score').textContent = 0;
  nextSpelling();
}

function nextSpelling() {
  currentSpell = SPELL_WORDS[Math.floor(Math.random() * SPELL_WORDS.length)];
  typedLetters = [];

  document.getElementById('spell-picture').textContent = currentSpell.emoji;
  document.getElementById('spell-hint').textContent = currentSpell.hint;

  // Build letter boxes
  const boxes = document.getElementById('letter-boxes');
  boxes.innerHTML = '';
  for (let i = 0; i < currentSpell.word.length; i++) {
    const box = document.createElement('div');
    box.className = 'letter-box';
    box.id = `lbox-${i}`;
    boxes.appendChild(box);
  }

  // Build keyboard (shuffled A-Z)
  const keyboard = document.getElementById('letter-keyboard');
  keyboard.innerHTML = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  letters.forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'key-btn';
    btn.textContent = l;
    btn.id = `key-${l}`;
    btn.addEventListener('click', () => typeLetterSpell(l));
    keyboard.appendChild(btn);
  });

  // Add backspace
  const bksp = document.createElement('button');
  bksp.className = 'key-btn';
  bksp.textContent = '⌫';
  bksp.id = 'key-backspace';
  bksp.addEventListener('click', backspaceSpell);
  keyboard.appendChild(bksp);
}

function typeLetterSpell(letter) {
  if (typedLetters.length >= currentSpell.word.length) return;
  typedLetters.push(letter);
  const idx = typedLetters.length - 1;
  const box = document.getElementById(`lbox-${idx}`);
  if (box) {
    box.textContent = letter;
    box.classList.add('filled');
  }
  speak(letter);
}

function backspaceSpell() {
  if (typedLetters.length === 0) return;
  const idx = typedLetters.length - 1;
  typedLetters.pop();
  const box = document.getElementById(`lbox-${idx}`);
  if (box) {
    box.textContent = '';
    box.classList.remove('filled');
  }
}

function checkSpelling() {
  if (typedLetters.length < currentSpell.word.length) {
    speak('Fill all the boxes first!');
    return;
  }
  const typed = typedLetters.join('');
  if (typed === currentSpell.word) {
    spellScore++;
    document.getElementById('spell-score').textContent = spellScore;
    speak(`Amazing! You spelled ${currentSpell.word} correctly!`);
    showCelebration(`${currentSpell.emoji} You spelled ${currentSpell.word}! Super smart! 🌟`);
    setTimeout(nextSpelling, 2200);
  } else {
    speak(`Hmm, not quite! Try again!`);
    flashWrong();
    setTimeout(() => {
      typedLetters = [];
      document.querySelectorAll('.letter-box').forEach(b => {
        b.textContent = '';
        b.classList.remove('filled');
      });
    }, 800);
  }
}

function flashWrong() {
  document.querySelectorAll('.letter-box').forEach(b => {
    b.style.background = '#FFE4E6';
    b.style.borderColor = '#FB7185';
    setTimeout(() => {
      b.style.background = '';
      b.style.borderColor = '';
    }, 700);
  });
}

// ===================================================
//  ➕ EASY MATH
// ===================================================
const MATH_EMOJIS = ['🍎','🌸','⭐','🐶','🎈','🦋','🍭','🐱','🍦','🎀'];
let mathScore = 0;
let currentMathAnswer = 0;

function startMath() {
  mathScore = 0;
  document.getElementById('math-score').textContent = 0;
  nextMath();
}

function nextMath() {
  const type = Math.random() < 0.6 ? 'add' : 'subtract';
  const emoji = MATH_EMOJIS[Math.floor(Math.random() * MATH_EMOJIS.length)];

  let a, b, answer;
  if (type === 'add') {
    a = Math.floor(Math.random() * 6);
    b = Math.floor(Math.random() * (6 - a));
    answer = a + b;
    document.getElementById('math-visual').innerHTML =
      (emoji + ' ').repeat(a) + ' <span style="font-size:1.5rem">➕</span> ' + (emoji + ' ').repeat(b);
    document.getElementById('math-equation').textContent = `${a} + ${b} = ?`;
    document.getElementById('math-instruction').textContent = `How many ${emoji} are there in total?`;
  } else {
    a = Math.floor(Math.random() * 6) + 1;
    b = Math.floor(Math.random() * a);
    answer = a - b;
    document.getElementById('math-visual').innerHTML =
      (emoji + ' ').repeat(a) + ' <span style="font-size:1.5rem">➖</span> ' + b;
    document.getElementById('math-equation').textContent = `${a} - ${b} = ?`;
    document.getElementById('math-instruction').textContent = `Take away ${b}. How many ${emoji} are left?`;
  }

  currentMathAnswer = answer;

  // Generate choices (answer + 2 wrong ones, unique)
  const wrongSet = new Set();
  wrongSet.add(answer);
  while (wrongSet.size < 3) {
    const w = Math.max(0, answer + Math.floor(Math.random() * 5) - 2);
    wrongSet.add(w);
  }
  const choices = [...wrongSet].sort(() => Math.random() - 0.5);

  const choicesDiv = document.getElementById('math-choices');
  choicesDiv.innerHTML = '';
  choices.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'math-choice-btn';
    btn.textContent = c;
    btn.addEventListener('click', () => handleMathAnswer(btn, c));
    choicesDiv.appendChild(btn);
  });

  speak(document.getElementById('math-equation').textContent.replace('=', 'equals').replace('?',''));
}

function handleMathAnswer(btn, chosen) {
  const btns = document.querySelectorAll('.math-choice-btn');
  btns.forEach(b => b.disabled = true);
  if (chosen === currentMathAnswer) {
    btn.classList.add('correct');
    mathScore++;
    document.getElementById('math-score').textContent = mathScore;
    speak(`Yes! The answer is ${currentMathAnswer}! You\'re amazing!`);
    showCelebration(`${currentMathAnswer} is correct! You\'re a math genius! 🌟`);
    setTimeout(nextMath, 2200);
  } else {
    btn.classList.add('wrong');
    speak(`Oops! The answer is ${currentMathAnswer}. Try the next one!`);
    setTimeout(() => {
      btns.forEach(b => { b.disabled = false; b.classList.remove('wrong','correct'); });
      nextMath();
    }, 1500);
  }
}

// ===================================================
//  🎉 CELEBRATION
// ===================================================
const CELEBRATIONS = [
  'Wonderful! 🌈','Amazing! ⭐','Super smart! 🦄','You rock! 🎸','Brilliant! 🌟',
  'Fantastic! 🎉','Keep it up! 🎀','You\'re a genius! 🧠','So proud of you! 💖','Outstanding! 🏆'
];

function showCelebration(msg = null, big = true) {
  const cel = document.getElementById('celebration');
  const msgEl = document.getElementById('celebration-msg');
  msgEl.textContent = msg || CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)];

  if (big) {
    cel.classList.add('show');
  } else {
    // Small toast-style for mascot clicks
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; top:100px; left:50%; transform:translateX(-50%);
      background:white; padding:14px 28px; border-radius:50px;
      box-shadow:0 8px 32px rgba(168,85,247,0.35); z-index:9999;
      font-family:'Nunito',sans-serif; font-size:1.1rem; font-weight:800;
      color:#7C3AED; animation:popIn 0.4s ease; border:3px solid #E879F9;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
}

function hideCelebration() {
  document.getElementById('celebration').classList.remove('show');
}

// ===================================================
//  🔊 SPEECH SYNTHESIS
// ===================================================
function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.85;
  utt.pitch = 1.3;
  // Try to pick a nice voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google UK English Female') || v.name.includes('Female'));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

// Load voices (Chrome requires this)
window.speechSynthesis.onvoiceschanged = () => {};

// ===================================================
//  🎨 INIT
// ===================================================
window.addEventListener('load', () => {
  // Build home instantly
  document.getElementById('home-screen').classList.add('active');

  // Random pastel body bg on load
  const bgs = [
    'linear-gradient(135deg, #FFF5FB 0%, #EFF6FF 50%, #F0FFF4 100%)',
    'linear-gradient(135deg, #FFF9C4 0%, #FCE4EC 50%, #E8F5E9 100%)',
    'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 50%, #FFF3E0 100%)',
  ];
  document.body.style.background = bgs[Math.floor(Math.random() * bgs.length)];

  speak('Welcome to My Fun Learning World! Let\'s play and learn!');
});
