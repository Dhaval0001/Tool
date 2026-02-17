// import { SelectionFormData, ApiResponse, SelectionResult } from "@/types/selection";

// const API_URL = "http://127.0.0.1:8000/api/run";

// /**
//  * Calls the backend API for HRV/ERV selection
//  */
// export async function runSelection(formData: SelectionFormData): Promise<ApiResponse> {
//   try {
//     const payload = {
//       airUnit: formData.airUnit,
//       airflow: formData.airflowValue,
//       spUnit: formData.staticPressureUnit,
//       pressure: formData.staticPressureValue,
//       modelType: formData.modelType,
//       motorType: formData.motorType,
//       sreInput: formData.sreInput,
//       moistureInput: formData.moistureTransferInput,

//     };

//     console.log("Sending payload to backend:", payload);

//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`API error: ${response.status} - ${errorText}`);
//     }

//     const data = await response.json();
//     console.log("Backend response:", data);

//     // Handle backend response - check for errors
//     if (data.error) {
//       return {
//         success: false,
//         error: data.error,
//       };
//     }

//     // Map backend response to frontend format
//   //  const rawResults  = data.results || data;
//   if (!data.success) {
//   return {
//     success: false,
//     error: data.error || "Selection failed",
//   };
// }

// const rawResults = data.results;



    
//     if (!Array.isArray(rawResults)) {
//       console.error("Expected array of results, got:", rawResults);
//       return {
//         success: false,
//         error: "Invalid response format from server",
//       };
//     }

//     // Map each result, handling potential field name differences
//     const results: SelectionResult[] = rawResults.map((item: any) => ({
//       model: item.model || item.Model || "",
//       type: item.type || item.Type || formData.modelType,
//       motor: item.motor || item.Motor || formData.motorType,
//       mca: Number(item.mca ?? item.MCA ?? 0),
//       mocp: Number(item.mocp ?? item.MOCP ?? 0),
//       staticPressure: Number(item.staticPressure ?? item.static_pressure ?? item.StaticPressure ?? 0),
//       pressureRatio: Number(item.pressureRatio ?? item.pressure_ratio ?? item.PressureRatio ?? 0),
//       netAirflow: Number(item.netAirflow ?? item.net_airflow ?? item.NetAirflow ?? item.netCFM ?? item.netLS ?? 0),
//       sre: Number(item.sre ?? item.SRE ?? 0),
//       sreActual: Number(item.sreActual ?? item.sre_actual ?? item.SREActual ?? 0),
//       moistureTransfer: Number(item.moistureTransfer ?? item.moisture_transfer ?? item.MoistureTransfer ?? item.MT ?? 0),
//       moistureTransferActual: Number(item.moistureTransferActual ?? item.moisture_transfer_actual ?? item.MTActual ?? 0),
//       productLink: item.productLink ?? item.product_link ?? item.ProductLink ?? item.model ?? "",
//     }));

//     return {
//       success: true,
//       results,
//     };
//   } catch (error) {
//     console.error("Selection API error:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "An unexpected error occurred",
//     };
//   }
// }

import { SelectionFormData, ApiResponse, SelectionResult } from "@/types/selection";

// Use local backend during development
const API_URL = "/api/run";


export async function runSelection(
  formData: SelectionFormData
): Promise<ApiResponse> {
  try {
    const payload = {
      airUnit: formData.airUnit,
      airflow: formData.airflowValue,
      spUnit: formData.staticPressureUnit,
      pressure: formData.staticPressureValue,
      modelType: formData.modelType,
      motorType: formData.motorType,
      sreInput: formData.sreInput,
      moistureInput: formData.moistureTransferInput,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.results)) {
      return { success: false, error: "Invalid backend response" };
    }

    // Map backend results to frontend format
    const mappedResults: SelectionResult[] = data.results.map((item: any) => ({
      model: item.Model || item.model || "",
      modelType: item["Model Type"] || item.modelType || "",
      motorType: item["Motor Type"] || item.motorType || "",
      mca: item.MCA ?? item.mca ?? 0,
      mocp: item.MOCP ?? item.mocp ?? 0,
      pa: item["Static Pressure (Pa)"] ?? item.pa ?? 0,
      inwg: item["Static Pressure (IN W.G.)"] ?? item.inwg ?? 0,
      ls: item["Net Supply (L/S)"] ?? item.ls ?? 0,
      cfm: item["Net Supply (CFM)"] ?? item.cfm ?? 0,
      watts: item.Watts ?? item.watts ?? 0,
      sre: item["Sensible Recovery Efficiency @ 0°C (SRE %)"] ?? item.sre ?? 0,
      moistureTransfer: item["Net Moisture Transfer @ 0°C %"] ?? item.moistureTransfer ?? 0,
      productLink: item.productLink ?? item["productLink"] ?? "",
      productText: item.productText ?? item["productText"] ?? "",
    }));

    return {
      success: true,
      results: mappedResults,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Selection failed",
    };
  }
}
