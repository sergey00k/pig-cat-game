// AddressContext.tsx
import React, { createContext, useContext, useState } from 'react';
//////////// solana wallet handlers imports ///////////
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

interface AddressContextType {
    address: PublicKey | null;
    updateAddress: (newAddress: PublicKey | null) => void;
}

interface AddressProviderProps {
    children: React.ReactNode;
}

// Default context value
const defaultAddressContextValue: AddressContextType = {
    address: null,
    updateAddress: () => {}, // Dummy function
};

export const AddressContext = createContext<AddressContextType>(defaultAddressContextValue);

export const AddressProvider: React.FC<AddressProviderProps> = ({ children }) => {
    const [address, setAddress] = useState<PublicKey | null>(null);

    const updateAddress = (newAddress: PublicKey | null) => {
        setAddress(newAddress);
    };

    const contextValue: AddressContextType = {
        address,
        updateAddress,
    };

    return (
        <AddressContext.Provider value={contextValue}>
            {children}
        </AddressContext.Provider>
    );
};


