// Modules
import { initializeApp } from "firebase/app";

// Env
import { firebaseConfig } from "../env/env";

const app = initializeApp(firebaseConfig);

export default app;