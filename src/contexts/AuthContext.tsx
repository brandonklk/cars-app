import { User } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextData = {
    user: User | null;
    login: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const STORAGE_KEY = '@carapp:user';

    useEffect(() => {
        const loadUserFromStorage = async () => {
            try {
                const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedUser) {
                    setIsLoading(true);
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Erro ao carregar usuário do AsyncStorage', error);
            }
        };

        loadUserFromStorage();
    }, []);

    const login = async (userData: User) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
            setUser(userData);
            setIsLoading(true);
            router.push("/(tabs)");
        } catch (error) {
            console.error('Erro ao salvar usuário no AsyncStorage', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setUser(null);
            setIsLoading(false);
            router.replace("/login");
        } catch (error) {
            console.error('Erro ao remover usuário do AsyncStorage', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
