import { useReadContract, useWriteContract } from "wagmi";
import { toast } from "react-hot-toast";

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
  if (type === "read") {
    if (!enabled) {
      return {
        data: undefined,
        isLoading: false,
        error: undefined,
        refetch: () => {},
      };
    }
    // Call the read hook with our parameters.
    const { data, isLoading, error, refetch } = useReadContract({
      address,
      abi,
      functionName,
      args,
    });
    return { data, isLoading, error, refetch };
  }

  if (type === "write") {
    // For writes, first obtain the writeContract function from the hook.
    const { writeContract, data, error, isPending } = useWriteContract();

    const write = () => {
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
