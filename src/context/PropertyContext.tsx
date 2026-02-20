import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { properties as initialProperties } from '../data/properties';

export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Property {
    id: number;
    price: string;
    address: string;
    rooms: number;
    baths: number;
    area: number;
    image: string;
    kitchen_image?: string;
    lat: number;
    lng: number;
    type: string; // 'Houses', 'Apartments', 'Condos', 'Commercial'
    view: string; // 'Sea View', 'Garden', 'City View', 'Any'
    listingType?: string; // 'Buy' or 'Rent'
    description: string;
    agent: {
        name: string;
        image: string;
    };
    reviews?: Review[];
}

interface PropertyContextType {
    properties: Property[];
    addProperty: (property: Omit<Property, 'id'>) => void;
    updateProperty: (id: number, updatedProperty: Partial<Property>) => void;
    deleteProperty: (id: number) => void;
    getProperty: (id: number) => Property | undefined;
    wishlist: number[];
    toggleWishlist: (id: number) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
    const [properties, setProperties] = useState<Property[]>(() => {
        const saved = localStorage.getItem('bricklane_properties');
        return saved ? JSON.parse(saved) : initialProperties;
    });

    const [wishlist, setWishlist] = useState<number[]>(() => {
        const saved = localStorage.getItem('bricklane_wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('bricklane_properties', JSON.stringify(properties));
    }, [properties]);

    useEffect(() => {
        localStorage.setItem('bricklane_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addProperty = (property: Omit<Property, 'id'>) => {
        const newProperty = { ...property, id: Date.now() }; // Simple ID generation
        setProperties([...properties, newProperty]);
    };

    const updateProperty = (id: number, updatedProperty: Partial<Property>) => {
        setProperties(properties.map(p => p.id === id ? { ...p, ...updatedProperty } : p));
    };

    const deleteProperty = (id: number) => {
        setProperties(properties.filter(p => p.id !== id));
        setWishlist(wishlist.filter(wId => wId !== id));
    };

    const toggleWishlist = (id: number) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
        );
    };

    const getProperty = (id: number) => properties.find(p => p.id === id);

    return (
        <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty, getProperty, wishlist, toggleWishlist }}>
            {children}
        </PropertyContext.Provider>
    );
};

export const useProperties = () => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error('useProperties must be used within a PropertyProvider');
    }
    return context;
};
