const http = require("./http");
const loyaltyHub = require("./spin-the-wheel");

class SpinWheelListing {
  constructor() {}
  init(id) {
    let parentContainer = document.getElementById(id);

    console.log("parent", parentContainer);

    let containerEl = document.createElement("section");
    containerEl.setAttribute("class", "common-section wheel-list-page-wrapper");
    containerEl.setAttribute("id", "spin-wheel-listing-main");
    let html = `<div class="container-fluid">
                    <div class="row">
                    <div class="col-12 text-left" id="wheel-list-back">
                    < 
</div>
                        <div class="col-12">
                            <p class="wheels-listing-heading">
                            Play and win a chance to earn some points, gems, coupons &amp; rewards
                            </p>
                        </div>
                        <div class="col-12">
                            <div class="row two-blocks" id="two-blocks"></div>
                        </div>
                    </div>
                </div>`;
    containerEl.innerHTML = html;
    parentContainer.appendChild(containerEl);
    console.log(parentContainer, "sda");

    document.querySelector("#wheel-list-back").addEventListener("click", () => {
      parentContainer.removeChild(containerEl);
      document.querySelector(".points-banner").style.display = "flex";
      document.querySelector(".game-arena").style.display = "block";
    });
    setTimeout(() => {
      this.renderListing();
    });
  }

  async renderListing() {
    try {
      let result = await http.getSpinTheWheels();
      this.renderWheelsListing(result.spinWheels);
    } catch (error) {
      console.log(error);
    }
  }

  renderWheelsListing(wheels) {
    let el = document.getElementById("two-blocks");
    for (let wheel of wheels) {
      let mesg = this.getWinningMessage(wheel.benefitsData);
      let elId = `wheel-block-${wheel.id}`;
      let html = `<div class="col-12 col-md-12" class="wheel-block" id=${elId}>
                    <a id="spin-wheel-block" class="wheel-list-wrapper">
                        <div class="wheel-detail">
                            <div class="wd-top">
                                <h2 class="wheel-name line-clamp">${wheel.name}</h2>
                                <img src="https://web-assets.phoenixnhance.com/assets/images/gold-theme/loyalty-hub/spin-the-wheel.svg" alt="Spin The Wheel">
                            </div>
                            <div class="wd-bottom">
                                <p class="wd-bottom-text"><span>Try your luck at winning </span>
                                    ${mesg}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>`;
      el.insertAdjacentHTML("beforeend", html);
    }
    for (let wheel of wheels) {
      let elId = `wheel-block-${wheel.id}`;
      document.getElementById(elId).addEventListener("click", () => {
        this.getSpinWheelById(wheel.id);
      });
    }
  }

  getWinningMessage(benefits) {
    console.log(benefits);
    let benefitArray = [1, 2, 3, 4, 5]; // 1 -> coupon, 2 -> reward, 3 -> point, 4 -> gem, 5 -> message
    if (Array.isArray(benefits) && benefits.length > 0) {
      let benefitContains = [];
      for (let benefit of benefits) {
        if (benefitArray.includes(benefit.benefitType)) {
          if (!benefitContains.includes(benefit.benefitType)) {
            benefitContains.push(benefit.benefitType);
          }
        }
      }
      let sortedBenefitContains = benefitContains.sort((a, b) => a - b);
      let htmlString = " ";
      let coupon = false;
      let reward = false;
      let points = false;
      let gems = false;
      let max = sortedBenefitContains[sortedBenefitContains.length - 1];

      for (let benefit of benefitContains) {
        if (benefit === 1) {
          coupon = true;
          htmlString +=
            '<span><img src="https://kinsta.com/wp-content/uploads/2018/05/kinsta-coupon.png" />Coupon</span>';
        } else if (benefit === 2) {
          reward = true;
          if (max === 2) {
            if (coupon) htmlString += " and ";
          } else {
            if (coupon) htmlString += "<span class='comma'>,</span>";
          }
          htmlString +=
            '<span><img src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ODHBELXXHFG7TL2QRFM7IHZCEE.jpeg" />Reward</span>';
        } else if (benefit === 3) {
          points = true;
          if (max === 3) {
            if (coupon || reward) htmlString += " and ";
          } else {
            if (coupon || reward) htmlString += "<span class='comma'>,</span>";
          }
          htmlString += "<span>Points</span>";
        } else if (benefit === 4) {
          gems = true;
          if (max === 4) {
            if (coupon || reward || points) htmlString += " and ";
          } else {
            if (coupon || reward || points)
              htmlString += "<span class='comma'>,</span>";
          }
          htmlString += "<span>Gems</span>";
        }
      }
      return htmlString;
    }
    return;
  }

  getSpinWheelById(wheelId) {
    this.renderSpinTheWheelDetails(wheelId);
  }

  renderSpinTheWheelDetails(wheelId) {
    let el = document.getElementById("spin-wheel-listing-main");
    el.parentNode.removeChild(el);
    loyaltyHub("reward-modal", {
      wheelId: wheelId,
    });
  }
}

function spinWheelListingRenderer(id) {
  let spinWheelListing = new SpinWheelListing();
  spinWheelListing.init(id);
}

module.exports = spinWheelListingRenderer;
