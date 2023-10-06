import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    title: string;
    onPress?: () => void;
    containerStyle?: any;
    titleStyle?: any;
}

const Button = ({ title, onPress, containerStyle, titleStyle }: Props) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle ? {...containerStyle} : {}]} onPress={onPress}>
      <Text style={[styles.title, titleStyle ? { ...titleStyle } : {}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF5722',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5, 
    },
});