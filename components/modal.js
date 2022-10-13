const modal = () => {
  const points = localStorage.getItem("config");

  const html = `
  <header>
    <div>
      <p>Welcome to</p>
      <h3>airbnb rewards</h3>
    </div>
    <span class="close">&times;</span>
  </header>
  <main>
    <div class="points-banner theme-primary">
      <div class="points-banner-inner">
        <p>My Reward Points</p>
      </div>

      <div class="points-wallet text-primary">100</div>
    </div>
  </main>
`;

  const divNode = document.createElement("div");

  divNode.setAttribute("class", "modal hide");
  divNode.innerHTML = html;

  return divNode;
};

module.exports = modal;
