import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [user, setUser] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const onAuthStateChanged = async userAuth => {
    if (!userAuth) {
      return;
    }
    if (userAuth) {
      console.log(userAuth);
      setUser(userAuth);
    }

    //return () => userReference();
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber;
    };
  }, []);

  const signInWithMobileNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber(`+91${mobile}`);
    console.log('jay' + `+91${mobile}`);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  const signOut = async () => {
    auth().signOut();
    setUser(null);
    setMobile(null);
    setCode(null);
    //return () => userReference();
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={{margin: 10}}>
        <Text style={{margin: 10, fontWeight: 'bold', fontSize: 20}}>
          Mobile Sign In Tutorial
        </Text>
      </View>

      <View style={{margin: 10}}>
        {user === null && (
          <>
            <TextInput
              value={mobile}
              onChangeText={e => setMobile(e)}
              placeholder="Enter Your Number"
              style={styles.mobileStyle}
            />
            {!confirm ? (
              <>
                <TouchableOpacity
                  style={styles.getCodeStyle}
                  onPress={() => signInWithMobileNumber()}>
                  <Text style={{color: 'white'}}>Get Code</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  value={code}
                  onChangeText={e => setCode(e)}
                  placeholder="Code"
                  style={styles.codeStyle}
                />
                <TouchableOpacity
                  style={styles.otpVerificationBtn}
                  onPress={() => confirmCode()}>
                  <Text style={{color: 'white'}}>Confirm Code</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
      {user !== null && (
        <View style={{margin: 10}}>
          <Text style={{margin: 10, fontWeight: 'bold', fontSize: 16}}>
            {user.phoneNumber}
          </Text>
          <TouchableOpacity style={styles.signOutStyle} onPress={signOut}>
            <Text style={{color: 'white'}}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {alignItems: 'center', flex: 1, marginTop: 100},
  mobileStyle: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'red',
    margin: 10,
    padding: 10,
    width: 200,
    fontWeight: 'bold',
  },
  codeStyle: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 10,
    padding: 10,
    width: 200,
    color: 'red',
  },
  getCodeStyle: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'blue',
    fontWeight: 'bold',
  },
  otpVerificationBtn: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  signOutStyle: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'red',
    fontWeight: 'bold',
  },
});

export default App;
