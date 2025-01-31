import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBGzZch_zntuIuZLxX3NF4UGB9-FWkSIfg",
  authDomain: "chatter-bug-e5c64.firebaseapp.com",
  projectId: "chatter-bug-e5c64",
  storageBucket: "chatter-bug-e5c64.firebasestorage.app",
  messagingSenderId: "71779570683",
  appId: "1:71779570683:web:6c287f0f2fc38d5a4ff15e",
  measurementId: "G-LQN2K08W1D"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


let ServerState = "ChatterHub"

const citiesCol = collection(db, ServerState);

const citySnapshot = await getDocs(citiesCol);

const cityList = citySnapshot.docs.map(doc => doc.data());

cityList.sort(function(a, b){return a.createdAt - b.createdAt});


const ChatArea = document.querySelector('#ChatArea')

function load(number){
  const HolderHolder = document.createElement('div')
  HolderHolder.id = 'HolderHolder'
  const Holder = document.createElement('p')
  Holder.id = 'messageHolder'
  if (cityList[number].photo != null){
    const Profile = document.createElement('img')
    Profile.src = cityList[number].photo
    Profile.id = 'messagePic'
    HolderHolder.appendChild(Profile)
  }
  if (cityList[number].text != null){
    const message = document.createElement('text')
    message.textContent = cityList[number].name + ": " + cityList[number].text
    Holder.appendChild(message)
  }
  if (cityList[count].Image != null){
    const Image = document.createElement('img')
    Image.src = cityList[count].Image
    Image.id = 'messageImg'
    Holder.appendChild(Image)
  }
  HolderHolder.appendChild(Holder)
  ChatArea.appendChild(HolderHolder)
};

let count = 0
while (count < cityList.length) {
  load(count);
  count += 1
}




let userName = "guest"
let picProfile = "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
  
export function send(){
    const formValue = document.getElementById('formVal').value
    const imgValue = document.getElementById('imgVal').value
    if (formValue != "" || imgValue != ""){
      
      const date = new Date();
      const messageRef1 = addDoc(collection(db, ServerState), {
        text: formValue,
        Image: imgValue,
        createdAt: date,
        photo:picProfile,
        name: userName,
        location: ServerState,
        type: "message",
      })
      alert('sent')
    }else{
      alert('you cant just send a blank message')
    }
}