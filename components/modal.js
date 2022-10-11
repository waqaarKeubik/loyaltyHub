const modal = () => {
  const points = localStorage.getItem("config");
  console.log(points);
  if (points) {
    console.log(points, "points");
  }
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
