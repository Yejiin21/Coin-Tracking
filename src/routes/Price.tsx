import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { ChartProps, IHistorical } from "../interface/interfaces";

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["price", coinId], () =>
    fetchCoinHistory(coinId)
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
        <ApexCharts
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
        ></ApexCharts>
      )}
    </div>
  );
}

export default Price;
