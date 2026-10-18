// Syntropia: alasivujen yhteinen valikkokäyttäytyminen (sama kuin julkaistulla etusivulla, 30.9.2026).
// Yhteistyönappi avautuu myös klikkauksella (kosketusnäytöt); Esc ja ulkopuolinen klikkaus sulkevat.
const closeAll = () => document.querySelectorAll('.nav .item.open').forEach((it) => {
  it.classList.remove('open');
  it.querySelector('button')?.setAttribute('aria-expanded', 'false');
});
document.querySelectorAll('.nav .item > button').forEach((b) => b.addEventListener('click', () => {
  const it = b.parentElement, open = !it.classList.contains('open');
  closeAll();
  it.classList.toggle('open', open);
  b.setAttribute('aria-expanded', String(open));
}));
document.addEventListener('click', (e) => { if (!e.target.closest('.nav .item')) closeAll(); });
// Esc poistaa myös fokuksen: näppäinpainallus tekee napista :focus-visible-tilan, joka pitäisi paneelin auki
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeAll();
  if (document.activeElement?.closest('.nav')) document.activeElement.blur();
});

// Mobiilivalikko: hampurilainen avaa linkit, linkin valinta sulkee.
const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');
burger?.addEventListener('click', () => {
  const auki = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(auki));
});
nav?.querySelectorAll('.links a').forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('open');
  burger?.setAttribute('aria-expanded', 'false');
}));

// Vihreä osinko: nauhan Lue lisää nostaa kortin nauhan yläpuolelle; Esc, klikkaus muualle ja uusi klikkaus sulkevat.
const vk = document.getElementById('vihrea-kortti');
const vkLinkki = document.querySelector('[data-avaa="vihrea-kortti"]');
if (vk && vkLinkki) {
  const kortti = (auki) => { vk.classList.toggle('auki', auki); vkLinkki.setAttribute('aria-expanded', String(auki)); };
  vkLinkki.addEventListener('click', (e) => { e.preventDefault(); kortti(!vk.classList.contains('auki')); });
  document.addEventListener('click', (e) => { if (vk.classList.contains('auki') && !e.target.closest('#vihrea-kortti, [data-avaa="vihrea-kortti"]')) kortti(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') kortti(false); });
}
