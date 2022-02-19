import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEDSLlRC0zNjqko4_4AaVDRthuuCn-AXw",
  authDomain: "newjust-4935d.firebaseapp.com",
  projectId: "newjust-4935d",
  storageBucket: "newjust-4935d.appspot.com",
  messagingSenderId: "969489458494",
  appId: "1:969489458494:web:12de544eb917bd513bb86f",
  measurementId: "G-NTS9GX9TCZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
