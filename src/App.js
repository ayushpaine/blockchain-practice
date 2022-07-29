import "./App.css";
import { useEffect } from "react";

//metamask injects a global api into websites
//this api allows websites to request users, accoutns, read data to blockchain
//send messages and transactions
//with metamask we have an access to window.web3 and window.ethereum

function App() {
  useEffect(() => {
    const loadProvider = async () => {};

    loadProvider();
  }, []);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="balance-view is-size-2">
            Current Balance: <strong>10</strong> ETH
          </div>
          <div
            className="button-wrapper"
            onClick={async () => {
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              console.log(accounts);
            }}
          >
            <button className="btn mr-2">Enable Ethereum</button>
            <button className="btn mr-2">Donate</button>
            <button className="btn">Withdraw</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
