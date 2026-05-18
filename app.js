import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCbiNTDFk0ikTJRG_8hWaaOcyJYjS9dtI",
  authDomain: "zennv-chat.firebaseapp.com",
  projectId: "zennv-chat",
  storageBucket: "zennv-chat.firebasestorage.app",
  messagingSenderId: "233720349369",
  appId: "1:233720349369:web:387f9a6a681e70bbfed168",
  measurementId: "G-1PXGM1F61T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let user = "";

window.login = function(){
  user = document.getElementById("username").value;

  if(user == "") return alert("isi nama");

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("chatBox").style.display = "flex";

  document.getElementById("usernama").innerText = user;

  loadMessages();
}

window.sendMessage = async function(){
  let text = document.getElementById("msg").value;

  if(text == "") return;

  await addDoc(collection(db,"messages"),{
    user:user,
    text:text,
    time:Date.now()
  });

  document.getElementById("msg").value = "";
}

function loadMessages(){

  const q = query(collection(db,"messages"),orderBy("time"));

  onSnapshot(q,(snapshot)=>{

    let html = "";

    snapshot.forEach((doc)=>{

      let data = doc.data();

      html += `
      <div class="msg">
        <b>${data.user}</b><br>
        ${data.text}
      </div>
      `;
    });

    document.getElementById("messages").innerHTML = html;

  });

}