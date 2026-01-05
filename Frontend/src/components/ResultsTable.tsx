// import { SelectionResult } from "@/types/selection";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { ExternalLink, CheckCircle2 } from "lucide-react";

// interface ResultsTableProps {
//   results: SelectionResult[];
//   airUnit: string;
// }

// const ResultsTable = ({ results, airUnit }: ResultsTableProps) => {
//   const airflowLabel = airUnit === "Litre Per Second (L/S)" ? "Net L/S" : "Net CFM";

//   return (
//     <Card className="card-elevated animate-fade-in">
//       <CardHeader className="border-b border-border/50 bg-muted/30">
//         <CardTitle className="flex items-center gap-2 text-foreground">
//           <CheckCircle2 className="w-5 h-5 text-secondary" />
//           Selection Results
//           <span className="ml-auto text-sm font-normal text-muted-foreground">
//             {results.length} model{results.length !== 1 ? "s" : ""} found
//           </span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-0">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-primary hover:bg-primary">
//                 <TableHead className="text-primary-foreground font-semibold">Model</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">Type</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">Motor</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">MCA</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">MOCP</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">Static Pressure</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">Pressure Ratio</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">{airflowLabel}</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">SRE</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">SRE Actual</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">MT</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">MT Actual</TableHead>
//                 <TableHead className="text-primary-foreground font-semibold text-center">Product Link</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {results.map((result, index) => {
//                 const safeNum = (val: any, decimals = 2) => {
//                   const num = Number(val);
//                   return isNaN(num) ? "N/A" : num.toFixed(decimals);
//                 };
                
//                 return (
//                   <TableRow 
//                     key={index} 
//                     className={`${index % 2 === 0 ? "table-row-even" : "table-row-odd"} hover:bg-accent/30 transition-colors`}
//                   >
//                     <TableCell className="font-semibold text-foreground">{result.model || "N/A"}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{result.type || "N/A"}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{result.motor || "N/A"}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{safeNum(result.mca)}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{safeNum(result.mocp)}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{safeNum(result.staticPressure)}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{safeNum(result.pressureRatio, 3)}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{safeNum(result.netAirflow, 3)}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{result.sre ?? "N/A"}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{result.sreActual ?? "N/A"}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{result.moistureTransfer ?? "N/A"}</TableCell>
//                     <TableCell className="text-center text-muted-foreground">{result.moistureTransferActual ?? "N/A"}</TableCell>
//                     <TableCell className="text-center">
//                       <a
//                         href={`https://reversomatic.com/products/${result.productLink || result.model}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-1 text-secondary hover:text-secondary/80 font-medium transition-colors"
//                       >
//                         {result.productLink || result.model || "View"}
//                         <ExternalLink className="w-3.5 h-3.5" />
//                       </a>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ResultsTable;


import { SelectionResult } from "@/types/selection";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, CheckCircle2 } from "lucide-react";

interface ResultsTableProps {
  results: SelectionResult[];
}

const ResultsTable = ({ results }: ResultsTableProps) => {
  // helpers
  const int = (v: any) => (isNaN(Number(v)) ? "-" : Math.round(Number(v)));
  const dec = (v: any, d = 2) =>
    isNaN(Number(v)) ? "-" : Number(v).toFixed(d);

  return (
    <Card className="card-elevated animate-fade-in">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-secondary" />
          Selection Results
          <span className="ml-auto text-sm text-muted-foreground">
            {results.length} model{results.length !== 1 ? "s" : ""} found
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary">
                <TableHead className="text-primary-foreground">Model</TableHead>
                <TableHead className="text-primary-foreground text-center">
                  Model Type
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  Motor Type
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  MCA
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  MOCP
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  Static Pressure (Pa)
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  Static Pressure (in. W.G.)
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  Net Supply (CFM)
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  Watts
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  SRE @ 0°C (%)
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  Net Moisture Transfer @ 0°C (%)
                </TableHead>
                <TableHead className="text-primary-foreground text-center">
                  Product Details
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {results.map((r, i) => (
                <TableRow
                  key={i}
                  className={i % 2 === 0 ? "bg-muted/20" : ""}
                >
                  <TableCell className="font-semibold">
                    {r.model}
                  </TableCell>

                  <TableCell className="text-center">
                    {r.type}
                  </TableCell>

                  <TableCell className="text-center">
                    {r.motor}
                  </TableCell>

                  <TableCell className="text-center">
                    {dec(r.mca, 2)}
                  </TableCell>

                  <TableCell className="text-center">
                    {dec(r.mocp, 2)}
                  </TableCell>

                  <TableCell className="text-center">
                    {dec(r.staticPressurePa, 2)}
                  </TableCell>

                  <TableCell className="text-center">
                    {dec(r.staticPressureInWG, 3)}
                  </TableCell>

                  <TableCell className="text-center">
                    {int(r.netCFM)}
                  </TableCell>

                  <TableCell className="text-center">
                    {int(r.watts)}
                  </TableCell>

                  <TableCell className="text-center">
                    {int(r.sre)}
                  </TableCell>

                  <TableCell className="text-center">
                    {int(r.moistureTransfer)}
                  </TableCell>

                  <TableCell className="text-center">
                    <a
                      href={`https://reversomatic.com/products/${r.model}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-secondary"
                    >
                      {r.model}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTable;

