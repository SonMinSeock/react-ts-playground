import ReactApexChart from "react-apexcharts";
import { ILineChartProps } from "../../types/props";

function LineChart({ data, isDark }: ILineChartProps) {
  return (
    <div>
      <ReactApexChart
        type="line"
        series={[
          {
            name: "price open",
            data:
              data?.map((price) => ({
                x: new Date(price.time_open * 1000).getTime(),
                y: parseFloat(price.open),
              })) ?? [],
          },
          {
            name: "price close",
            data:
              data?.map((price) => ({
                x: new Date(price.time_close * 1000).getTime(),
                y: parseFloat(price.close),
              })) ?? [],
          },
        ]}
        options={{
          xaxis: {
            type: "datetime",
          },
          theme: {
            mode: isDark ? "dark" : "light",
          },
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: {
            show: false,
          },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(2)}`,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
