import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import initiliazeAuthentication from "../Pages/Login/Firebase/Firebase.init";
// Call Firebase Init
initiliazeAuthentication();

//hooks 
const useFirebase = () => {
    // Create New User
    const [email, setEmail] = useState({});
    const [password, setPass] = useState({});
    const [user, setUser] = useState({});
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    //Create New User
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

        })
        .catch((error) => {
            const errorMessage = error.message;
        });
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);

        })
        .catch((error) => {
            const errorMessage = error.message;
        });
    const signUsingGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user);
            }).catch((error) => {
                const errorMessage = error.message;
            });
    }
    const logOut = () => {
        signOut(auth).then(() => {
            setUser({});
        })
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    return {
        setEmail,
        setPass,
        logOut,
        user,
        signUsingGoogle
    }
}

export default useFirebase;