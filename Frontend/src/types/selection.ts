export interface SelectionFormData {
  airUnit: string;
  airflowValue: number;
  staticPressureUnit: string;
  staticPressureValue: number;
  modelType: string;
  motorType: string;
  sreInput: number;
  moistureTransferInput: number;
}

// export interface SelectionResult {
//   model: string;
//   type: string;
//   motor: string;
//   mca: number;
//   mocp: number;
//   staticPressure: number;
//   pressureRatio: number;
//   netAirflow: number;
//   sre: number;
//   sreActual: number;
//   moistureTransfer: number;
//   moistureTransferActual: number;
//   productLink: string;
// }

export interface SelectionResult {
  model: string;
  modelType: string;
  motorType: string;

  mca: number | string;
  mocp: number | string;

  pa: number | string;
  inwg: number | string;

  cfm: number | string;
  watts: number | string;

  sre: number | string;
  moistureTransfer: number | string;

  productLink?: string;
  productText?: string;
}



export interface ApiResponse {
  success: boolean;
  results?: SelectionResult[];
  error?: string;
}
