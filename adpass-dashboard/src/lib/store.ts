"use client";

import { useState, useEffect } from 'react';
import { mockLinks, mockAdminLinks, mockPayouts, mockAdminPayouts } from './mockData';
import { AffiliateLink, PayoutRequest } from '@/types';

// Helper to get from local storage or fallback to mock
const getFromStorage = <T,>(key: string, initialData: T): T => {
  if (typeof window === 'undefined') return initialData;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialData;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return initialData;
  }
};

// Hook for Links (sync between Affiliate and Admin)
export function useLinksStore() {
  const [links, setLinks] = useState<typeof mockLinks>(() => getFromStorage('adpass_links', mockLinks));
  const [adminLinks, setAdminLinks] = useState<typeof mockAdminLinks>(() => getFromStorage('adpass_admin_links', mockAdminLinks));

  useEffect(() => {
    localStorage.setItem('adpass_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('adpass_admin_links', JSON.stringify(adminLinks));
  }, [adminLinks]);

  const addLink = (newLink: AffiliateLink, newAdminLink: AffiliateLink) => {
    setLinks((prev) => [newLink, ...prev] as typeof mockLinks);
    setAdminLinks((prev) => [newAdminLink, ...prev] as typeof mockAdminLinks);
  };

  const updateLinkStatus = (id: string, status: string) => {
    setAdminLinks((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setLinks((prev) => prev.map((l) => l.id === id ? { ...l, moderationStatus: status === 'active' ? 'active' : 'pending' } : l));
  };

  return { links, setLinks, adminLinks, setAdminLinks, addLink, updateLinkStatus };
}

// Hook for Payouts
export function usePayoutsStore() {
  const [history, setHistory] = useState<typeof mockPayouts.history>(() => getFromStorage('adpass_payouts_history', mockPayouts.history));
  const [adminPayouts, setAdminPayouts] = useState<typeof mockAdminPayouts>(() => getFromStorage('adpass_admin_payouts', mockAdminPayouts));

  useEffect(() => {
    localStorage.setItem('adpass_payouts_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('adpass_admin_payouts', JSON.stringify(adminPayouts));
  }, [adminPayouts]);

  const addPayoutRequest = (req: PayoutRequest, adminReq: PayoutRequest) => {
    setHistory((prev) => [req, ...prev] as typeof mockPayouts.history);
    setAdminPayouts((prev) => [adminReq, ...prev] as typeof mockAdminPayouts);
  };

  const updatePayoutStatus = (id: string, status: string) => {
    setAdminPayouts((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
    setHistory((prev) => prev.map((h) => h.id === id ? { ...h, status } : h));
  };

  return { history, setHistory, adminPayouts, setAdminPayouts, addPayoutRequest, updatePayoutStatus };
}

// Hook for Global Settings
export function useSettingsStore() {
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(() => getFromStorage('adpass_maintenance_mode', false));

  useEffect(() => {
    localStorage.setItem('adpass_maintenance_mode', JSON.stringify(maintenanceMode));
  }, [maintenanceMode]);

  return { maintenanceMode, setMaintenanceMode };
}
