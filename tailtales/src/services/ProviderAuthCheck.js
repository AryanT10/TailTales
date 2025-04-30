import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../services/firebase";

const db = getFirestore(app);

export default function ProviderAuthCheck(user) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!user) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "authorizedProviders", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("✅ Authorized provider:", docSnap.data());
          setIsAuthorized(true);
        } else {
          console.log("🚫 Not authorized (no provider doc found)");
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("🔥 Error checking provider auth:", error);
        setIsAuthorized(false);
      }

      setLoading(false);
    };

    checkAuthorization();
  }, [user]);

  return { isAuthorized, loading };
}
