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
  type: string;
  motor: string;

  mca: number;
  mocp: number;

  staticPressurePa: number;
  staticPressureInWG: number;

  netCFM: number;
  watts: number;

  sre: number;
  moistureTransfer: number;
}


export interface ApiResponse {
  success: boolean;
  results?: SelectionResult[];
  error?: string;
}
