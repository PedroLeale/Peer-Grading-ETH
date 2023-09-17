import { useConnect } from "wagmi";
import { MetaMaskButton } from "../Butons/MetamaskButton";
import { SequenceButton } from "../Butons/SequenceButton";
import { WalletConnect } from "../Butons/WalletConnectButton";
import { ImageButton } from "../Butons/ImageButton";

export const Connectors = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div className="relative p-6 flex-auto">
      <div className="flex flex-col">
        {connectors.map((connector) => {
          if (connector.name === "MetaMask")
            return (
              <MetaMaskButton
                className="mb-2 rounded-md"
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                }}
              />
            );

          if (connector.name === "Sequence")
            return (
              <SequenceButton
                className="mb-2 rounded-md"
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                }}
              ></SequenceButton>
            );

          if (connector.name === "WalletConnect")
            return (
              <WalletConnect
                className="mb-2 rounded-md"
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                }}
              ></WalletConnect>
            );

          return (
            <ImageButton
              className="mb-2 rounded-md"
              key={connector.id}
              onClick={() => {
                connect({ connector });
              }}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </ImageButton>
          );
        })}

        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
};
