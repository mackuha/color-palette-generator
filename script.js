"use strict"

const generateBtn = document.getElementById("get-color-btn")
const colorPicker = document.getElementById("color-picker")
const contentEl = document.getElementById("content-section")
const schemeEl = document.getElementById("scheme-dropdown")
const notifCont = document.getElementById("notif-container")
const notifParagraph = document.getElementById("notif-paragraph")

// App initialization
let colorValue = `8CB6FA`
let colorMode = `monochrome`

renderUI()

function renderUI() {
  fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${colorMode}&count=5`)
    .then((res) => res.json())
    .then((data) => {
      let htmlString = ``

      for (let color of data.colors.reverse()) {
        colorValue = color.hex.value

        htmlString += `
        <div class="color-row">
          <div class="color-box" style="background-color:${colorValue}" data-hex=${colorValue}></div>
          <div class="color-hex" data-hex=${colorValue}>${colorValue}</div>
        </div>
        `
      }

      contentEl.innerHTML = htmlString
    })
}

generateBtn.addEventListener("click", function () {
  const hexCode = colorPicker.value
  colorValue = hexCode.substring(1)
  colorMode = schemeEl.value

  renderUI()
})

contentEl.addEventListener(`click`, function (e) {
  if (e.target.dataset.hex) {
    const targetHex = e.target.dataset.hex
    navigator.clipboard.writeText(targetHex)
    notifCont.style.display = "block"
    notifParagraph.innerHTML = `
        <span class="small-color" style="background-color: ${targetHex}"></span>
        <strong>${targetHex}</strong> copied to clipboard!
    `

    setTimeout(() => {
      notifCont.style.display = "none"
    }, 2000)
  }
})
