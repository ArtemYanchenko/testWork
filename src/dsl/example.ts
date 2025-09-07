import type { Dashboard, DataPacket } from "./types.ts";

export const exampleDashboard: Dashboard = {
  version: "1.0",
  id: "dash-1",
  title: "Infra Metrics",
  grid: { columns: 12, rowHeightPx: 90, columnGap: 10, rowGap: 10 },
  sections: [
    {
      id: "s1",
      title: "CPU & Memory",
      gapY: 10,
      charts: [
        {
          id: "c1",
          title: "CPU Usage",
          type: "linear",
          colorScheme: ["#4F46E5"],
          metrics: [{ key: "cpu_usage", displayName: "CPU %" }],
          layout: { col: 0, row: 0, w: 6, h: 8 },
          options: { legend: true, grid: true, lineInterpolation: "monotone" },
        },
        {
          id: "c2",
          title: "Memory (area)",
          type: "area",
          colorScheme: ["#16A34A"],
          metrics: [{ key: "mem_used", displayName: "RAM used", unit: "GB" }],
          layout: { col: 6, row: 0, w: 6, h: 8 },
          options: { legend: false, grid: true },
        },
      ],
    },
    {
      id: "s2",
      title: "Network IO",
      gapY: 10,
      charts: [
        {
          id: "c3",
          title: "Throughput",
          type: "bar",
          colorScheme: ["#0EA5E9", "#F97316"],
          metrics: [
            { key: "net_in", displayName: "In", unit: "MB/s" },
            { key: "net_out", displayName: "Out", unit: "MB/s" },
          ],
          width: 12,
          height: 6,
          options: { legend: true, grid: true, stacked: false },
        },
      ],
    },
  ],
};

export const packets: DataPacket[] = [
  {
    time: "2025-09-05T12:00:00Z",
    metrics: [{ cpu_usage: 42, mem_used: 7.1, net_in: 120, net_out: 80 }],
  },
  {
    time: "2025-09-05T12:00:05Z",
    metrics: [{ cpu_usage: 47, mem_used: 7.3, net_in: 150, net_out: 95 }],
  },
];
