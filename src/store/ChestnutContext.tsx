import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Chestnut } from '../types';
import { MOCK_CHESTNUTS, MOCK_USER } from '../data/mock';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NewChestnut = {
  title: string;
  content: string;
  category: Chestnut['category'];
};

type ChestnutContextType = {
  chestnuts: Chestnut[];
  addChestnut: (c: NewChestnut) => void;
};

const ChestnutContext = createContext<ChestnutContextType | undefined>(
  undefined
);

export function ChestnutProvider({ children }: { children: ReactNode }) {
  const [chestnuts, setChestnuts] = useState<Chestnut[]>(MOCK_CHESTNUTS);

  // Load from AsyncStorage on mount
  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem('@jugelizi:chestnuts')
      .then((str) => {
        if (!mounted) return;
        if (!str) return;
        try {
          const parsed: Chestnut[] = JSON.parse(str);
          setChestnuts(parsed);
        } catch (e) {
          // ignore parse errors
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  // Persist whenever chestnuts change
  useEffect(() => {
    AsyncStorage.setItem('@jugelizi:chestnuts', JSON.stringify(chestnuts)).catch(() => {});
  }, [chestnuts]);

  const addChestnut = (c: NewChestnut) => {
    const newItem: Chestnut = {
      id: Date.now().toString(),
      title: c.title,
      content: c.content,
      category: c.category,
      author: MOCK_USER.name,
      avatar: MOCK_USER.avatar,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };
    setChestnuts((prev) => [newItem, ...prev]);
  };

  return (
    <ChestnutContext.Provider value={{ chestnuts, addChestnut }}>
      {children}
    </ChestnutContext.Provider>
  );
}

export function useChestnuts() {
  const ctx = useContext(ChestnutContext);
  if (!ctx) throw new Error('useChestnuts must be used within ChestnutProvider');
  return ctx;
}

export default ChestnutContext;
