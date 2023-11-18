import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PrimaryInput } from './PrimaryInput';

export const CompletedList = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleExpansion}>
        <Text style={styles.heading}>Completed Tasks</Text>
      </TouchableOpacity>
    </View>
      {isExpanded && (
        <View>
          <PrimaryInput dataName='task'/>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 1,
      marginTop: 5,
      backgroundColor: 'white',
      width: '100%',
      height: '50%',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'gray'
    },
    heading: {
      fontSize: 18,
      fontWeight: '600',
      textTransform: 'capitalize',
      color: 'black',
      fontFamily: 'SpaceGrotesk-Regular',
      alignSelf: 'center',
    },
    seeAll: {
      fontSize: 14,
      textTransform: 'capitalize',
      marginRight: 10,
      color: 'black',
      fontFamily: 'SpaceGrotesk-Regular',
    },
    services: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      flexWrap: 'wrap',
    },
  });