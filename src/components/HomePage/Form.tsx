import { PricingInfo } from "@/hooks/usePricingInfo";
import {
  Autocomplete,
  Container,
  Grid,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { groupBy, isEqual, uniqWith } from "lodash";
import React, { useMemo, useState } from "react";
import { OfferingCard } from "./OfferingCard";

type FormProps = {
  data: PricingInfo[];
  loading: boolean;
  onAdd: (offering: PricingInfo, usdAmount: string) => void;
};

function filterPricingInfoArray(
  data: PricingInfo[],
  filter: Partial<PricingInfo>,
  objectKeyToSkip?: keyof PricingInfo
) {
  return data.filter((x) => {
    for (const objectKey in filter) {
      if (objectKeyToSkip === objectKey) {
        continue;
      }
      const filterValue = filter[objectKey];
      if (filterValue && x[objectKey] !== filterValue) {
        return false;
      }
    }

    return true;
  });
}

function getFilterOptionsForKey(
  data: PricingInfo[],
  filter: Partial<PricingInfo>,
  objectKey: keyof PricingInfo
) {
  return Object.keys(
    groupBy(
      filterPricingInfoArray(data, filter, objectKey),
      (x) => x[objectKey]
    )
  )
    .filter((x) => x !== "")
    .sort();
}

const FILTER_OPTIONS: Record<string, string> = {
  service_code: "Service",
  product_type: "Product type",
  region: "Region",
  instance_type: "Instance type",
  // instance_family: "instance_family",
  product_description: "Product",
  tenancy: "Tenancy",
  // offering_id: "offering_id",
  // payment_option: "payment_option",
  // plan_type: "plan_type",
  // duration_seconds: "duration_seconds",
  plan_description: "Savings plan",
  // rate: "rate",
  unit: "Unit",
  usage_type: "Usage type",
  operation: "Operation", // TODO
};

export function Form(props: FormProps) {
  const { data, loading, onAdd } = props;

  const [filter, setFilter] = useState<Partial<PricingInfo>>({});

  const offerings = useMemo(() => {
    const offeringsRaw = filterPricingInfoArray(data, filter);

    // FIXME duplicate offerings bug
    // e.g.: APS2-Lambda-Provisioned-GB-Second-ARM + 3 year No Upfront Compute Savings Plan
    if (offeringsRaw.length <= 8) {
      return uniqWith(offeringsRaw, isEqual);
    }

    return offeringsRaw;
  }, [data, filter]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Stack gap={2}>
          {Object.keys(FILTER_OPTIONS).map((objectKey) => {
            if (loading) {
              return (
                <Skeleton key={objectKey} variant="rectangular" height={56} />
              );
            }
            const options = getFilterOptionsForKey(data, filter, objectKey);
            if (options.length === 0) return null;

            return (
              <Autocomplete
                key={objectKey}
                value={filter[objectKey]}
                onChange={(event: any, newValue: string | null) => {
                  setFilter({
                    ...filter,
                    [objectKey]: newValue === null ? undefined : newValue,
                  });
                }}
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={FILTER_OPTIONS[objectKey]}
                  />
                )}
              />
            );
          })}
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack gap={1}>
          {offerings.slice(0, 3).map((x) => (
            <OfferingCard key={JSON.stringify(x)} offering={x} onAdd={onAdd} />
          ))}
          {loading && (
            <>
              <Skeleton variant="rectangular" height={281}  />
              <Skeleton variant="rectangular" height={281}  />
              <Skeleton variant="rectangular" height={281}  />
            </>
          )}
        </Stack>
        <Typography
          sx={{ padding: 1, textAlign: "center" }}
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {offerings.length} total offerings.
        </Typography>
      </Grid>
    </Grid>
  );
}
