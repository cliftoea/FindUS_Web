import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from '@/config';

export default function firebaseInit() {
  const app = firebase.initializeApp(config.firebaseConfig);
  app.auth();
}
