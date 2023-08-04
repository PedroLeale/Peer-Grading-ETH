import { useAuth } from "@/lib/services/contexts/AuthContext/context";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { signTypedData } from "@wagmi/core";
import { domain, types } from "@/types/SignInTypedData";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { ColoredBadge } from "../ColoredBadge";

export function Wallets() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { isLoggedIn, login, logout } = useAuth();
  const router = useRouter();
  const { isConnected, address } = useAccount();

  const handleLogout = () => {
    try {
      logout();
      disconnect();
      toast.success("logged out");
      router.push("home");
    } catch (e) {
      console.log(e);
      toast.error("coldn't logout");
    }
  };

  const handleLogin = async () => {
    const timestamp = new Date().toString();
    try {
      const signature = await signTypedData({
        domain,
        value: {
          timestamp,
        },
        types,
      });

      const res = await axios.post("/api/sign-in", { signature, timestamp });

      login(res.data.jwt);
      // Set a cookie

      toast.success("signed in");
    } catch (e: any) {
      if (e.response.data.error) {
        toast.error(e.response.data.error);
        return;
      }
      if (e.message) toast.error(e.message);
    }
  };

  return (
    <div className="items-center flex-col">
      {address && (
        <div className="flex flex-col items-center mb-4">
          {isLoggedIn ? (
            <span> currently connected with:</span>
          ) : (
            <span> connecting with: </span>
          )}

          <ColoredBadge>{address}</ColoredBadge>
        </div>
      )}
      {!isConnected && (
        <div>
          <div className="flex items-start justify-between p-3  rounded-t">
            <h3 className="text-2xl font-semibold text-center">
              Choose a wallet to connect
            </h3>
          </div>

          <h1> choose a wallet to connect below. Oxsequence is the easiest</h1>
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
      <div className="flex flex-col items-center">
        {!isLoggedIn && isConnected && (
          <Button
            className="w-1/2 items mt-5 mb-4"
            onClick={() => {
              handleLogin();
            }}
          >
            sign in with your wallet
          </Button>
        )}
        <div className="flex flex-row">
          {isLoggedIn && (
            <div className="mr-3">
              <button
                className="bg-[#b23b3b] hover:bg-[#6b1d1d] text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleLogout();
                }}
              >
                logout
              </button>
            </div>
          )}
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
