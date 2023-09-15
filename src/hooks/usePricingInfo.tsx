import { isEqual, sortedUniqBy, uniqBy, uniqWith } from "lodash";
import { useEffect, useState } from "react";

export const DATA_URL = "/api/pricing_info"

export type PricingInfo = {
  instance_family: string;
  product_description: string;
  instance_type: string;
  tenancy: string;
  region: string;
  offering_id: string;
  payment_option: string;
  plan_type: string;
  duration_seconds: string;
  currency: string;
  plan_description: string;
  rate: string;
  unit: string;
  product_type: string;
  service_code: string;
  usage_type: string;
  operation: string;
  [key: string]: string;
};

export function csvToObject(csvString: string): PricingInfo[] {
  const rows = csvString.trim().split("\n");
  const headers = [
    "instance_family",
    "product_description",
    "instance_type",
    "tenancy",
    "region",
    "offering_id",
    "payment_option",
    "plan_type",
    "duration_seconds",
    "currency",
    "plan_description",
    "rate",
    "unit",
    "product_type",
    "service_code",
    "usage_type",
    "operation",
  ];

  // Skip the first row as it's the CSV header
  const dataRows = rows.slice(1);

  return dataRows.map((row) => {
    const values = row.split(",");
    const obj: Partial<PricingInfo> = {};
    headers.forEach((header, index) => {
      obj[header] = values[index]?.replace(/"/g, "").trim(); // remove quotes and trim
    });
    return obj as PricingInfo;
  });
}


export function usePricingInfo() {
  const [data, setData] = useState<PricingInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(DATA_URL, {cache: "force-cache"})
      .then((response) => response.text())
      .then((dataRaw) => {
        const dataParsed = csvToObject(dataRaw);
        console.log(`Parsed ${dataParsed.length} records`);
        // FIXME offering_id is not unique, 65k records share 4 ids
        // const dataUnique = uniqBy(dataParsed, "offering_id")
        const dataUnique = dataParsed
        console.log(`Dropped ${dataParsed.length - dataUnique.length} duplicated records (offering_id)`);
        console.log(`Total valid records ${dataUnique.length}`);
        setData(dataUnique);
      })
      .catch((error) => console.error("Error fetching the CSV data:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {data, loading}
}
