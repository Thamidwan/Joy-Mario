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
