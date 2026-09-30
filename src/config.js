export const EMAIL = 'vicktor492@gmail.com'
// Formato 55DDD9XXXXXXXX. Vazio = botão de WhatsApp fica oculto.
export const WHATSAPP = '5573991714946'

// Loader de boot só aparece na 1ª visita da sessão
let boot = true
try {
  boot = !sessionStorage.getItem('bt-boot')
  sessionStorage.setItem('bt-boot', '1')
} catch {
  /* ignore */
}
export const SHOW_LOADER = boot && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const HERO_DELAY = SHOW_LOADER ? 1900 : 150
