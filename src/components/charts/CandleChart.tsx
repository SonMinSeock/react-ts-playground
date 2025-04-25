import ReactApexChart from "react-apexcharts";
import { ICandleChartProps } from "../../types/props";

function CandleChart({ data }: ICandleChartProps) {
  return (
    <div>
      <ReactApexChart
        type="candlestick"
        series={[
          {
            data: (data ?? []).map((price) => ({
              x: new Date(price.time_open * 1000).getTime(),
              y: [parseFloat(price.open), parseFloat(price.high), parseFloat(price.low), parseFloat(price.close)],
            })),
          },
        ]}
        options={{
          xaxis: {
            type: "datetime",
          },
          theme: {
            mode: "dark",
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
          plotOptions: {
            candlestick: {
              colors: {
                upward: "#DF7D46", // 상승 시 색상
                downward: "#3C90EB", // 하락 시 색상
              },
            },
          },
        }}
      />
    </div>
  );
}

export default CandleChart;
