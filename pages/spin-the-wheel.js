class SpinWheel {
  constructor() {
    this.prizes = [];
  }

  init(id) {
    let parentContainer = document.getElementById(id);
    let containerEl = document.createElement("div");
    containerEl.setAttribute("class", "wheel-wrapper");
    this.renderPointer(containerEl);
    this.renderStand(containerEl);
    this.renderCenterCircle(containerEl);
    this.renderWheel(containerEl);

    parentContainer.appendChild(containerEl);
    this.renderActions(parentContainer);

    this.prizes = [
      {
        rotate: 0,
        backgroundColor: "green",
      },
      {
        rotate: 72,
        backgroundColor: "red",
      },
      {
        rotate: 144,
        backgroundColor: "yellow",
      },
      {
        rotate: 216,
        backgroundColor: "blue",
      },
      {
        rotate: 288,
        backgroundColor: "orange",
      },
      {
        rotate: 288,
        backgroundColor: "blue",
      },
      {
        rotate: 288,
        backgroundColor: "red",
      },
      // {
      //   rotate: 288,
      //   backgroundColor: "fuchsia",
      // },
      // {
      //   rotate: 288,
      //   backgroundColor: "navy",
      // },
      // {
      //   rotate: 288,
      //   backgroundColor: "teal",
      // },
      // {
      //   rotate: 288,
      //   backgroundColor: "teal",
      // },
      // {
      //   rotate: 288,
      //   backgroundColor: "greenyellow",
      // },
    ];
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
    let html = `<div class="wheel-inner-circle">
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
      prizeItemWrapper.style.backgroundColor = item.backgroundColor;

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
      prizeChild.innerHTML = `<div><h3>${
        i + 1
      }</h3><br><img height="20" width="20" src="https://d3honpllbqpyr6.cloudfront.net/retailerDetails/2022/5/6/37483200439-1-2022-5-6.png" alt="logo"></div>`;
      prizeItemWrapper.append(prizeChild);

      el.appendChild(prizeItemWrapper);
    });
  }

  renderActions(el) {
    let buttonEl = document.createElement("button");
    buttonEl.setAttribute("id", "spin-now");
    buttonEl.innerText = "Spin now";
    el.appendChild(buttonEl);

    buttonEl.addEventListener("click", (e) => {
      this.calcualtePrize(el);
    });
  }

  calcualtePrize() {
    let winningIndex = 4;
    let rotatingAngle = (360 / this.prizes.length) * winningIndex;
    let getRandomNumber = this.getRandomArbitrary(1, 360 / this.prizes.length);
    let degreeToRotate = 360 * 4 + (360 - (rotatingAngle - getRandomNumber));

    let el = document.getElementById("prize-list");
    el.style.transform = "rotate(" + degreeToRotate + "deg)";
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

function spinWheelRenderer(id) {
  let spinWheel = new SpinWheel();
  spinWheel.init(id);
}

module.exports = spinWheelRenderer;
