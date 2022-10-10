const modal = () => {
  const html = `
  <header>
    <div>
      <p>Welcome to</p>
      <h3>airbnb rewards</h3>
    </div>
    <span class="close">X</span>
  </header>
  <main>
    <div class="points-banner">
      <div class="points-banner-inner">
        <p>My Reward Points</p>
        <span>Blue Tier</span>
      </div>

      <div class="points-wallet"><span></span> 100</div>
    </div>
  </main>
`;

  const divNode = document.createElement("div");
  divNode.setAttribute("class", "modal hide");
  divNode.innerHTML = html;

  return divNode;
};

module.exports = modal;
