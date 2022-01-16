import React from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import "./App.css";

const App = () => {
  const alanAIRef = React.useRef(null);
  const [orderList, setOrderList] = React.useState([]);

  React.useEffect(() => {
    alanAIRef.current = alanBtn({
      key: process.env.REACT_APP_ALAN_API_KEY,
      onCommand: function (commandData) {
        switch (commandData.command) {
          case "add": {
            const { item } = commandData;
            setOrderList((orLst) => {
              return [...orLst, item];
            });
            break;
          }
          case "clear": {
            setOrderList([]);
            break;
          }
          default:
            break;
        }
      },
    });
  }, []);

  return (
    <div className="app">
      <h1>Demo Restaurant</h1>
      <p>
        Place Order just by clicking on Alan AI voice button
        <br />
        And say "Pizza", "Burger", or any items
      </p>

      <div className="order-container">
        {orderList && orderList.length > 0 ? (
          <>
            <p>Your Order for</p>
            <ul className="order-list">
              {orderList.map((order, index) => (
                <li className="order-list-item" key={index}>
                  {order}
                </li>
              ))}
            </ul>
            <label>have been placed</label>
          </>
        ) : (
          "No order Placed Yet"
        )}
      </div>
    </div>
  );
};

export default App;
