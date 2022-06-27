class SpinWheelListing {
  constructor() {}
  init(id) {
    let parentContainer = document.getElementById(id);
    let containerEl = document.createElement("section");
    containerEl.setAttribute("class", "common-section wheel-list-page-wrapper");
    let html = `<div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="heading3-text arrow-btn-container">
                            <a class="previous-arrow-btn"></a>Spin the wheel
                            </h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="wheels-listing-heading">
                            Play and win a chance to earn some points, gems, coupons &amp; rewards
                            </p>
                        </div>
                        <div class="col-12">
                            <div class="row two-blocks"></div>
                        </div>
                    </div>
                </div>`;
    containerEl.innerHTML = html;
    console.log(containerEl);
    this.renderListing(parentContainer);
    parentContainer.appendChild(containerEl)
  }

  renderListing(el) {
    console.log(el);
  }
}

function spinWheelListingRenderer(id) {
  let spinWheelListing = new SpinWheelListing();
  spinWheelListing.init(id);
}

module.exports = spinWheelListingRenderer;
