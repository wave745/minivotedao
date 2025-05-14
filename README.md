# MiniVoteDAO

A decentralized voting application built with React, Vite, and Ethereum smart contracts that enables users to create proposals, vote, and participate in decentralized decision-making.


## Features

- **Wallet Integration**: Connect with MetaMask to interact with the blockchain
- **Create Proposals**: Submit new proposals for community voting
- **Vote on Proposals**: Cast votes for or against active proposals
- **Real-time Statistics**: View active members, ongoing proposals, and results
- **Proposal Management**: Filter proposals by status (active, passed, failed, finalized)
- **Finalize Proposals**: DAO owner can finalize completed proposals
- **Transaction Feedback**: Get real-time feedback on blockchain transactions

## Tech Stack

- **Frontend**: React + TypeScript, Vite, TailwindCSS
- **Blockchain**: Ethereum, Ethers.js
- **UI Components**: Custom components + shadcn/ui
- **State Management**: React Hooks + TanStack Query
- **Styling**: TailwindCSS with custom theming

## Prerequisites

- Node.js (v16+)
- MetaMask browser extension
- An Ethereum wallet with test ETH (for Sepolia/Goerli testnet)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your contract address:
   ```
   VITE_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5000`

## Smart Contract

The application interacts with a deployed MiniVoteDAO smart contract that implements the following functionality:

- Create proposals with title, description, and voting deadline
- Vote on proposals (yes/no)
- Finalize proposals after voting period ends
- Track voting results and proposal status

## Usage Instructions

1. **Connect Wallet**: Click "Connect Wallet" in the navigation bar to connect your MetaMask wallet
2. **Create a Proposal**: Click "Create Proposal" and fill in the required details
3. **Vote on Proposals**: Browse active proposals and vote "Yes" or "No"
4. **Track Results**: Monitor voting progress with the visual progress bars
5. **Filter Proposals**: Use the filter buttons to view proposals by status

## Project Structure

```
/client
  /src
    /abi         # Smart contract ABI
    /components  # React components
    /hooks       # Custom React hooks
    /lib         # Utility functions
    /pages       # Application pages
/server         # Express server for hosting the app
