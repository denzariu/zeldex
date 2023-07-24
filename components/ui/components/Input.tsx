import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { inputTextAbove } from '../../../styles/ui';
import { colors } from '../../../styles/defaults';


type InputProps = {
  upperText: string;
  autoComplete: 'additional-name' | 'address-line1' | 'address-line2' | 'cc-number' | 'country' | 'current-password' | 'email' | 'family-name' | 'given-name' | 'honorific-prefix' | 'honorific-suffix' | 'name' | 'new-password' | 'off' | 'one-time-code' | 'postal-code' | 'street-address' | 'tel' | 'username' | undefined;
  autoFocus: boolean;
  keyboardType: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url' | undefined;
  maxLength: number;
  onTextChange: any;
  defaultValue: string;
  disabled: boolean;
};

const Input = ({upperText, autoComplete, autoFocus, keyboardType, maxLength, onTextChange, defaultValue, disabled}: InputProps) => {

  const [focus, setFocus] = useState(autoFocus)

  return (
    <View style={[inputTextAbove.container, focus ? inputTextAbove.focused : inputTextAbove.notFocused, , disabled ? inputTextAbove.disabled : inputTextAbove.notDisabled ]}>
      <Text style={[inputTextAbove.inputUpperText, focus ? inputTextAbove.focused : inputTextAbove.notFocused, disabled ? inputTextAbove.disabled : inputTextAbove.notDisabled ]}>{upperText}</Text>
      <TextInput
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        style={[inputTextAbove.input, disabled ? inputTextAbove.disabled : inputTextAbove.notDisabled]}
        maxLength={maxLength}
        onChange={(e) => {onTextChange(e.nativeEvent.text)}}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={defaultValue}
        editable={!disabled}
      />
    </View>
  )
}


export default Input