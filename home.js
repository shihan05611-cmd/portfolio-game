// Real source-project idle variants: 8 frames at 8 fps, preserved pixel art.
const catElements = [
  { id: 'base', label: '原始形态', color: '#8b745c' },
  { id: 'fire', label: '火元素', color: '#b9532c' },
  { id: 'water', label: '水元素', color: '#416eba' },
];
const catStage = document.querySelector('.cat-playground');
const catButton = document.querySelector('.cat-button');
const catToggle = document.querySelector('.cat-animation-toggle');
const catLabel = document.querySelector('.cat-element');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let catIndex = 0;
let catPaused = motionPreference.matches;
let catInView = true;

function updateCatAnimation() {
  catStage.dataset.animate = !catPaused && catInView && !document.hidden ? 'running' : 'paused';
  catToggle.setAttribute('aria-pressed', String(catPaused));
  catToggle.textContent = catPaused ? '播放动画' : '暂停动画';
}

function selectCatForm(index) {
  catIndex = index;
  const element = catElements[catIndex];
  catStage.dataset.catElement = element.id;
  catStage.style.setProperty('--cat-color', element.color);
  catLabel.textContent = element.label;
  catButton.setAttribute('aria-label', `切换猫咪形态，当前${element.label}`);
  catStage.querySelector('.cat-sprite').setAttribute('aria-label', `${element.label}猫咪的待机动画`);
  document.querySelectorAll('[data-cat-form]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.catForm === element.id));
  });
}
catButton.disabled = false;
catButton.addEventListener('click', () => selectCatForm((catIndex + 1) % catElements.length));
document.querySelectorAll('[data-cat-form]').forEach(button => {
  button.disabled = false;
  button.addEventListener('click', () => selectCatForm(catElements.findIndex(element => element.id === button.dataset.catForm)));
});
selectCatForm(0);
catToggle.addEventListener('click', () => {
  catPaused = !catPaused;
  updateCatAnimation();
});
motionPreference.addEventListener('change', () => {
  catPaused = motionPreference.matches;
  updateCatAnimation();
});
document.addEventListener('visibilitychange', updateCatAnimation);
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    catInView = entry.isIntersecting;
    updateCatAnimation();
  }).observe(catStage);
}
updateCatAnimation();
