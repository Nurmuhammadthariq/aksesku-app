import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/outline';
import { Checkbox } from 'react-native-paper';

export interface Option {
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
}

interface MultiSelectProps {
  options: Option[]; // List of options to display
  selectedOptions: Option[]; // Currently selected options
  onSelectionChange: (selected: Option[]) => void; // Callback to handle selection changes
}
export const MultiSelect = ({ options, selectedOptions, onSelectionChange }: MultiSelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionPress = (option: Option) => {
    const isSelected = selectedOptions.some((item) => item.id === option.id);
    if (isSelected) {
      onSelectionChange(
        selectedOptions.filter((item) => item.id !== option.id)
      );
    } else {
      onSelectionChange([...selectedOptions, option]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Header */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsDropdownOpen((prev) => !prev)}
      >
        <Text style={styles.selectedText}>
          {selectedOptions.length > 0
            ? selectedOptions.map((item) => item.firstname).join(', ')
            : 'Select options'}
        </Text>
        {isDropdownOpen ? <ChevronDownIcon size={20} color='black' /> : <ChevronUpIcon size={20} color='black' />}
      </TouchableOpacity>

      {/* Dropdown List */}
      {isDropdownOpen && (
        <FlatList
          data={options}
          keyExtractor={(item, index) => item.id}
          style={styles.dropdownList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress(item)}
            >
              <Checkbox
                status={selectedOptions.some((selected) => selected.id === item.id) ? 'checked' : 'unchecked'}
                onPress={() => handleOptionPress(item)}
              />
              <Text style={styles.optionText}>{item.firstname}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdown: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedText: {
    color: '#333',
  },
  dropdownList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: '#fff',
    zIndex: 100,
    elevation: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  optionText: {
    marginLeft: 8,
    color: '#333',
  },
});