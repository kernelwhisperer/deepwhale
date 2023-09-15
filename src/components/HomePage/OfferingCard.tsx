import { PricingInfo } from "@/hooks/usePricingInfo";
import { formatNumber } from "@/utils";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";

export function OfferingCard(props: {
  offering: PricingInfo;
  onAdd: (offering: PricingInfo, usdAmount: string) => void;
}) {
  const { offering, onAdd } = props;
  const {
    plan_description,
    usage_type,
    rate,
    currency,
    unit,
    tenancy,
    service_code,
    product_type,
  } = offering;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const usdAmount = useMemo(
    () => (parseFloat(value) * parseFloat(rate)).toFixed(2),
    [value]
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack gap={2}>
          <Typography variant="h5" component="div">
            {product_type}
          </Typography>
          <Stack gap={1} direction="row">
            <Chip label={service_code} size="small" disabled />
            <Chip label={plan_description} size="small" disabled />
            <Chip label={tenancy} size="small" disabled />
          </Stack>
          <div>
            <Typography variant="body2" color="text.secondary">
              Usage type:
            </Typography>
            <Typography variant="body2">{usage_type}</Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              Discounted type:
            </Typography>
            <Typography variant="subtitle1">
              {rate} {currency} per 1 {unit}{" "}
            </Typography>
          </div>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" sx={{ width: "100%" }}>
          <TextField
            type="number"
            size="small"
            fullWidth
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Input the expected usage"
            label="Quantity"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{unit}</InputAdornment>
              ),
            }}
          />
          <Button
            size="small"
            variant="contained"
            sx={{ minWidth: "fit-content", textTransform: "none" }}
            onClick={() => {
              onAdd(offering, usdAmount)
              setValue("")
            }}
          >
            Add {value ? formatNumber(parseFloat(usdAmount)) : ""} {value ? currency : ""} to total
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
