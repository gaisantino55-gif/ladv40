'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { ref, update, serverTimestamp } from 'firebase/database';
import { db, hasFirebaseConfig } from '../config/firebase';

/**
 * UserSync component — synchronizes Clerk user data with Firebase Realtime Database.
 * This runs on the client after the user signs in.
 */
export default function UserSync() {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user && db && hasFirebaseConfig) {
      const userRef = ref(db, `users/${user.id}`);
      
      const userData = {
        uid: user.id,
        email: user.primaryEmailAddress?.emailAddress || '',
        fullName: user.fullName || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        imageUrl: user.imageUrl || '',
        lastLogin: serverTimestamp(),
        // Add any other metadata you need
      };

      // Use update to avoid overwriting existing custom fields if they exist
      update(userRef, userData)
        .then(() => {
          console.log('[Firebase] User details synchronized:', user.id);
        })
        .catch((error) => {
          const errorCode = String(error?.code || '').toLowerCase();
          const isPermissionDenied = errorCode.includes('permission');
          if (isPermissionDenied) {
            console.warn('[Firebase] User sync skipped due to permission denied:', error.message || error);
          } else {
            console.error('[Firebase] User sync failed:', error);
          }
        });
    } else if (isLoaded && isSignedIn && user) {
      console.warn('[Firebase] UserSync skipped because Firebase is not available or not configured.');
    }
  }, [isLoaded, isSignedIn, user]);

  return null; // This component doesn't render anything
}
