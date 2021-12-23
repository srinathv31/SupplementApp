// Source Imports
import React from 'react';
import { Button } from 'react-native';

// Component Imports

// Design Imports

export default function JournalButton( { setJournalVisible }: {
    setJournalVisible: (j: boolean) => void
}): JSX.Element {
    return(
        <Button
            onPress={() => setJournalVisible(true)}
            title='Start Journal'
        />
    );
}
