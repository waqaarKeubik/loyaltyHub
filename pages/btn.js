const modal = require("../components/modal");
const card = require("../components/card");

const spinWheelListingRenderer = require("./wheel-demo");

const rewardBtn = () => {
  const btn = `<div id="rewrdBtn"> <span></span>  Rewards</div>`;
  return btn;
};

class RewardBtn {
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

    const mod = document.querySelector(".modal");
    mod.setAttribute("id", "reward-modal");
    mod.appendChild(card());

    const exploreSpin = document.querySelector(".explore");

    exploreSpin.addEventListener("click", () => {
      const gameArena = document.querySelector(".game-arena");
      gameArena.style.display = "none";
      spinWheelListingRenderer("reward-modal");
    });

    btn.addEventListener("click", () => {
      console.log("btn clicked");
      toggleModal(mod);
      const gameArena = document.querySelector(".game-arena");
      gameArena.style.display = "block";
      const wheel = document.querySelector(".spin-wheel-listing-main");
      console.log(wheel);
    });
  }
}

const toggleModal = (state) => {
  const modal = state;

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
    const reward = document.querySelector("#reward-modal");
    const child = document.querySelector("#spin-wheel-listing-main");

    // spinWheelListingRenderer("reward-modal");

    modal.removeChild(wrapper);
    modal.removeChild(spinBtn);
    reward.removeChild(child);
  });
};

function initialize(id, config) {
  const btn = new RewardBtn();
  btn.init(id, config);
}

module.exports = initialize;
