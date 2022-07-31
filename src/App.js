import "./App.css";
import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/loadContract";

//metamask injects a global api into websites
//this api allows websites to request users, accoutns, read data to blockchain
//send messages and transactions
//with metamask we have an access to window.web3 and window.ethereum

function App() {
  const [web3API, setWeb3API] = useState({
    provider: null,
    web3: null,
    contract: null,
    isProviderLoaded: false,
  });

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [reload, setReload] = useState(false);

  const canConnectToNetwork = account && web3API.contract;
  const reloadEffect = useCallback(() => setReload(!reload), [reload]);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (_) => {
      window.location.reload();
    });
    provider.on("chainChanged", (_) => {
      window.location.reload();
    });
    // provider._jsonRpcConnection.events.on("notification", (payload) => {
    //   const { method } = payload;
    //   if (method === "metamask_unlockStateChanged") {
    //     setAccount(null);
    //   }
    // });
  };

  useEffect(() => {
    const loadProvider = async () => {
      let provider = await detectEthereumProvider();

      if (provider) {
        const contract = await loadContract("Faucet", provider);

        setAccountListener(provider);
        setWeb3API({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true,
        });
      } else {
        setWeb3API((prev) => {
          return { ...prev, isProviderLoaded: true };
        });
        console.log("Insall Metamask");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3API;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };

    web3API.contract && loadBalance();
  }, [web3API, reload]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3API.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3API.web3 && getAccount();
  }, [web3API.web3]);

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3API;
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
    // window.location.reload();
    reloadEffect();
  }, [web3API, account, reloadEffect]);

  const withdraw = async () => {
    const { contract, web3 } = web3API;
    const withdrawalAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawalAmount, {
      from: account,
    });
    // window.location.reload();
    reloadEffect();
  };

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          {web3API.isProviderLoaded ? (
            <>
              <span>
                <strong className="mr-2">Account: </strong>
              </span>
              <span>
                {account ? (
                  account
                ) : !web3API.provider ? (
                  <>
                    <span className="notification is-warning is-size-7 is-rounded">
                      Wallet is not detected.{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://docs.metamask.io"
                      >
                        Install Metamask
                      </a>
                    </span>
                  </>
                ) : (
                  <button
                    className="button is-small"
                    onClick={() =>
                      web3API.provider.request({
                        method: "eth_requestAccounts",
                      })
                    }
                  >
                    Connect Wallet
                  </button>
                )}
              </span>
            </>
          ) : (
            <div>
              <span>Looking for Web3...</span>
            </div>
          )}
          <div className="balance-view is-size-2 my-2">
            Current Balance:{" "}
            <strong>{Math.round(balance * 10000) / 10000}</strong> ETH
          </div>
          {!canConnectToNetwork && (
            <i className="is-block">Connect to Ganache</i>
          )}
          <div className="button-wrapper">
            <button
              className="button is-primary mr-2"
              onClick={addFunds}
              disabled={!canConnectToNetwork}
            >
              Donate 1 ETH
            </button>
            <button
              className="button is-link"
              onClick={withdraw}
              disabled={!canConnectToNetwork}
            >
              Withdraw 0.1 ETH
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
