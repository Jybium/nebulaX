# NebulaX

**NebulaX** is a groundbreaking decentralized video DEX NFT platform designed to empower creators worldwide. Our vision is to provide a secure, transparent, and engaging marketplace where creators can upload, mint, and trade their video and image content—free from centralized gatekeeping and unreliable monetization systems.

---

## What It Does

**For Creators (Sellers):**  
- **Connect Wallet:** Seamless wallet integration allows creators to securely access the platform.  
- **Content Upload & Minting:** Creators can upload their video and image content and mint it as an NFT using ERC721/1155 standards. (Note: Due to a smart contract bug, videos are currently minted as images.)  
- **Set Product Details:** Assign unique token IDs, add descriptions, and set pricing for each NFT.

**For Buyers:**  
- **Secure Purchase:** Buyers can connect their wallets, browse the marketplace, and purchase NFTs with confidence.  
- **Engagement through Gamification:**  
  - **Daily Spinning Wheel:** Users can spin once a day to win bonus NebX tokens (our in-app currency). Currently, the spinning wheel UI displays correctly but does not yet award tokens.  
  - **Raffle Draw:** Intended to foster community spirit by allowing users to create raffles for NFTs with set start/end dates and ticket sales; presently, it appears as a static table awaiting full logic integration.

---

## How It Was Made & Tools Used

- **User Interface & Design:**  
  - Figma for initial design prototypes.  
  - Tailwind CSS and React for a responsive, mobile-friendly front-end.

- **Smart Contract Development:**  
  - Developed using Remix for initial testing, Hardhat for deployment, and the OpenZeppelin library for secure contract standards.  
  - Deployed on the **ABC Testnet**.

- **Automation & Backend:**  
  - Gelato is used for scheduled tasks and automation, ensuring seamless, recurring processes without manual intervention.

- **Additional Tools:**  
  - ABC Testing for blockchain testing to validate our deployment and functionality.

---

## Challenges & Current Status

**What’s Working:**  
- **Wallet Connectivity & NFT Minting:** Users can successfully connect wallets, upload content, and mint NFTs (with the current limitation of video content being processed as images).  
- **Marketplace Transactions:** Buyers can reliably purchase NFTs.  
- **Basic Gamified UI:** The spinning wheel and raffle table are integrated into the UI.

**What’s Not Working:**  
- **Video Minting Issue:** Our smart contract currently mints videos as images due to a bug that needs to be resolved.  
- **Spinning Wheel Rewards:** The spinning wheel interface functions, but it does not yet display or award NebX tokens.  
- **Raffle Draw Functionality:** The raffle draw is only a static table; the complete logic for automated raffle creation, ticket sales, and winner selection is still in development.

---

## Future Roadmap & Strategy

**Short-Term Improvements:**  
- Fix the smart contract to correctly mint video content as video NFTs.  
- Integrate the NebX token display and reward mechanism within the spinning wheel.  
- Enhance the raffle draw feature to support dynamic creation, ticket purchases, and automated winner selection.

**Long-Term Vision (Launch by 2027):**  
- Launch a mobile-responsive website and a dedicated mobile app for iOS and Android.  
- Release a beta version next year for early user feedback.  
- Target onboarding 5 million creators globally through strategic partnerships and a robust community ecosystem.  
- Empower content creators worldwide with innovative monetization and engagement tools.

---

## Smart Contract

[Smart contract address](https://gist.github.com/nafkem/b1be2ff6db4d954f799759a1e80faf2c)

---

## Presentation & Demo

- **Presentation Slide:** [View Presentation](https://www.canva.com/design/DAGUycKhuFE/lffz3PHu0ebOj1b_f7DGlw/edit?utm_content=DAGUycKhuFE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)  
- **Working Demo:** [Watch Demo](https://youtu.be/-_aN9XKy8fI?feature=shared)

---

## Conclusion

NebulaX is poised to revolutionize the NFT marketplace as the first true Video DEX, empowering creators worldwide to monetize their digital content. While we face current challenges with video minting and incomplete gamification features, our strategic roadmap is clear. We remain dedicated to delivering a secure, innovative, and mobile-friendly platform with plans to scale and enhance functionality significantly by 2027.

Thank you for exploring NebulaX! 😃
