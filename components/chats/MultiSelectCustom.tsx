import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export const MultiSelectCustom = () => {
    const items = [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
        { id: '3', name: 'Option 3' },
    ];

    const [selectedItems, setSelectedItems] = useState<any>([]);

    const toggleSelection = (id: any) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((item: any) => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const renderItem = ({ item }: any) => {
        const isSelected = selectedItems.includes(item.id);
        return (
            <TouchableOpacity
                style={[styles.item, isSelected && styles.selectedItem]}
                onPress={() => toggleSelection(item.id)}
            >
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Options</Text>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <Text style={styles.selectedText}>
                Selected: {selectedItems.join(', ')}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    item: {
        padding: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedItem: {
        backgroundColor: '#cce5ff',
        borderColor: '#007bff',
    },
    itemText: {
        fontSize: 16,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 16,
        fontStyle: 'italic',
    },
});
