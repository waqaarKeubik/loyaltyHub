const modal = require("../components/modal");
const card = require("../components/card");
const wallet = require("../components/wallet");

const spinWheelListingRenderer = require("./wheel-demo");
const http = require("./http");

const rewardBtn = () => {
  const btn = `<div class="theme-primary" id="rewrdBtn"> <span></span>  Rewards</div>`;
  return btn;
};

class RewardBtn {
  constructor() {}

  init(id, config) {
    console.log(config, "from sdk");

    localStorage.setItem("config", JSON.stringify(config.data));
    localStorage.setItem("color", JSON.stringify(config.primaryColor));

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
    const banner = document.querySelector(".points-banner");

    banner.addEventListener("click", () => {
      console.log("inside banner");
      const walletcontainer = document.querySelector("#wallet-container");
      console.log(walletcontainer, "container");
      if (!walletcontainer) {
        mod.appendChild(wallet());
      } else {
        const wallett = document.querySelector(".wallet");

        wallett.style.display = "block";
      }
      const gameArena = document.querySelector(".game-arena");
      gameArena.style.display = "none";
      banner.style.display = "none";

      const backWallet = document.querySelector(".wallet-back");

      backWallet?.addEventListener("click", () => {
        document.querySelector(".wallet").style.display = "none";
        banner.style.display = "flex";

        const gameArena = document.querySelector(".game-arena");
        gameArena.style.display = "block";
      });
    });

    exploreSpin.addEventListener("click", () => {
      const gameArena = document.querySelector(".game-arena");
      gameArena.style.display = "none";
      spinWheelListingRenderer("reward-modal");
      banner.style.display = "none";
    });

    btn.addEventListener("click", () => {
      console.log("btn clicked");

      http.getUserProfile(localStorage.getItem("token")).then((res) => {
        localStorage.setItem("config", JSON.stringify(res.userData));
        console.log(res.userData);
        toggleModal(mod);
        if (banner.style.display === "none") {
          banner.style.display = "flex";
        }
        document.querySelector(
          ".points-wallet"
        ).innerHTML = `${convertToInternationalCurrencySystem(
          res.userData.totalPoints
        )}`;
        const gameArena = document.querySelector(".game-arena");
        gameArena.style.display = "block";
        const wheel = document.querySelector(".spin-wheel-listing-main");
        console.log(wheel);
      });
    });
    changeTheme(config.primaryColor);
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

    const walt = document.querySelector("#wallet-container");

    if (walt) {
      walt.parentNode.removeChild(walt);
    }

    if (child) {
      child.parentNode.removeChild(child);
    }

    // spinWheelListingRenderer("reward-modal");
    if (wrapper) {
      wrapper.parentNode.removeChild(wrapper);
    }

    if (spinBtn) {
      spinBtn.parentNode.removeChild(spinBtn);
    }

    // modal.removeChild(wrapper);
    // modal.removeChild(spinBtn);
    // reward.removeChild(child);
  });
};

function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

function initialize(id, config) {
  const btn = new RewardBtn();
  btn.init(id, config);
}

module.exports = initialize;

const changeTheme = (color) => {
  console.log("change theme");
  document.querySelectorAll(".theme-primary").forEach((item) => {
    console.log("item", item);
    item.style.setProperty("background-color", color, "important");
  });

  document.querySelectorAll(".text-primary").forEach((item) => {
    item.style.setProperty("color", color, "important");
  });
};
