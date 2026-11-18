// Year in the footer
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

// Weak devices get a lighter blur (liquid-glass guidance)
if ((navigator.hardwareConcurrency || 8) <= 4 || matchMedia('(pointer: coarse)').matches) document.documentElement.classList.add('lite');

// Navbar turns to glass once the page scrolls
const nav = document.querySelector('[data-nav]');
if (nav) {
  const onScroll = () => nav.classList.toggle('glass', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Close the mobile menu after choosing a link
document.querySelectorAll('details[data-menu] a').forEach(a => a.addEventListener('click', () => { a.closest('details').open = false; }));

// Forms -> Web3Forms. The access key is public by design; get it free at web3forms.com using svectim@outlook.com.
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
const CONTACT_EMAIL = 'svectim@outlook.com';

document.querySelectorAll('form[data-web3]').forEach(form => {
  const status = form.querySelector('[data-status]');
  const button = form.querySelector('button[type="submit"]');
  const say = (text, tone) => { status.textContent = text; status.dataset.tone = tone; };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const bad = [...form.querySelectorAll('[required]')].find(el => !el.value.trim() || !el.checkValidity());
    if (bad) { say(`Please complete "${bad.dataset.label}".`, 'error'); bad.focus(); return; }

    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // spam honeypot ticked: drop silently
    const subject = `${form.dataset.subject}: ${data.organisation || data.name}`;

    // Until the key is set, hand the message to the visitor's email app so nothing is lost.
    if (WEB3FORMS_ACCESS_KEY.startsWith('YOUR_')) {
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
      location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      say(`Your email app should open with your message ready. If it does not, email ${CONTACT_EMAIL}.`, 'info');
      return;
    }

    button.disabled = true;
    say('Sending…', 'info');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, subject, from_name: 'SVECTIM website', ...data }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
      form.reset();
      say('Thank you. We will reply within one working day.', 'ok');
    } catch {
      say(`We could not send your message. Please email ${CONTACT_EMAIL} directly.`, 'error');
    } finally {
      button.disabled = false;
    }
  });
});
