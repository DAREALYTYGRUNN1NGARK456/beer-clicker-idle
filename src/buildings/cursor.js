import React, { useState } from "react";
import Building from "../components/building";

function Cursor(props) {
  const [name] = useState("Cursor");
  const [desc] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque finibus felis, ac condimentum lacus porta vitae. Morbi volutpat hendrerit sapien a finibus."
  );
  const [quant, setQuant] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(13);
  const [autoClick, setAutoClick] = useState(0.1);
  const [multiplier, setMultiplier] = useState(0.1);

  function updateBuildingAfterBuy(objReceived) {
    let currentPriceBeforeUpdate = currentPrice;

    setCurrentPrice(objReceived.newPrice);
    setQuant(objReceived.newQuant);

    props.updateAppAfterBuy({ currentPriceBeforeUpdate, autoClick, quant });
  }

  return (
    <Building
      name={name}
      qnt={quant}
      price={currentPrice}
      mult={multiplier}
      currentBeerSold={props.currentBeerSold}
      qntBought={props.qntBought}
      parentCallback={updateBuildingAfterBuy}
    />
  );
}

export default Cursor;
