import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Configuração do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBnFBPEFinOGc7ES7yck-DWNKCbrxWO_c4",
  authDomain: "rpg---system.firebaseapp.com",
  projectId: "rpg---system",
  storageBucket: "rpg---system.firebasestorage.app",
  messagingSenderId: "694102272724",
  appId: "1:694102272724:web:4bde4d39ef4b612db02941"
};

// Inicializa o Firebase com a configuração fornecida
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta os métodos necessários para interagir com o Firestore
export { db, doc, setDoc, getDoc };