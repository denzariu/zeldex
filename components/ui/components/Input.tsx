import { View, Text, TextInput, StyleProp, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { inputTextAbove } from '../../../styles/ui';
import { TextStyle } from 'react-native';


type InputProps = {
  upperText: string;
  autoComplete: 'additional-name' | 'address-line1' | 'address-line2' | 'cc-number' | 'country' | 'current-password' | 'email' | 'family-name' | 'given-name' | 'honorific-prefix' | 'honorific-suffix' | 'name' | 'new-password' | 'off' | 'one-time-code' | 'postal-code' | 'street-address' | 'tel' | 'username' | undefined;
  autoFocus?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url' | undefined;
  maxLength?: number;
  onTextChange: any;
  defaultValue?: string;
  disabled?: boolean;
  blurOnSubmit?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleInput?: StyleProp<ViewStyle>;
  placeholder?: string;
};

const Input = ({upperText, autoComplete, autoFocus, keyboardType, maxLength, onTextChange, defaultValue, disabled, blurOnSubmit, styleContainer, styleText, styleInput, placeholder}: InputProps) => {

  const [focus, setFocus] = useState(autoFocus)

  return (
    <View style={[inputTextAbove.container, styleContainer ? styleContainer : {}, focus ? inputTextAbove.focused : inputTextAbove.notFocused, , disabled ? inputTextAbove.disabled : inputTextAbove.notDisabled]}>
      <Text style={[inputTextAbove.inputUpperText, styleText ? styleText : {}, focus ? inputTextAbove.focused : inputTextAbove.notFocused, disabled ? inputTextAbove.disabled : inputTextAbove.notDisabled]}>{upperText}</Text>
      <TextInput
        autoComplete={autoComplete ? autoComplete : 'off'}
        autoFocus={autoFocus ? autoFocus : false}
        keyboardType={keyboardType ? keyboardType : 'default'}
        style={[inputTextAbove.input, styleInput ? styleInput : {}, disabled ? inputTextAbove.disabled : inputTextAbove.notDisabled]}
        maxLength={maxLength ? maxLength : 2000}
        onChange={(e) => {onTextChange(e.nativeEvent.text)}}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={defaultValue ? defaultValue : undefined}
        placeholder={placeholder ? placeholder : undefined}
        editable={!disabled}
        blurOnSubmit={blurOnSubmit ? blurOnSubmit : true}
      />
    </View>
  )
}


export default Input