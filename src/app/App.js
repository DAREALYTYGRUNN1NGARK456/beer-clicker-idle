import React, { useState } from "react";
import styled from "styled-components";

import Cursor from "../buildings/cursor";
import { Colors, Devices } from "../utils/_style";

const Style = {
  Container: styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100vh;

    > div {
      text-align: center;
    }
  `,
  Clicker: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 100%;

    @media ${Devices.laptop} {
      flex: 0 0 50%;
    }
  `,
  Store: styled.div`
    flex: 0 0 100%;

    @media ${Devices.laptop} {
      flex: 0 0 50%;
    }
  `,
  BuildingContainer: styled.div``,
  BuildingQntContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
  `,
  QntToBuy: styled.div`
    transition: 0.2s;
    padding: 5px;
    margin: 0 5px;
    color: ${(props) => (props.activated ? Colors.yellow : Colors.grey)};
    font-weight: ${(props) => (props.activated ? "bolder" : "")};

    &:hover {
      cursor: pointer;
      background-color: #c6c6c6;
      border-radius: 3px;
      color: white;
    }
  `,
  UpgradesContainer: styled.div``,
  Version: styled.div`
    border: none;
    font-weight: bolder;
    position: fixed;
    bottom: 10px;
    left: 10px;
  `,
};

function App(props) {
  const [beerSold, setBeerSold] = useState(0);
  const [quantToBuy, setQuantToBuy] = useState(1);
  const [globalAutoClick, setGlobalAutoClick] = useState(0);
  const [buildsQnt, setBuildsQnt] = useState(0);

  function updateAfterBuy(objReceived) {
    let currentBeerDrinked = beerSold - objReceived.currentPriceBeforeUpdate,
      currentMultiplier = globalAutoClick;

    setBuildsQnt(buildsQnt + quantToBuy);
    setGlobalAutoClick(globalAutoClick + objReceived.autoClick);
    setBeerSold(currentBeerDrinked);
  }

  function clickDrinkBeer() {
    let num = beerSold;
    setBeerSold(++num);
  }

  function updateQuantToBuy(value) {
    setQuantToBuy(value);
  }

  if (buildsQnt) {
    setTimeout(() => {
      setBeerSold(beerSold + globalAutoClick);
    }, 1000);
  }

  return (
    <Style.Container>
      <Style.Clicker>
        <div>
          <h1>Beers Sold R${beerSold}</h1>
          <button name="beer" type="button" onClick={clickDrinkBeer}>
            Beer
          </button>
        </div>
      </Style.Clicker>
      <Style.Store>
        <h1>Store</h1>
        <Style.UpgradesContainer>
          <h3>Upgrades</h3>
        </Style.UpgradesContainer>
        <Style.BuildingContainer>
          <h3>Buildings</h3>
          <Style.BuildingQntContainer>
            <Style.QntToBuy
              activated={quantToBuy === 1 ? true : false}
              onClick={() => updateQuantToBuy(1)}
            >
              1
            </Style.QntToBuy>
            <Style.QntToBuy
              activated={quantToBuy === 10 ? true : false}
              onClick={() => updateQuantToBuy(10)}
            >
              10
            </Style.QntToBuy>
            <Style.QntToBuy
              activated={quantToBuy === 100 ? true : false}
              onClick={() => updateQuantToBuy(100)}
            >
              100
            </Style.QntToBuy>
          </Style.BuildingQntContainer>
          <Cursor
            currentBeerSold={beerSold}
            updateAppAfterBuy={updateAfterBuy}
            qntBought={quantToBuy}
          />
        </Style.BuildingContainer>
      </Style.Store>
      <Style.Version>
        <span>v0.01 - alpha</span>
      </Style.Version>
    </Style.Container>
  );
}

export default App;
