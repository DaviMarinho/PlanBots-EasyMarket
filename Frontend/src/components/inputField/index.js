import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const InputField = ({ setText, placeholder, text, title, large }) => {

    return (
        <View width={large}>
            <Text style={styles.inputLabel}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={setText}
                value={text}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        position: 'relative',
        height: 40,
        marginTop: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        width: '100%',
    },

    inputLabel: {
        fontSize: 14,
        backgroundColor: '#FFF',
        marginBottom: -22,
        marginLeft: '3%',
        fontWeight: 'bold',
        color: '#000',
        elevation: 0.1,
        alignItems: 'center',
        padding: 1,
        alignSelf: 'flex-start',
    },
});

export default InputField;
