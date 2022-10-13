const http = require("./http");

class SpinWheel {
  constructor(obj) {
    this.wheelId = obj.wheelId;
    this.colorIndex = ["green", "blue", "purple", "yellow", "orange"];
    this.prizes = [];
  }

  async init(id) {
    let { spinWheels } = await this.spinWheelDetails(this.wheelId);
    this.renderDetails(id, spinWheels);
  }

  renderDetails(id, spinWheels) {
    let parentContainer = document.getElementById(id);
    let containerEl = document.createElement("div");
    containerEl.setAttribute("class", "wheel-wrapper");
    this.renderPointer(containerEl);
    this.renderStand(containerEl);
    this.renderCenterCircle(containerEl);
    this.renderWheel(containerEl);

    parentContainer.appendChild(containerEl);
    this.renderActions(parentContainer);

    this.prizes = spinWheels.benefitsData;
  }

  async spinWheelDetails(id) {
    try {
      let result = await http.getSpinTheWheelDetails(
        id,
        localStorage.getItem("token")
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  renderPointer(el) {
    let pointerEl = document.createElement("div");
    pointerEl.setAttribute("class", "wheel-pointer");
    el.appendChild(pointerEl);
  }

  renderStand(el) {
    let html = `<div class="wheel-stand">
                      <div class="stand-bulb"></div>
                      <div class="stand-bulb"></div>
                      <div class="stand-bulb"></div>
                      <div class="stand-bulb"></div>
                      <div class="stand-bulb"></div>
                      <div class="stand-bulb"></div>
                      <div class="stand-bulb"></div>
                  </div>`;
    el.insertAdjacentHTML("beforeend", html);
  }

  renderCenterCircle(el) {
    let html = `<div class="wheel-inner-circle" id="wheel-inner-circle">
      <h3 class="text">coupons and rewards</h3>
   </div>`;
    el.insertAdjacentHTML("beforeend", html);
  }

  renderWheel(el) {
    let html = `<div class="wheel-bg">
    <div class="wheel-bulb"></div>
    <div class="wheel-bulb"></div>
    <div class="wheel-bulb"></div>
    <div class="wheel-bulb"></div>
    <div class="wheel-bulb"></div>
    <div class="wheel-bulb"></div>
    <div class="wheel-bulb"></div>
    <div class="prize-list" id="prize-list">
    </div>
    <div class="final-result-wrapper" id="final-result-wrapper" style="display: none;">
      <div class="final-status" id="final-status">
      </div>
    </div>
   </div>`;
    el.insertAdjacentHTML("beforeend", html);
    setTimeout(() => {
      this.renderPrize();
    });
  }

  renderPrize() {
    let el = document.getElementById("prize-list");
    el.style.transform = "rotate(18deg)";
    this.renderItemWrapper(el);
  }

  renderItemWrapper(el) {
    let config = this.getRotationAndSkew(this.prizes.length);
    if (!config) return;
    this.prizes.forEach((item, i) => {
      let prizeItemWrapper = document.createElement("div");
      if (this.prizes.length > 3) {
        prizeItemWrapper.setAttribute("class", "prize-item-wrapper more");
      } else {
        prizeItemWrapper.setAttribute("class", "prize-item-wrapper less");
      }
      prizeItemWrapper.style.transform =
        "rotate(" +
        config.rotateAngleArray[i] +
        "deg ) skewY(" +
        config.parentSliceSkewY +
        "deg)";
      prizeItemWrapper.style.backgroundColor = this.colorIndex[i];

      // // child
      let prizeChild = document.createElement("div");
      prizeChild.setAttribute("class", "prize-item");
      let translateY = this.prizes.length === 3 ? 75 : 0;
      prizeChild.style.transform =
        "skewY(" +
        config.childSliceSkewY +
        "deg) rotate(" +
        config.rotateTextContainer +
        "deg) translateY(" +
        translateY +
        "px)";

      let htmlString = "";
      htmlString += "<div>";
      htmlString += "<div>";
      if (item.benefitType === 1) {
        htmlString +=
          "<img height='30' width='30' src='https://web-assets.phoenixnhance.com/assets/images/gold-theme/home/coupons.svg' />";
      } else if (item.benefitType === 2) {
        htmlString +=
          "<img height='30' width='30' src='https://web-assets.phoenixnhance.com/assets/images/gold-theme/home/rewards.svg' />";
      } else if (item.benefitType === 3) {
        htmlString +=
          "<img height='30' width='30' src='https://static.vecteezy.com/system/resources/previews/006/871/898/non_2x/cardano-crypto-flat-icon-free-vector.jpg' />";
      } else if (item.benefitType === 4) {
        htmlString +=
          "<img height='30' width='30' src='https://cdn-icons-png.flaticon.com/512/539/539043.png' />";
      } else if (item.benefitType === 6) {
        htmlString +=
          "<img height='40' width='40' style='margin-bottom: -10px;' src='https://assets-global.website-files.com/5ecc205eb8d8da8c91a5e7cb/5f10daa267d7ca57ec3768eb_Group%20171.png' />";
      }
      htmlString += "</div>";
      htmlString += "<div class='benefit'>";
      if (item.benefitType === 3 || item.benefitType === 4) {
        htmlString += `<span class="value">${item.value}</span>`;
      } else if (item.benefitType === 1 || item.benefitType === 2) {
        htmlString += `<img height="20" width="20" src=${item.logo} alt="logo">`;
      }
      htmlString += "</div>";
      htmlString += "</div>";

      prizeChild.innerHTML = htmlString;
      prizeItemWrapper.append(prizeChild);

      el.appendChild(prizeItemWrapper);
    });
  }

  renderActions(el) {
    let buttonEl = document.createElement("button");
    buttonEl.setAttribute("id", "spin-now");
    buttonEl.setAttribute("class", "theme-primary");

    buttonEl.innerText = "Spin now";
    el.appendChild(buttonEl);

    let back = document.createElement("span");
    back.innerHTML = `  <div class="wheel-back"> < </div>`;
    el.appendChild(back);

    back.addEventListener("click", () => {
      const wrap = document.querySelector(".wheel-wrapper");
      const spin = document.querySelector("#spin-now");
      const points = document.querySelector(".points-banner");
      const game = document.querySelector(".game-arena");
      const whlBck = document.querySelector(".wheel-back");

      points.style.display = "flex";
      game.style.display = "block";
      http.getUserProfile(localStorage.getItem("token")).then((res) => {
        document.querySelector(
          ".points-wallet"
        ).innerHTML = `${convertToInternationalCurrencySystem(
          res.userData.totalPoints
        )}`;
      });

      wrap.remove();
      spin.remove();
      whlBck.parentNode.remove();
    });

    buttonEl.addEventListener("click", (e) => {
      this.spinNow(buttonEl);
    });
  }

  async spinNow(buttonEl) {
    try {
      let obj = {
        spinWheelId: this.wheelId,
      };
      let result = await http.spinNow(obj);
      buttonEl.disabled = true;
      let indexIs = this.prizes.findIndex((p) => {
        return p.benefitId === result.benefitId;
      });
      this.calcualtePrize(indexIs + 1, result);
    } catch (error) {
      console.log(error);
    }
  }

  calcualtePrize(winningIndex, result) {
    let rotatingAngle = (360 / this.prizes.length) * winningIndex;
    let getRandomNumber = this.getRandomArbitrary(1, 360 / this.prizes.length);
    let degreeToRotate = 360 * 4 + (360 - (rotatingAngle - getRandomNumber));

    let el = document.getElementById("prize-list");
    el.style.transform = "rotate(" + degreeToRotate + "deg)";
    setTimeout(() => {
      this.removeWheelAndShowPrize(result);
    }, 4500);
  }

  removeWheelAndShowPrize(prize) {
    let el1 = document.getElementById("wheel-inner-circle");
    let el2 = document.getElementById("prize-list");
    let el3 = document.getElementById("final-result-wrapper");
    el1.style.display = "none";
    el2.style.display = "none";
    el3.style.display = "block";

    this.showPrize(prize);
  }

  showPrize(prize) {
    let el = document.getElementById("final-status");

    let htmlString = "";
    if (prize.benefitType === 1) {
      htmlString += `<div class='icon'><img src=${prize.benefit.logo} /></div>`;
      htmlString += `<div class='value'>You won a Reward from ${prize.benefit.retailerName}</div>`;
    } else if (prize.benefitType === 2) {
      htmlString += `<div class='icon'><img src=${prize.benefit.logo} /></div>`;
      htmlString += `<div class='value'>You won a Reward from ${prize.benefit.retailerName}</div>`;
    } else if (prize.benefitType === 3) {
      htmlString += `<div class='icon'><img src="https://static.vecteezy.com/system/resources/previews/006/871/898/non_2x/cardano-crypto-flat-icon-free-vector.jpg" /></div>`;
      htmlString += `<div class='value'>${prize.amount}</div>`;
    } else if (prize.benefitType === 4) {
      htmlString += `<div class='icon'><img src="https://cdn-icons-png.flaticon.com/512/539/539043.png" /></div>`;
      htmlString += `<div class='value'>${prize.amount}</div>`;
    } else {
      htmlString += `<div class='icon'><img src="https://assets.website-files.com/62253ac894f6a17c1728df15/62259b1a79a5082a898cf074_kingemail.svg" /></div>`;
      htmlString += `<div class='value'>${prize.messageText}</div>`;
    }
    // console.log(htmlString)
    el.innerHTML = htmlString;
    console.log(el);
    console.log(htmlString);
    el.appendChild(htmlString);
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  getRotationAndSkew(prizesLength) {
    if (prizesLength >= 3 && prizesLength <= 12) {
      let sliceAngle = 360 / prizesLength;
      let rotateAngleArray = [];
      for (let i = 0; i < prizesLength; i++) {
        rotateAngleArray.push(sliceAngle * i);
      }

      let parentSliceSkewY = -(90 - sliceAngle);
      let childSliceSkewY = -parentSliceSkewY;
      let rotateTextContainer = sliceAngle / 2;

      return {
        rotateAngleArray,
        parentSliceSkewY,
        childSliceSkewY,
        rotateTextContainer,
      };
    } else {
      console.warn("Prizes length must be between 3 and 12");
      return undefined;
    }
  }
}

function spinWheelRenderer(id, obj) {
  let spinWheel = new SpinWheel(obj);
  spinWheel.init(id);
}

module.exports = spinWheelRenderer;

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
