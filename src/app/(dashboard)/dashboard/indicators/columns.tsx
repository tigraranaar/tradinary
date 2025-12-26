"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
export type IndicatorRow = {
  indicator: string;
  value: number | null;
};

export const columns: ColumnDef<IndicatorRow>[] = [
  {
    accessorKey: "indicator",
    header: "Indicator",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const value = row.getValue("value") as number | null;
      return value === null ? <span className="text-muted-foreground">N/A</span> : value.toFixed(4);
    },
  },
];
