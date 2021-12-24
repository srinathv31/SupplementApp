// Source Imports
import React from 'react';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Component Imports

// Design Imports

export default function JournalButton( { setJournalVisible }: {
    setJournalVisible: (j: boolean) => void
}): JSX.Element {
    return(
        <Icon
        style={{padding: 10,
            margin: 12}}
            onPress={() => setJournalVisible(true)}
            name="create-outline" size={30} color="white"
        />
    );
}
