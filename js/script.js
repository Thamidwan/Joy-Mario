document.querySelectorAll('.site-header').forEach((header) => {
  const toggle = header.querySelector('.menu-toggle')
  const navigation = header.querySelector('.desktop-nav')

  if (!toggle || !navigation) return

  const closeMenu = () => {
    header.classList.remove('menu-open')
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true'
    header.classList.toggle('menu-open', !isOpen)
    toggle.setAttribute('aria-expanded', String(!isOpen))
  })

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu()
  })

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) closeMenu()
  })
})

const filters = document.querySelectorAll('[data-filter]')
const cards = document.querySelectorAll('.catalogue-card[data-category]')
const status = document.querySelector('#catalogue-status')

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const category = filter.dataset.filter
    let visibleCount = 0

    filters.forEach((button) => {
      button.setAttribute('aria-pressed', String(button === filter))
    })

    cards.forEach((card) => {
      const isVisible = category === 'all' || card.dataset.category === category
      card.hidden = !isVisible
      if (isVisible) visibleCount += 1
    })

    if (status) {
      const label = filter.textContent.trim().toLowerCase()
      status.textContent = category === 'all'
        ? `Showing all ${visibleCount} styles`
        : `Showing ${visibleCount} ${label}`
    }
  })
})

const heroWrap = document.querySelector('.hero-image-wrap')
const heroSlides = heroWrap ? heroWrap.querySelectorAll('.hero-image') : []

if (heroSlides.length > 1) {
  const counter = document.querySelector('.hero-current')
  const caption = heroWrap.querySelector('.hero-caption-text')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let current = 0
  let timer = null

  const showSlide = (index) => {
    heroSlides[current].classList.remove('is-active')
    heroSlides[current].setAttribute('aria-hidden', 'true')
    current = (index + heroSlides.length) % heroSlides.length
    heroSlides[current].classList.add('is-active')
    heroSlides[current].removeAttribute('aria-hidden')
    if (counter) counter.textContent = String(current + 1).padStart(2, '0')
    if (caption) {
      caption.style.opacity = '0'
      setTimeout(() => {
        caption.textContent = heroSlides[current].dataset.caption || ''
        caption.style.opacity = '1'
      }, 400)
    }
  }

  const start = () => { if (!timer) timer = setInterval(() => showSlide(current + 1), 5000) }
  const stop = () => { clearInterval(timer); timer = null }

  if (!reduceMotion) {
    start()
    heroWrap.addEventListener('mouseenter', stop)
    heroWrap.addEventListener('mouseleave', start)
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()))
  }
}

// WhatsApp chat button — set your number here (country code, no + or spaces, e.g. 27821234567)
const WHATSAPP_NUMBER = '27645462405'
const WHATSAPP_MESSAGE = "Hi Joy & Mario! I'd love some help finding the right pair."

;(() => {
  const link = document.createElement('a')
  link.className = 'whatsapp-button'
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  link.target = '_blank'
  link.rel = 'noreferrer'
  link.setAttribute('aria-label', 'Chat with Joy & Mario on WhatsApp')
  link.innerHTML = `
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
      <path fill="currentColor" d="M16 3C8.8 3 3 8.6 3 15.6c0 2.5.7 4.8 2 6.8L3.6 28.6l6.4-1.7c1.8 1 3.9 1.5 6 1.5 7.2 0 13-5.6 13-12.6S23.2 3 16 3zm0 23.1c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-3.8 1 1-3.6-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.8C5.5 9.9 10.2 5.4 16 5.4s10.5 4.5 10.5 10.2S21.8 26.1 16 26.1z"/>
      <path fill="currentColor" d="M21.8 18.6c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1c-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2s0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.2-.1-.4-.2-.7-.3z"/>
    </svg>
    <span>Chat with us</span>`
  document.body.appendChild(link)
})()

// Sticky navbar: compact style once the page is scrolled
document.querySelectorAll('.site-header').forEach((header) => {
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 40)
  update()
  window.addEventListener('scroll', update, { passive: true })
})
