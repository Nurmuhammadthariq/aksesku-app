import React, { useState, useCallback } from "react"
import { router } from "expo-router"
import { View } from "native-base"
import { TextInput, Button, Platform, SafeAreaView, ToastAndroid } from "react-native"
import uuid from 'react-native-uuid'
import FieldSelectKegiatan from "@/components/common/fields/field-select/FieldSelectKegiatan"
import FieldInput from "@/components/common/fields/FieldInput"
import FieldRuangLingkupSelect from "@/components/common/fields/field-select/FieldRuangLingkupSelect"
import { FieldImageUpload, FieldSasaranSelect } from "@/components/common"
import { FieldTextArea } from "@/components/common"
import { FieldDatePicker } from "@/components/common"
import { FieldInputNumber } from "@/components/common"
import { useKegiatanPenyuluhanContext } from "@/context/kegiatan-penyuluhan/kegiatan-penyuluhan-context"

import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { JenisKegiatanEnum } from "@/libs/enum"
import {
    useKegiatanPenyuluhanUpsertOfflineMutation,
    KegiatanPenyuluhanPaginateListDocument
} from "@/graphql"

const validationSchema = Yup.object().shape({
    jenis: Yup.string().required('Jenis kegiatan penyuluhan wajib diisi'),
    nama: Yup.string().required('Nama kegiatan Harus diisi'),
    ruangLingkupId: Yup.string().required('Ruang lingkup harus diisi'),
    targetSasaranId: Yup.string().required('Target Sasaran harus diisi'),
    tujuan: Yup.string().required('Tujuan kegiatan harus diisi'),
    deskripsi: Yup.string().required('Deskripsi harus diisi'),
    date: Yup.date(),
    jumlahPeserta: Yup.number(),
    tindakLanjut: Yup.string(),
    files: Yup.array(),
})

const FieldSet: React.FC = () => {
    const { refetch, loading: isLoading } = useKegiatanPenyuluhanContext()
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            jenis: '1',
            jumlahPeserta: 0,
            nama: '',
            ruangLingkupId: '',
            targetSasaranId: '',
            tujuan: '',
            deskripsi: '',
            date: new Date(),
            tindakLanjut: '',
            files: []
        },

    })
    const [upsert, { error, loading }] =
        useKegiatanPenyuluhanUpsertOfflineMutation({
            update: (cache, { data }) => {
                if (!data) return; // or throw an error, depending on your use case

                try {
                    const { kegiatanPenyuluhanUpsert } = data;
                    const { kegiatanPenyuluhanPaginateList } = cache.readQuery({
                        query: KegiatanPenyuluhanPaginateListDocument
                    }) as { kegiatanPenyuluhanPaginateList: any };

                    cache.writeQuery({
                        query: KegiatanPenyuluhanPaginateListDocument,
                        data: {
                            kegiatanPenyuluhanPaginateList: {
                                ...kegiatanPenyuluhanPaginateList,
                                __isNew: true,
                                data: [
                                    kegiatanPenyuluhanUpsert,
                                    ...kegiatanPenyuluhanPaginateList.data.slice(0)
                                ]
                            }
                        }
                        // broadcast: true
                    })
                } catch (err) {
                    // not actually error
                }
            }
        })

    function showToast() {
        ToastAndroid.show('Data berhasil disimpan', ToastAndroid.SHORT)
    }

    const onSubmit = async (data: any) => {
        const upsertId = uuid.v4()
        const tanggalPelaksanaan = new Date(data.date).toString()
        const req: any = {
            date: tanggalPelaksanaan,
            deskripsi: data.deskripsi,
            id: upsertId,
            jenis: parseInt(data.jenis),
            nama: data.nama,
            ruangLingkupId: data.ruangLingkupId,
            targetSasaranId: data.targetSasaranId,
            tujuan: data.tujuan,
            jumlahPeserta: data.jumlahPeserta,
            tindakLanjut: data.tindakLanjut,
        }
        await upsert({
            variables: {
                data: req
            }
        })
        methods.reset()
        router.push('/home?refresh=true')
        refetch()
    }
    if (loading) {
        showToast()
    }


    const options = Object.entries(JenisKegiatanEnum)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => ({
            label: key.replace(/_/g, ' '),
            value: Number(value)
        }));

    return (
        <View>
            {/* Select Jenis Kegiatan */}
            <FormProvider {...methods}>
                <FieldSelectKegiatan
                    label="Jenis Kegiatan"
                    name="jenis"
                    options={options}
                />

                <FieldInput
                    label="Nama Kegiatan Penyuluhan"
                    name="nama"
                />

                <FieldRuangLingkupSelect
                    label="Ruang Lingkup"
                    name="ruangLingkupId"
                />

                <FieldSasaranSelect
                    label="Kelompok Sasaran"
                    name="targetSasaranId"
                />

                <FieldTextArea
                    label="Tujuan Penyuluhan"
                    name="tujuan"
                    placeholder="Silahkan tulis tujuan disini"
                />

                <FieldTextArea
                    label="Deskripsi"
                    name="deskripsi"
                />

                <FieldDatePicker
                    label="Tanggal Pelaksanaan"
                    name='date'
                />

                <FieldInputNumber
                    label="Jumlah Peserta"
                    name="jumlahPeserta"
                />

                <FieldTextArea
                    name="tindakLanjut"
                    label="Tindak Lanjut Kegiatan Penyuluhan (jika ada)"
                    placeholder="Silakan tulis tindak lanjut kegiatan penyuluhan disini."
                />

                {/* <FieldImageUpload 
                    name="files"
                    label="Unggah image"
                /> */}

                <Button title="Unggah Laporan" onPress={methods.handleSubmit(onSubmit)} />
            </FormProvider>

        </View>
    )
}

export const KegiatanPenyuluhanForm = {
    FieldSet
}