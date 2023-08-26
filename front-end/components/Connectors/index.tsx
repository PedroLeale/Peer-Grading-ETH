import { useConnect } from "wagmi";
import { PrimaryButton } from "../Butons/PrimaryButton";
import { MetaMaskButton } from "../Butons/MetamaskButton";
import { SequenceButton } from "../Butons/SequenceButton";
import { WalletConnect } from "../Butons/WalletConnectButton";

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
            <PrimaryButton
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
            </PrimaryButton>
          );
        })}

        {error && <div>{error.message}</div>}
      </div>

      <span className="mt-2 text-sm text-right underline text-[#3366CC] cursor-pointer ">
        Entenda mais sobre carteiras e o nosso método de login clicando aqui
      </span>
    </div>
  );
};
