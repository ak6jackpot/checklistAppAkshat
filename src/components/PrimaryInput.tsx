import React, {useState,} from 'react';
import {
  View,
  TextInput,
  ViewStyle,
  FlexStyle,
  Button,
} from 'react-native';
import RNFS from 'react-native-fs';

export type PrimaryInputProps = {
  placeholder?: string;
  width?: string | number;
  maxWidth?: string;
  maxLength?: number;
  error?: boolean;
  success?: boolean;
  dataName: string;
  disabled?: boolean;
  fontSize?: number;
  styleProps?: ViewStyle | FlexStyle;
  prefillValue?: string;
  onClick?: () => void;
};
export const PrimaryInput = (props: PrimaryInputProps) => {
  const {
    placeholder,
    error,
    success,
    maxLength,
    disabled = false,
    fontSize = 16,
    onClick,
  } = props;

  const [value, setValue] = useState('');
  // const [endIcon, setEndIcon] = useState(faCircleXmark);
  const [loading,] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);

  const handleButtonClick = () => {
    setInputVisible(true);
  };

  const handleSaveText = () => {
    saveInputToFile(value);
  };

  const saveInputToFile = async (value: string) => {
    try {
        const directoryPath = `${RNFS.DocumentDirectoryPath}/outputs`;
    
        await RNFS.mkdir(directoryPath);
    
        const filename = 'tasks.txt';
        const filePath = `${directoryPath}/${filename}`;
    
        await RNFS.writeFile(filePath, value, 'utf8');
    
        console.log(`User input saved to: ${filePath}`);
        console.log(value);
        
      } catch (error) {
        console.error('Error while saving user input:', error);
      }
  };

  return (
    <View>
        {inputVisible ? (
        <View
            style={{
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            }}>
            <TextInput
            style={{
                marginTop: 6,
                paddingLeft: 16,
                paddingVertical: '4%',
                marginBottom: 6,
                fontFamily: 'SpaceGrotesk-Medium',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: fontSize,
                lineHeight: 20,
                width: '100%',
                borderWidth: error ? 1 : success ? 1 : 2,
                borderColor: error
                ? 'red'
                : success
                ? 'green'
                : 'white',
                backgroundColor: error
                ? '#FFEFED'
                : success
                ? '#E6F2ED'
                : '#F6F6F6',
            }}
            onChangeText={setValue}
            onTouchStart={onClick}
            value={value}
            keyboardType='default'
            placeholder={placeholder}
            multiline={true}
            editable={!loading && !disabled}
            maxLength={maxLength}
            />
            <Button title='done' onPress={handleSaveText}/>
        </View>
        ) : (
        <Button title="Add task" onPress={handleButtonClick} />
        )}
    </View>
  );
};
