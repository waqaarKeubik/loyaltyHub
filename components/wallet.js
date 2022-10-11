const wallet = (second) => {
  console.log(localStorage.getItem("config"));
  const points = localStorage.getItem("config")
    ? JSON.parse(localStorage.getItem("config"))
    : null;

  const html = ` <div class="wallet">
  <div class="wallet-back"> < back</div>
    <h2>Wallet</h2>
    <h4>Total Points ${points.totalPoints}  </h4>
    </div>`;

  const divNode = document.createElement("div");
  divNode.setAttribute("id", "wallet-container");
  divNode.innerHTML = html;

  return divNode;
};
module.exports = wallet;
