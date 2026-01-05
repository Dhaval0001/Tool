# import os
# from pydantic import BaseModel
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# # 🔹 Import backend Excel logic
# from selection_backend import get_best_result_per_unit_from_excel


# # ======================================================
# # Excel file path (absolute, safe)
# # ======================================================
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# EXCEL_PATH = os.path.join(
#     BASE_DIR,
#     "Selection Program for HRV & ERV Compact.xlsx"
# )

# # Optional safety check (highly recommended)
# if not os.path.exists(EXCEL_PATH):
#     raise RuntimeError(f"Excel file not found at: {EXCEL_PATH}")


# # ======================================================
# # FastAPI app
# # ======================================================
# app = FastAPI(title="HRV / ERV Selection API")


# # ======================================================
# # CORS
# # ======================================================
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:8080",
#         "http://127.0.0.1:8080",
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "http://192.168.1.105:8080",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # ======================================================
# # Request Model
# # ======================================================
# class SelectionRequest(BaseModel):
#     airUnit: str
#     airflow: float
#     spUnit: str
#     pressure: float
#     modelType: str
#     motorType: str
#     sreInput: float
#     moistureInput: float


# # ======================================================
# # API Endpoint
# # ======================================================
# @app.post("/api/run")
# def run_selection(req: SelectionRequest):
#     try:
#         result = get_best_result_per_unit_from_excel(
#             excel_path=EXCEL_PATH,
#             airUnit=req.airUnit,
#             airflow=req.airflow,
#             spUnit=req.spUnit,
#             pressure=req.pressure,
#             modelType=req.modelType,
#             motorType=req.motorType,
#             sreInput=req.sreInput,
#             moistInput=req.moistureInput,
#         )

#         if not result or "error" in result:
#             return {
#                 "success": False,
#                 "error": result.get("error", "Unknown selection error")
#             }

#         # Normalize Excel output → frontend-friendly keys
#         normalized = []
#         for r in result.get("results", []):
#             normalized.append({
#                 "model": r.get("Model"),
#                 "modelType": r.get("Model Type"),
#                 "motorType": r.get("Motor Type"),
#                 "mca": r.get("MCA"),
#                 "mocp": r.get("MOCP"),
#                 "cfm": r.get("Net Supply (CFM)"),
#                 "ls": r.get("Net Supply (L/S)"),
#                 "pa": r.get("Static Pressure (Pa)"),
#                 "inwg": r.get("Static Pressure (IN W.G.)"),
#                 "watts": r.get("Watts"),
#                 "sre": r.get("Sensible Recovery Efficiency @ 0°C (SRE %)"),
#                 "moistureTransfer": r.get("Net Moisture Transfer @ 0°C %"),
#                 "productText": r.get("Product Details and Files Text"),
#                 "productUrl": r.get("Product Details and Files URL"),
#             })

#         return {
#             "success": True,
#             "results": normalized
#         }

#     except Exception as e:
#         # Catch *everything* so frontend never sees fake CORS errors
#         return {
#             "success": False,
#             "error": str(e)
#         }

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from selection_backend import get_best_result_per_unit_from_excel

# ---------- EXCEL PATH ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

EXCEL_PATH = os.path.join(
    BASE_DIR,
    "Selection Program for HRV & ERV Compact.xlsx"
)
# Optional safety check
if not os.path.exists(EXCEL_PATH):
    raise RuntimeError(f"Excel file not found at: {EXCEL_PATH}")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- REQUEST ----------
class SelectionRequest(BaseModel):
    airUnit: str
    airflow: float
    spUnit: str
    pressure: float
    modelType: str
    motorType: str
    sreInput: float
    moistureInput: float


# ---------- RESPONSE ----------
class SelectionRow(BaseModel):
    model: str
    modelType: str
    motorType: str
    mca: float
    mocp: float
    staticPressurePa: float
    staticPressureInWg: float
    netCFM: float
    watts: float
    sre: float
    moistureTransfer: float
    productLink: str




@app.post("/api/run")
def run_selection(req: SelectionRequest):
    try:
        result = get_best_result_per_unit_from_excel(
    excel_path=EXCEL_PATH,
    airUnit=req.airUnit,
    airflow=req.airflow,
    spUnit=req.spUnit,
    pressure=req.pressure,
    modelType=req.modelType,
    motorType=req.motorType,
    sreInput=req.sreInput,
    moistInput=req.moistureInput,
)

        if not result or "error" in result:
            return {
                "success": False,
                "error": result.get("error", "Unknown selection error")
            }
        


        # Normalize Excel output → frontend-friendly keys
        normalized = []
        for r in result.get("results", []):
            normalized.append({
    "model": r.get("Model"),
    "modelType": r.get("Model Type"),
    "motorType": r.get("Motor Type"),

    "mca": r.get("MCA"),
    "mocp": r.get("MOCP"),

    # ✅ Static Pressure
    "pa": r.get("Static Pressure (Pa)"),
    "inwg": r.get("Static Pressure (IN W.G.)"),

    # ✅ Airflow
    "cfm": r.get("Net Supply (CFM)"),

    # ✅ Power
    "watts": r.get("Watts"),

    # ✅ Performance
    "sre": r.get("Sensible Recovery Efficiency @ 0°C (SRE %)"),
    "moistureTransfer": r.get("Net Moisture Transfer @ 0°C %"),

    # ✅ Product link
    "productLink": r.get("productLink"),
    "productText": r.get("productText"),
})


        return {
            "success": True,
            "results": normalized
        }

    except Exception as e:
        # Catch *everything* so frontend never sees fake CORS errors
        return {
            "success": False,
            "error": str(e)
        }
