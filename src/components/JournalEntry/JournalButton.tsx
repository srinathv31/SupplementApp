// Source Imports
import React from 'react';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Component Imports

// Design Imports

export default function JournalButton( { setModalVisible }: {
    setModalVisible: (j: string) => void
}): JSX.Element {
    return(
        <Icon
        style={{padding: 10,
            margin: 12}}
            onPress={() => setModalVisible("1")}
            name="create-outline" size={30} color="white"
        />
    );
}
