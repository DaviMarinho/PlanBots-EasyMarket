import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import CreateButton from '../createButton/index';

const AddProducts = ({ visibility }) => {

    const [visible, setVisible] = useState(visibility);

    return (
        <Modal isVisible={visible} onBackdropPress={() => setVisible(false)} avoidKeyboard={false}>
            <View style={styles.modalContainer}>
                <Text style={styles.pageTitle}>
                    Adicionar novo produto
                </Text>
                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>Nome do produto*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do produto"
                    />
                    <Text style={styles.inputLabel}>Categoria do produto*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Categoria do produto"
                    />
                    <Text style={styles.inputLabel}>Preço*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="R$ 00,00"
                    />
                    <Text style={styles.inputLabel}>Descrição*</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Descrição"
                        multiline={true}
                    />
                </View>
                <CreateButton create={() => { setVisible }} text='Cadastrar produto' />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    modalContainer: {
        position: 'absolute',
        width: '100%',
        height: 445,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    pageTitle: {
        textAlign: 'center',
        color: 'rgb(74,134,232)',
        fontSize: 22,
        padding: 16,
        fontWeight: 'bold',
    },

    inputView: {
        marginLeft: '10%',
        width: '100%',
        alignItems: 'flex-start',
    },

    input: {
        height: 40,
        marginTop: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        width: '80%',
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
    },

    descriptionInput: {
        width: '80%',
        height: 100,
        marginTop: 12,
        marginBottom: 24,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        textAlignVertical: 'top',
    },
});

export default AddProducts;