import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api/coin";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

interface IChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const ErrorMessage = styled(Loader)`
  display: block;
  text-align: center;
  color: red;
`;

function Chart({ coinId }: IChartProps) {
  const { data, isLoading, isError, error } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  return (
    <>
      {isLoading && <Loader>Loading Chart...</Loader>}
      {isError && <ErrorMessage>{error ? error.message : "알 수 없는 에러가 발생했습니다."}</ErrorMessage>}
      {!isLoading && !isError && (
        <div>
          <ReactApexChart
            type="line"
            series={[
              {
                name: "price open",
                data:
                  data?.map((price) => ({ x: new Date(price.time_open).getTime(), y: parseFloat(price.open) })) ?? [],
              },
              {
                name: "price close",
                data:
                  data?.map((price) => ({ x: new Date(price.time_close).getTime(), y: parseFloat(price.close) })) ?? [],
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
              stroke: {
                curve: "smooth",
                width: 4,
              },
            }}
          />
        </div>
      )}
    </>
  );
}

export default Chart;
