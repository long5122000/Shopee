// Chua cac interface tien ich, nhan vao data tra ve message va data
// Co the coi nhu day la 1 cai ham param truyen vao thi co duoc 1 cai type
export interface SuccessResponse<Data> {
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export type NoUnderfinedField<T> = {
  [P in keyof T]-?: NoUnderfinedField<NonNullable<T[P]>>
}
