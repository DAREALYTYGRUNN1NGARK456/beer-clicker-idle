const TargetToClick = document.getElementById("TargetToClick");
const Pointers = document.getElementById("Pointers");
const UpgradeOne = document.getElementById("upgradeOne");
const UpgradeTwo = document.getElementById("upgradeTwo");
const CPSpan = document.getElementById("CPSpan");

let credits = 0,
  cps = 0;

const upgrades = [
  { name: "upgradeOne", price: 10, cps: 1 },
  { name: "upgradeTwo", price: 100, cps: 10 },
];

function CalculateUpgrade() {
  const upgradesEnables = upgrades.filter((upgrade) => upgrade.price < credits);

  upgradesEnables.forEach((upgrade) => {
    document.getElementById(upgrade.name).disabled = false;
  });
}

function ClickOnTarget() {
  credits += 1;
}

function Upgrade(id) {
  const currentUpgrade = upgrades.find((upgrade) => id === upgrade.name);
  cps += currentUpgrade.cps;
}

function Draw() {
  credits = credits + cps / 60;
  Pointers.innerHTML = credits.toFixed(0);
  CPSpan.innerHTML = `Credits per seconds: ${cps}`;
}

var mainloop = function () {
  CalculateUpgrade(), Draw();
};

window.onload = () => setInterval(mainloop, 16);
