import { IdNamaDto } from "../id-nama-dto";

export interface KabupatenDto extends IdNamaDto {
    provinsi: IdNamaDto
  }