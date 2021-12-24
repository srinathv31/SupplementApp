
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import JournalButton from './components/JournalEntry/JournalButton';
import JournalEntryModal from './components/JournalEntry/JournalEntryModal';
import BottomMenuTab from './components/Menus/BottomMenuTab';
import HomePage from './screens/HomePage';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [journalVisible, setJournalVisible] = useState<boolean>(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#0B172A"}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} />
        
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1,  }}>
            <HomePage
              setJournalVisible={setJournalVisible}
              journalVisible={journalVisible}
            ></HomePage>
          </View>
          <View style={{ flex: 2, justifyContent: "flex-end", maxHeight: "10%" }}>
            <BottomMenuTab></BottomMenuTab>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
};

export default App;
