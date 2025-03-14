import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);

  const series = [
    {
      name: "Price",
      data: data? data.map((price) => price.close) : [],
    },
  ];

  const options: ApexOptions = {
    theme: {
      mode: isDark ? "dark" : "light",
    },
    chart: {
      height: 300,
      width: 500,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      background: "transparent",
    },
    grid: { show: false },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    yaxis: {
      show: true,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: true },
      type: "datetime",
      categories: data?.map((price) => price.time_close),
    },
    fill: {
      type: "gradient",
      gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
    },
    colors: ["#0fbcf9"],
    tooltip: {
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
  };

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart type="line" series={series} options={options} />
      )}
    </div>
  );
}

export default Chart;
