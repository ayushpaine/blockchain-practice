import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

//metamask injects a global api into websites
//this api allows websites to request users, accoutns, read data to blockchain
//send messages and transactions
//with metamask we have an access to window.web3 and window.ethereum

function App() {
  const [web3API, setWeb3API] = useState({
    provider: null,
    web3: null,
  });

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      let provider = await detectEthereumProvider();

      if (provider) {
        setWeb3API({
          web3: new Web3(provider),
          provider,
        });
      } else {
        console.log("Insall Metamask");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3API.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3API.web3 && getAccount();
  }, [web3API.web3]);

  console.log(account);
  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <span>
            <strong className="mr-2">Account: </strong>
          </span>
          <span>
            {account ? (
              account
            ) : (
              <button
                className="button is-small"
                onClick={() =>
                  web3API.provider.request({ method: "eth_requestAccounts" })
                }
              >
                Connect Wallet
              </button>
            )}
          </span>
          <div className="balance-view is-size-2 my-2">
            Current Balance: <strong>10</strong> ETH
          </div>
          <div className="button-wrapper">
            <button className="button is-primary mr-2">Donate</button>
            <button className="button is-link ">Withdraw</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
