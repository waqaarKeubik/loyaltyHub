const card = (second) => {
  const html = ` <div class="game-arena">
  <h4>Game Arena</h4>
  <p>play games to win points, coupons & rewards</p>
    <div class="card">
      <div class="inner">
        <h6>Wheel of fortune</h6>
        <span>starts at</span>
        <div class="points-wallet">100</div>
        <button class="explore">Explore</button>
      </div>
    </div>
  </div>`;

  const divNode = document.createElement("div");
  divNode.innerHTML = html;

  return divNode;
};
module.exports = card;
