import React, { useState } from "react";
import styled from "styled-components";

const Style = {
  Content: styled.section`
    transition: 0.3s;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 10px 15px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 10px 0;

    &:hover {
      cursor: pointer;
      background-color: #e6e6e6;
    }

    > * {
      flex: 0 0 50%;
      margin: 0;
    }
  `,
  BasicInfo: styled.div`
    > * {
      display: block;
    }
  `,
};

function Building(props) {
  const { name, qnt, price, mult, qntBought } = props;

  function returnValue(newPrice, newQuant) {
    props.parentCallback({ newPrice, newQuant });
  }

  function buyUpgrade() {
    let value = price,
      quant = qnt,
      newPrice = Math.ceil(value + (value * 20) / 100),
      newQuant = quant + qntBought;

    if (props.currentBeerSold > value) {
      returnValue(newPrice, newQuant);
    } else {
      console.log("Sem cerveja sucifiente");
    }
  }

  return (
    <div onClick={buyUpgrade}>
      <Style.Content>
        <div>
          <h1>{name}</h1>
        </div>
        <Style.BasicInfo>
          <span>{qnt || 0}</span>
          <span>{price}</span>
        </Style.BasicInfo>
      </Style.Content>
    </div>
  );
}

export default Building;
