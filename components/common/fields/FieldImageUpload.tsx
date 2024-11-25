import React, { useState } from 'react'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Button,
    ScrollView
} from "react-native";
import { FormControl } from 'native-base';
import * as ImagePicker from "expo-image-picker";
import { useController, useFormContext } from 'react-hook-form';
import type { ImagePickerAsset } from 'expo-image-picker';

interface FieldImageUploadProps {
    name: string;
    label?: string;
}

interface FileData {
    lastModified: number;
    name: string;
    size?: number;
    type: string;
    uri?: string;
    fileName?: string;
}

interface ExpectedFile extends Blob {
    readonly lastModified: number;
    readonly name: string;
    readonly webkitRelativePath: string;
}

const converToFile =  async (file: ImagePickerAsset[]): Promise<ExpectedFile[]> => {
    return Promise.all(
        file.map(async (asset) => {
            const response = await fetch(asset.uri);
            const blob = await response.blob();
            const fileData = new File([blob], asset.fileName || 'unknown.jpg', {
                lastModified: Date.now(),
                type: blob.type,
            });
            return fileData;
        })
    );
}



export const FieldImageUpload: React.FC<FieldImageUploadProps> = ({ name, label }) => {
    const [imagesAssets, setImagesAssets] = useState<FileData[]>([]);
    const [addNewFiles, setAddNewFiles] = useState<any[]>([]);
    const { control } = useFormContext();
    const {
        field: { value, onChange }
    } = useController({ control, name, defaultValue: [] });

    const onMultiplePicturePick = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissionResult.granted) {
            alert('Permission to access gallery is required!')
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
        })

        if (result.canceled || !result.assets) return;

        const newFiles = [];
        const newPreviewImages: FileData[] = [];
        const convertedImage = await converToFile(result.assets)
        for (const asset of result.assets) {
            if (asset.uri) {
                const fileName = asset.fileName || 'image.jpg';
                const type = asset.type || 'image/jpeg';
                const file = await uriToFile(asset.uri, fileName, type);

                newFiles.push(file);
                newPreviewImages.push({ 
                    uri: asset.uri, 
                    name: fileName, 
                    type,
                    lastModified: Date.now(),
                    size: asset.fileSize
                });
            }
        }

        
        // Update the form value
        setImagesAssets(newPreviewImages);
        // console.log(newFiles)
        onChange(newFiles);
    };

    const uriToFile = async (uri: string, fileName: string, type: string): Promise<File> => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type });
        return file;
    };

    const imageFormatFile = (
        files: File[],
    ) => {

    }
    // const json = JSON.stringify(imagesAssets)
    // console.log(imagesAssets)

    return (
        <FormControl w="full" className='mb-3'>
            {label && <FormControl.Label _text={{ color: 'white' }}>{label}</FormControl.Label>}
            <Button
                title="Klik disini untuk menambah gambar"
                onPress={onMultiplePicturePick}

            />

            <ScrollView horizontal>
                {imagesAssets.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image.uri }}
                        style={styles.image}
                    />
                ))}
            </ScrollView>

        </FormControl>
    )
}

const styles = StyleSheet.create({
    screenContainer: { marginBottom: 16 },
    helloWorld: { fontSize: 30 },
    pickButton: {
        marginTop: 16,
        backgroundColor: "lightblue",
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    image: {
        marginTop: 16,
        borderRadius: 12,
        width: 300,
        aspectRatio: 16 / 9,
        marginRight: 16,
        height: 300
    },
}); 
