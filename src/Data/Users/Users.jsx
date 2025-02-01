import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../../Firebase/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc, Timestamp, collection, where, query, arrayUnion } from "firebase/firestore";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Register a new user with email and password
    async function registerUser(email, password, userName) {
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password);
            let user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                login: userName,
                uid: user.uid,
                creationDate: Timestamp.now(),
            });
            setCurrentUser(user);
        } catch (err) {
            setError("Error registering user: " + err.message);
        }
    }

    async function loginUser(userEmail, password) {
        try {
            let userCredential = await signInWithEmailAndPassword(auth, userEmail, password);
            setCurrentUser(userCredential.user);
        } catch (err) {
            setError("Error logging in: " + err.message);
        }
    }

    // Log out the current user
    async function logoutUser() {
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (err) {
            setError("Error logging out: " + err.message);
        }
    }

    // Update a specific field in the user's document
    async function updateUserField(uid, field, value) {
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, { [field]: value });
        } catch (err) {
            setError("Error updating user field: " + err.message);
        }
    }

    async function addUserOrder(orderId) {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            const docSnapshot = await getDoc(userRef);
            
            if (docSnapshot.exists()) {
                await updateDoc(userRef, {
                    orders: arrayUnion(orderId)
                });
            } else {
                setError("User does not exist!");
            }
        } catch (err) {
            setError("Error updating user field: " + err.message);
        }
    }

    // Read a specific field from the user's document
    async function getUserField(uid, field) {
        try {
            const userRef = doc(db, "users", uid);
            const docSnapshot = await getDoc(userRef);
            if (docSnapshot.exists()) {
                return docSnapshot.data()[field];
            } else {
                setError("User does not exist!")
            }
        } catch (err) {
            setError("Error getting user field: " + err.message);
        }
    }

    return (
        <UserContext.Provider value={{ currentUser, error, registerUser, loginUser, logoutUser, updateUserField, getUserField, addUserOrder}}>
            {children}
        </UserContext.Provider>
    );
};