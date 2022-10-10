const modal = require("../components/modal");
const gameArena = require("../components/card");

const spinWheelListingRenderer = require("./wheel-demo");

const rewardBtn = () => {
  const btn = `<div id="rewrdBtn"> <span></span>  Rewards</div>`;
  return btn;
};

class GameArena {
  constructor() {}

  init(id, config) {
    console.log(config, "from sdk");

    localStorage.setItem("config", JSON.stringify(config.data));
    let parentContainer = document.getElementById(id);
    let containerEl = document.createElement("section");
    containerEl.setAttribute("id", "reward-btn-section");
    containerEl.innerHTML = rewardBtn();
    parentContainer.appendChild(containerEl);

    const btn = document.querySelector("#rewrdBtn");
    const parent = document.querySelector("#reward-btn-section");
    parent.insertBefore(modal(), btn);
    parent.insertBefore(gameArena(), btn);

    const mod = document.querySelector(".modal");
    mod.setAttribute("id", "reward-modal");

    spinWheelListingRenderer("reward-modal");

    btn.addEventListener("click", () => {
      console.log("btn clicked");
      toggleModal(mod);

      const wheel = document.querySelector(".spin-wheel-listing-main");
      console.log(wheel);
    });
  }
}

const toggleModal = (state) => {
  const modal = state;

  const wheel = document.querySelector(".common-section");

  if (modal.classList.contains("hide")) {
    modal.classList.remove("hide");
    modal.classList.add("transition");
    console.log(modal.classList);
  }

  const closeBtn = document.querySelector(".modal .close");

  closeBtn.addEventListener("click", () => {
    console.log(modal);
    modal.classList.add("hide");
    modal.classList.remove("transition");
    const wrapper = document.querySelector(".wheel-wrapper");
    const spinBtn = document.querySelector("#spin-now");

    spinWheelListingRenderer("reward-modal");

    modal.removeChild(wrapper);
    modal.removeChild(spinBtn);
  });
};

function initialize(id, config) {
  const game = new GameArena();
  game.init(id, config);
}

module.exports = initialize;
