import { useAccount, useConnect } from "wagmi";
import { BaseModal } from "../BaseModal";
import SignUpForm from "./SignUpForm";

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export function SignUpModal({ onClose, isOpen, title }: Props) {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { isConnected } = useAccount();

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
        {!isConnected && (
          <div>
            <div className="flex items-start justify-between p-3  rounded-t">
              <h3 className="text-2xl font-semibold text-center">
                Choose a wallet to connect first
              </h3>
            </div>

            <h1>
              {" "}
              choose a wallet to connect below. Oxsequence is the easiest
            </h1>
            <div className="relative p-6 flex-auto">
              <div className="flex flex-col">
                {connectors.map((connector) => (
                  <button
                    className="p-3  bg-soft-pinky text-white mb-2 rounded"
                    disabled={!connector.ready}
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
                  </button>
                ))}

                {error && <div>{error.message}</div>}
              </div>
            </div>
          </div>
        )}
        {isConnected && <SignUpForm />}
      </BaseModal>
    </>
  );
}
