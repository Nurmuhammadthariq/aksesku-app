import { IdNamaDto } from "../id-nama-dto";

export interface SasaranDto {
    id: string
    nama: string
    ruangLingkup: IdNamaDto
}

export interface SasaranUpdateDto extends Omit<SasaranDto, 'ruangLingkup'> {
    runangLingkupId: string
  }
  
  export interface SasaranCreateDto extends Omit<SasaranUpdateDto, 'id'> {}