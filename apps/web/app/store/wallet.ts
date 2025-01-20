import { create } from 'zustand';

interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
  setConnected: (connected: boolean) => void;
  setPublicKey: (key: string | null) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  publicKey: null,
  setConnected: (connected) => set({ isConnected: connected }),
  setPublicKey: (key) => set({ publicKey: key }),
}));
