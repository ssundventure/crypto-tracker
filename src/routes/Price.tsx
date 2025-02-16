import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { ApexOptions } from "apexcharts";
import { useRecoilState } from "recoil";
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
interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["oc", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilState(isDarkAtom);

  const series = [
    {
      data:
        data?.map((price) => ({
          x: new Date(price.time_close), // X축 (날짜)
          y: [price.open, price.high, price.low, price.close], // OHLС 데이터
        })) || [],
    },
  ];

  const options: ApexOptions = {
    theme: {
      mode: isDark ? "dark" : "light",
    },
    chart: {
      type: "candlestick",
      height: 350,
      width: 600,
      toolbar: { show: false },
      background: "transparent",
    },
    grid: { show: false },
    xaxis: {
      type: "datetime",
      labels: { show:true, format: "MMM dd" },
      categories: data?.map((price) => price.time_close) || [],
    },
    yaxis: { show: true, tooltip: { enabled: true } },
    colors: ["#0fbcf9"],
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts type="candlestick" series={series} options={options} />
      )}
    </div>
  );
}

export default Price;
