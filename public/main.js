'use strict'

function removeListItem (id) {
  const el = document.querySelector(`[data-remove="${id}"]`)
  const row = el.parentElement.parentElement
  row.parentNode.removeChild(row)
}

const rows = document.querySelectorAll('tr')
const buttons = document.querySelectorAll('[data-remove]')

rows.forEach(row => {
  row.addEventListener('click', event => {
    window.open(row.dataset.url, '_blank')
  })
})

buttons.forEach(button => {
  button.addEventListener('click', async event => {
    event.stopPropagation()

    const { data } = await axios.delete(`/posts/${button.dataset.remove}`)

    if (data.response.deleted.n >= 1) {
      removeListItem(button.dataset.remove)
    }
  })
})
