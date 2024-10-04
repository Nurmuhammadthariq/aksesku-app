import { JenjangSertifikasiEnum, GenderEnum, PendidikanTerakhirEnum } from "../../enum"
import { RewardSummaryDto } from "../penyuluh-reward-dto"
import { UploadDto } from "../upload-dto"
import { IdNamaDto } from "../id-nama-dto"
import { KabupatenDto } from "./kabupaten-dto"

export interface PenyuluhDto {
    id: string
    /**
     * @label Nomor Induk Kependudukan
     * @require NIK harus diisi
     * @name NIK
     */
    nik?: string
    /**
     * @label Nomor Sertifikasi Penyuluh
     * @require NSP harus diisi
     * @name NSP
     */
    nsp?: string
    /**
     * @label Jenjang Sertifikasi
     * @require Jenjang sertifikasi harus diisi
     * @name jenjang
     */
    nama: string
    /**
     * @label Institusi
     * @require Institusi harus diisi
     * @name institusi
     */
    jenjang?: JenjangSertifikasiEnum
    /**
     * @label Institusi
     * @require Institusi harus diisi
     * @name institusi
     */
    institusi?: string
    /**
     * @label Profesi
     * @require Profesi harus diisi
     * @name profesi
     */
    profesi?: string
    /**
     * @label Alamat
     * @require Alamat harus diisi
     * @name alamat
     */
    alamat?: string
    /**
     * @label Kabupaten
     * @require Kabupaten harus diisi
     * @name kabupaten
     */
    kabupaten?: KabupatenDto
    /**
     * @label Provinsi
     * @require Provinsi harus diisi
     * @name provinsi
     */
    provinsi?: IdNamaDto
    /**
     * @label Email
     * @require Email harus diisi
     * @name email
     */
    email?: string
    /**
     * @label Nomor Handphone
     * @require Nomor Handphone harus diisi
     * @name handphone
     */
    handphone?: string
    /**
     * @label Username
     * @require Username harus diisi
     * @name username
     */
    username: string

    totalPoin: number
    tempatLahir?: string
    tanggalLahir?: Date
    jenisKelamin?: GenderEnum
    pendidikanTerakhir?: PendidikanTerakhirEnum
    thumbnail?: string
    image?: string
    imageFile?: UploadDto

    rewards: RewardSummaryDto[]
}

export interface PenyuluhBriefDto {
    id: string
    nik?: string
    nsp?: string
    nama: string
    jenjang?: JenjangSertifikasiEnum
    totalPoin: number
    thumbnail?: string
    rewards: RewardSummaryDto[]
    kabupaten?: KabupatenDto
    provinsi?: IdNamaDto
    email?: string
    profesi?: string
    institusi?: string
}