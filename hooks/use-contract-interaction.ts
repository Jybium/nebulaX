import { useState, useEffect } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { toast } from "react-hot-toast";

// Custom hook to fetch the current chain ID.
// function useChainId() {
//   const [chainId, setChainId] = useState<string | null>(null);

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum
//         .request({ method: "eth_chainId" })
//         .then((id: string) => setChainId(id))
//         .catch((error: any) => console.error("Failed to get chainId:", error));
//     }
//   }, []);

//   return chainId;
// }

interface ContractInteractionProps {
  address: `0x${string}`; // Smart contract address
  abi: any[]; // Contract ABI
  functionName: string; // Function name to call
  args?: any[]; // Arguments for the function
  enabled?: boolean; // For read operations—if false, the hook won’t run
  type?: "read" | "write"; // Operation type
  onSuccess?: (data: any) => void; // Callback on success
  onError?: (error: any) => void; // Callback on error
}

export function useContractInteraction({
  address,
  abi,
  functionName,
  args = [],
  enabled = true,
  type = "read",
  onSuccess,
  onError,
}: ContractInteractionProps) {
  // Check wallet connection and network status.
  const { isConnected } = useAccount();
  const { chainId } = useAccount();

  if (type === "read") {
    if (!enabled) {
      return {
        data: undefined,
        isLoading: false,
        error: undefined,
        refetch: () => {},
      };
    }
    const { data, isLoading, error, refetch } = useReadContract({
      address,
      abi,
      functionName,
      args,
    });
    return { data, isLoading, error, refetch };
  }

  if (type === "write") {
    const { writeContract, data, error, isPending } = useWriteContract();

    const write = () => {
      // Check for internet connection.
      if (!navigator.onLine) {
        toast.error("No internet connection. Please check your network.");
        return;
      }
      // Check if the wallet is connected.
      if (!isConnected) {
        toast.error("Please connect your wallet.");
        return;
      }
      // Check if a network (chainId) is available.
      if (!chainId) {
        console.log(chainId);
        toast.error("Please connect to a supported network.");
        return;
      }
      // Proceed with the write transaction.
      writeContract(
        { abi, address, functionName, args },
        {
          onSuccess: (data) => {
            toast.success("Transaction sent!");
            onSuccess?.(data);
          },
          onError: (error) => {
            console.error(error);
            toast.error("Transaction failed!");
            onError?.(error);
          },
        }
      );
    };

    return { write, data, error, isPending };
  }

  return {};
}
