import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";

import { db } from "./config";

const COLLECTION = "bhandaras";

// GET
export async function getAllBhandaras() {
  const snapshot = await getDocs(collection(db, COLLECTION));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ADD
export async function addBhandara(data) {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    votes: { up: 0, down: 0 },
    rating: 0,
    ratingCount: 0,
    createdAt: serverTimestamp(),
  });
}

// UPDATE (EDIT)
export async function updateBhandara(id, data) {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, data);
}

// DELETE
export async function deleteBhandara(id) {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}

// VOTE
export async function vote(id, type) {
  const ref = doc(db, COLLECTION, id);

  if (type === "up") {
    await updateDoc(ref, { "votes.up": increment(1) });
  } else {
    await updateDoc(ref, { "votes.down": increment(1) });
  }
}

// EXPIRY
export function isExpired(b) {
  if (!b.createdAt) return false;

  const created = b.createdAt.toDate();
  const now = new Date();

  return (now - created) / (1000 * 60 * 60) > 24;
}