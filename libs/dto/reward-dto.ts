import { UploadDto } from "./upload-dto"
import { JenisKegiatanEnum } from "../enum"
import { JenisMediaPenyuluhanDto } from "./master"

export interface RewardDto {
    id: string
    nama: string
    value: number
    jenisKegiatan?: JenisKegiatanEnum
    image?: string
    imageFile?: UploadDto
    jenisMediaPenyuluhan?: JenisMediaPenyuluhanDto
  }