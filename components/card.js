const card = (second) => {
  const html = ` <div class="game-arena">
  <h4>Game Arena</h4>
  <p>play games to win points, coupons & rewards</p>
    <div class="card">
      <div class="inner">
        <h6 class="text-primary">Wheel of fortune</h6>
        <span>starts at</span>
        <div class="points-wallet text-primary">100</div>
        <button class="explore theme-primary">Explore</button>
      </div>
    </div>
  </div>`;

  const divNode = document.createElement("div");
  divNode.setAttribute("id", "card-container");
  divNode.innerHTML = html;

  return divNode;
};
module.exports = card;
