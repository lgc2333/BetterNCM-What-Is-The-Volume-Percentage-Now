import styles from 'inline:./main.css'

import type {} from 'esbuild-plugin-inline-import'

function getBarVol(barElem: HTMLDivElement) {
  return barElem.style.height.replace('%', '').split('.')[0]
}

function apply(playerElem: HTMLDivElement) {
  const spkElem = playerElem.querySelector<HTMLDivElement>('.spk')!
  const spkIconElem = spkElem.querySelector('svg')!

  const percentElem = document.createElement('div')
  percentElem.style.display = 'none'
  percentElem.classList.add('percent')

  const percentTextElem = document.createElement('span')
  percentElem.appendChild(percentTextElem)
  spkElem.appendChild(percentElem)

  const volBarContainerElem = playerElem.querySelector<HTMLDivElement>('.prg-spk')!
  const volBarElem = volBarContainerElem.querySelector<HTMLDivElement>('.wrap > .has')!

  const updatePercent = () => {
    percentTextElem.textContent = `${getBarVol(volBarElem)}%`
  }
  updatePercent()
  const volBarObserver = new MutationObserver(updatePercent)
  volBarObserver.observe(volBarElem, { attributes: true })

  const hoverCallback = () => {
    spkIconElem.style.display = 'none'
    percentElem.style.removeProperty('display')
  }
  const leaveCallback = () => {
    spkIconElem.style.removeProperty('display')
    percentElem.style.display = 'none'
  }
  spkElem.addEventListener('pointerenter', hoverCallback)
  spkElem.addEventListener('pointerleave', leaveCallback)
  volBarContainerElem.addEventListener('pointerenter', hoverCallback)
  volBarContainerElem.addEventListener('pointerleave', leaveCallback)
}

function applyStyles() {
  const styleElem = document.createElement('style')
  styleElem.textContent = styles
  document.head.appendChild(styleElem)
}

plugin.onLoad(async () => {
  const playerElems = await Promise.race([
    Promise.all([
      betterncm.utils.waitForElement<HTMLDivElement>('.m-player'),
      betterncm.utils.waitForElement<HTMLDivElement>('.m-player-fm'),
    ]),
    betterncm.utils
      .delay(10000)
      .then(() => Promise.reject(new Error('No spk element found'))),
  ])
  playerElems.forEach((x) => apply(x!))
  applyStyles()
  // console.log('What Is The Volume Percentage Now loaded')
})
