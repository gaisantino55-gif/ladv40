'use client';

import { useEffect } from 'react';
import { verifyAppwritePing } from '../lib/appwrite';

export default function AppwritePing() {
  useEffect(() => {
    verifyAppwritePing();
  }, []);

  return null;
}
