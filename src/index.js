const TargetToClick = document.getElementById("TargetToClick");
const Pointers = document.getElementById("Pointers");
const UpgradeOne = document.getElementById("upgradeOne");
const UpgradeTwo = document.getElementById("upgradeTwo");
const CPSpan = document.getElementById("CPSpan");
const Version = document.getElementById("currentVersion");

// PASS THIS TO .ENV
const VERSION = "0.0.1";
const TARGET = "dev";

Version.innerHTML = `VERSION: ${VERSION} | TARGET: ${TARGET}`;

let credits = 0,
  cps = 0;

const UpgradesList = [];
const BuildsList = [
  {
    id: 1,
    name: "Build one",
    price: 10,
    cps: 1,
    upgrades: [
      { id: 11, name: "1 - Upgrade one", price: 100, bought: false },
      { id: 12, name: "1 - Upgrade two", price: 1000, bought: false },
    ],
  },
  {
    id: 2,
    name: "Build two",
    price: 100,
    cps: 10,
    upgrades: [
      { id: 21, name: "2 - Upgrade one", price: 100, bought: false },
      { id: 22, name: "2 - Upgrade two", price: 1000, bought: false },
    ],
  },
];

function createUpgradeButtons() {
  const btnUpgradesList = [];

  if (UpgradesList.length === 0) {
    BuildsList.forEach((build) => {
      UpgradesList.push.apply(UpgradesList, build.upgrades);
    });
  }

  UpgradesList.forEach((upgrades) => {
    if (upgrades.bought) return;

    btnUpgradesList.push(
      `<button id="${upgrades.id}" class="btn-item" onclick="BuyUpgrade(this.id)" disabled>${upgrades.name}</button>`
    );
  });

  document.getElementById("upgradelist").innerHTML = "";
  document.getElementById("upgradelist").innerHTML = `${btnUpgradesList.join(
    ""
  )}`;
}

function CreateGamePage() {
  const btnList = [];

  BuildsList.forEach((build) => {
    btnList.push(
      `<button id="${build.id}" class="btn-item" onclick="BuyBuild(this.id)" disabled>${build.name}</button>`
    );
  });

  createUpgradeButtons();

  document.getElementById("buildinglist").innerHTML = `${btnList.join("")}`;
}

function CalculateStoreStatus() {
  const buildsEnables = BuildsList.filter((build) => build.price < credits);

  buildsEnables.forEach((build) => {
    document.getElementById(build.id).disabled = false;
  });

  const upgradesEnables = UpgradesList.filter(
    (upgrade) => upgrade.price < credits
  );

  upgradesEnables.forEach((upgrade) => {
    if (upgrade.bought) return;
    document.getElementById(upgrade.id).disabled = false;
  });
}

function ClickOnTarget() {
  credits += 1;
}

function verifyIfHasCredit(price) {
  let result = credits - price;

  if (credits === 0 || result < 0) {
    alert("Voce não tem dinheiro suficiente");
    return false;
  }

  return true;
}

function BuyBuild(id) {
  const currentBuild = BuildsList.find((build) => Number(id) === build.id);

  if (verifyIfHasCredit(currentBuild.price) === false) return;

  credits -= currentBuild.price;
  cps += currentBuild.cps;
}

function BuyUpgrade(id) {
  const currentUpgrade = UpgradesList.find(
    (upgrade) => Number(id) === upgrade.id
  );

  if (!verifyIfHasCredit(currentUpgrade.price)) return;

  const index = UpgradesList.findIndex((obj) => obj.id === currentUpgrade.id);

  UpgradesList.splice(index, 1, { ...currentUpgrade, bought: true });

  credits -= currentUpgrade.price;
  createUpgradeButtons();
}

function Draw() {
  credits = credits + cps / 60;
  Pointers.innerHTML = credits.toFixed(0);
  CPSpan.innerHTML = `Credits per seconds: ${cps}`;
}

let mainloop = function () {
  CalculateStoreStatus(), Draw();
};

window.onload = () => {
  CreateGamePage();
  setInterval(mainloop, 16);
};
