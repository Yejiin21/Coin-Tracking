import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { ChartProps, IHistorical } from "../interface/interfaces";

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const chartData =
    data?.map((price) => ({
      x: price.time_open,
      y: [price.open, price.high, price.low, price.close],
    })) ?? [];

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <div>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => price.close) ?? [],
              },
            ]}
            options={{
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
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(+price.time_close * 1000).toISOString()
                ),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["blue"], stops: [0, 100] },
              },
              colors: ["red"],
              tooltip: {
                y: {
                  formatter: (value) => `${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={[
              {
                name: "Price",
                data: chartData,
              },
            ]}
            options={{
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
              grid: { show: false },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
              },
              yaxis: {
                show: false,
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#3C90EB",
                    downward: "#DF7D46",
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Chart;
