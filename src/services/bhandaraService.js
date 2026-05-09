import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

import {
  db,
} from '../firebase/config.js';

const COLLECTION =
  'bhandaras';

// ─────────────────────────────────────────────
// Add Bhandara
// ─────────────────────────────────────────────

export async function addBhandara(
  data
) {
  const payload = {
    title:
      data.title || '',

    description:
      data.description || '',

    foodType:
      data.foodType ||
      'Prashad',

    lat: data.lat,
    lng: data.lng,

    imageUrl:
      data.imageUrl || '',

    views:
      data.views || 0,

    createdAt:
      serverTimestamp(),

    updatedAt:
      serverTimestamp(),
  };

  const docRef =
    await addDoc(
      collection(
        db,
        COLLECTION
      ),
      payload
    );

  return docRef.id;
}

// ─────────────────────────────────────────────
// Get single bhandara
// ─────────────────────────────────────────────

export async function getBhandara(
  id
) {
  const docRef = doc(
    db,
    COLLECTION,
    id
  );

  const snapshot =
    await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error(
      'Bhandara not found'
    );
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// ─────────────────────────────────────────────
// Update
// ─────────────────────────────────────────────

export async function updateBhandara(
  id,
  updates
) {
  const docRef = doc(
    db,
    COLLECTION,
    id
  );

  await updateDoc(docRef, {
    ...updates,

    updatedAt:
      serverTimestamp(),
  });
}

// ─────────────────────────────────────────────
// Delete
// ─────────────────────────────────────────────

export async function deleteBhandara(
  id
) {
  const docRef = doc(
    db,
    COLLECTION,
    id
  );

  await deleteDoc(docRef);
}