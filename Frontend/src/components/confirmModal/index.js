import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const ConfirmModal = ({ visibility, path }) => {
    const [visible, setVisible] = useState(visibility);
    const navigation = useNavigation();

    return (
        <Modal isVisible={visible} onBackdropPress={() => setVisible(false)} avoidKeyboard={false}>
            <View style={styles.modalContainer}>
                <Text>
                    Ao sair agora nenhuma das informações registradas será salva, tem certeza que gostaria de sair?
                </Text>
                <View style={styles.buttomDiv}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <View style={styles.secondaryButtom}>
                            <Text style={{ color: "rgb(74,134,232)" }}>
                                Cancelar
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigation.navigate(path)}>
                        <View style={styles.primaryButtom}>
                            <Text style={{ color: "white" }}>
                                Confirmar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    modalContainer: {
        position: 'absolute',
        width: 300,
        height: 445,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
    },
    buttomDiv: {
        flexDirection: 'row',

    },
    secondaryButtom: {
        width: 80,
        height: 20,
        borderColor: "rgb(74,134,232)",
        borderRadius: 10,
        backgroundColor: "white"
    },
    primaryButtom: {
        width: 80,
        height: 20,
        borderColor: "rgb(74,134,232)",
        borderRadius: 10,
        backgroundColor: "rgb(74,134,232)",
    }
});

export default ConfirmModal;
