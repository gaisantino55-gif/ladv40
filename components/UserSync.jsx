'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { ref, update, serverTimestamp } from 'firebase/database';
import { db } from '../config/firebase';

/**
 * UserSync component — synchronizes Clerk user data with Firebase Realtime Database.
 * This runs on the client after the user signs in.
 */
export default function UserSync() {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
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
          console.error('[Firebase] User sync failed:', error);
        });
    }
  }, [isLoaded, isSignedIn, user]);

  return null; // This component doesn't render anything
}
