import { useAccount, useDisconnect } from "wagmi";
import { Connectors } from "../Connectors";

import { ColoredBadge } from "../ColoredBadge";

export function Wallets() {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  return (
    <div className="items-center flex-col">
      {address && <ColoredBadge>{address}</ColoredBadge>}
      {!isConnected && (
        <div>
          <div className="flex items-start justify-between p-3  rounded-t">
            <h3 className="text-2xl font-semibold text-left">
              Connect your wallet below
            </h3>
          </div>

          <Connectors />
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="flex flex-row mt-2">
          {isConnected && (
            <button
              className="bg-[#b23b3b] hover:bg-[#6b1d1d] text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                disconnect();
              }}
            >
              disconnect wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
