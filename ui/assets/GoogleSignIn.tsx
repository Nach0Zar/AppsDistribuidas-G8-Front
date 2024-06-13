import { GoogleSignin } from '@react-native-google-signin/google-signin';

let GoogleSignIn = GoogleSignin
GoogleSignIn.configure({
    webClientId: '1058795952414-kt6i0psmqpvc2rdbedbpe4ijk81hls1h.apps.googleusercontent.com',
    offlineAccess: true
});

export default GoogleSignIn