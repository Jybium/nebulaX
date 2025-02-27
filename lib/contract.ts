import { Contract, ethers } from "ethers";

interface NFTContract {
  on(
    event: "Approval",
    callback: (owner: string, approved: string, tokenId: number) => void
  ): void;
  on(
    event: "ApprovalForAll",
    callback: (owner: string, operator: string, approved: boolean) => void
  ): void;
  on(
    event: "BatchMetadataUpdate",
    callback: (_fromTokenId: number, _toTokenId: number) => void
  ): void;
  on(event: "MetadataUpdate", callback: (_tokenId: number) => void): void;
  on(
    event: "Transfer",
    callback: (from: string, to: string, tokenId: number) => void
  ): void;

  // Functions
  approve(to: string, tokenId: number): Promise<void>;
  balanceOf(owner: string): Promise<number>;
  getApproved(tokenId: number): Promise<string>;
  isApprovedForAll(owner: string, operator: string): Promise<boolean>;
  mintNFT(tokenURI: string): Promise<number>;
  name(): Promise<string>;
  ownerOf(tokenId: number): Promise<string>;
  safeTransferFrom(from: string, to: string, tokenId: number): Promise<void>;
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: number,
    data: string
  ): Promise<void>;
  setApprovalForAll(operator: string, approved: boolean): Promise<void>;
  supportsInterface(interfaceId: string): Promise<boolean>;
  symbol(): Promise<string>;
  tokenURI(tokenId: number): Promise<string>;
  transferFrom(from: string, to: string, tokenId: number): Promise<void>;
}

const getContract = async (
  contractAddress: string,
  contractABI: any
): Promise<Contract & NFTContract> => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new Contract(contractAddress, contractABI, signer) as Contract &
      NFTContract;
  } else {
    console.error("No Ethereum provider found. Please install MetaMask.");
    alert("No Ethereum provider found. Please install MetaMask.");
    throw new Error("No Ethereum provider found");
  }
};

export default getContract;
