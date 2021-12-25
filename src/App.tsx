
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
import SupplementModal from './components/SupplementViews/SupplementModal';
import Supplement from './interfaces/Supplement';
import HomePage from './screens/HomePage';
import SupplementInfoPage from './screens/SupplementInfoPage';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [visiblePage, setVisiblePage] = useState<string>("1");
  const [dailyList, setDailyList] = useState<Record<string, Supplement[]>>({"12/23": []});

  const [journalVisible, setJournalVisible] = useState<boolean>(false);
  const [suppModalVisible, setSuppModalVisible] = useState<boolean>(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#0B172A"}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} />
        
        <View style={{ flex: 1, opacity: (suppModalVisible === true || journalVisible === true) ? 0.5 : 1 }}>
          <View style={{ flex: 1 }}>
          <SupplementModal
            setSuppModalVisible={setSuppModalVisible}
            suppModalVisible={suppModalVisible}
            setDailyList={setDailyList}
            dailyList={dailyList}
          ></SupplementModal>
          { visiblePage === "1" && <HomePage
              setJournalVisible={setJournalVisible}
              journalVisible={journalVisible}
              setDailyList={setDailyList}
              dailyList={dailyList}
            ></HomePage> }
            { visiblePage === "2" && <SupplementInfoPage
              setDailyList={setDailyList}
              dailyList={dailyList}
            ></SupplementInfoPage> }
          </View>
          <View style={{ flex: 2, justifyContent: "flex-end", maxHeight: "10%" }}>
            <BottomMenuTab
              setVisiblePage={setVisiblePage}
              setSuppModalVisible={setSuppModalVisible}
            ></BottomMenuTab>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
};

export default App;
