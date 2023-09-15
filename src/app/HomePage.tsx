"use client";
import React, { useCallback, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PricingInfo, usePricingInfo } from "../hooks/usePricingInfo";
import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import { Form } from "@/components/HomePage/Form";
import { Calculate, CalculateOutlined } from "@mui/icons-material";
import { formatNumber } from "@/utils";

export default function HomePage() {
  const { data, loading } = usePricingInfo();
  const [basket, setBasket] = useState<
    Array<{ offering: PricingInfo; usdAmount: string }>
  >([]);

  const handleAdd = useCallback((offering: PricingInfo, usdAmount: string) => {
    setBasket([...basket, { offering, usdAmount }]);
  }, [basket]);

  const total = useMemo(
    () => basket.map((x) => parseFloat(x.usdAmount)).reduce((a, b) => a + b, 0),
    [basket]
  );

  return (
    <Container>
      <Stack gap={2} alignItems={"center"}>
        <Typography variant="h4" sx={{ marginTop: 4 }}>
          <Stack direction="row" alignItems={"center"} gap={1}>
            <Calculate fontSize="inherit" />
            <span>Savings calculator</span>
          </Stack>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            marginBottom: 4,
            textDecoration: "underline",
            textUnderlineOffset: 4,
            textDecorationStyle: "wavy",
            textDecorationColor: theme.palette.primary.main,
          })}
        >
          Easy Pricing. Guaranteed ROI.
        </Typography>
        <Stack sx={{ width: "100%", marginBottom: 2 }}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography variant="subtitle2">Total estimated cost</Typography>
            <Typography variant="subtitle2">{formatNumber(total)} USD</Typography>
          </Stack>
          {basket.map((x) => (
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="caption" color="text.secondary">
                {x.offering.product_type} {x.offering.usage_type}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatNumber(x.usdAmount)} {x.offering.currency}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Form data={data} loading={loading} onAdd={handleAdd} />
      </Stack>
    </Container>
  );
}
