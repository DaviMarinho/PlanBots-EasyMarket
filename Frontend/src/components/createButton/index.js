import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CreateButton = ({ create, text }) => {

    const button = (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    );
    
    return <TouchableOpacity onPress={() => create()}>{button}</TouchableOpacity>;
}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        width: '100%',
        height: '37%',
        backgroundColor: 'rgb(74,134,232)',
        justifyContent: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
    },
});

export default CreateButton;