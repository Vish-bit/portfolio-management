import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

const Portfolio = () => {
    const [equityCurve, setEquityCurve] = useState(null);
    const [drawdownCurve, setDrawdownCurve] = useState(null);
    const [monthlyReturns, setMonthlyReturns] = useState({});
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchExcel = async () => {
            const response = await fetch("/QuantActiveFund.xlsx");
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(sheet);

            // Reverse to ensure oldest → newest
            const rows = data.reverse();

            const dates = rows.map((r) => new Date(r["NAV Date"]));
            const navs = rows.map((r) => parseFloat(r["NAV (Rs)"]));

            // --- Equity Curve ---
            setEquityCurve({
                labels: dates.map((d) => d.toLocaleDateString("en-GB")),
                datasets: [
                    {
                        label: "Equity Curve (NAV)",
                        data: navs,
                        borderColor: "#2563EB",
                        fill: false,
                    },
                ],
            });

            // --- Drawdown ---
            let peak = navs[0];
            const drawdowns = navs.map((v) => {
                peak = Math.max(peak, v);
                return ((v - peak) / peak) * 100;
            });

            setDrawdownCurve({
                labels: dates.map((d) => d.toLocaleDateString("en-GB")),
                datasets: [
                    {
                        label: "Drawdown (%)",
                        data: drawdowns,
                        borderColor: "#DC2626",
                        fill: false,
                    },
                ],
            });

            // --- Monthly Returns ---
            const monthly = {};
            for (let i = 1; i < rows.length; i++) {
                const prev = navs[i - 1];
                const curr = navs[i];
                const ret = (curr - prev) / prev;

                const y = dates[i].getFullYear();
                const m = dates[i].getMonth() + 1;
                const key = `${y}-${m}`;
                if (!monthly[key]) monthly[key] = 0;
                monthly[key] += ret;
            }
            setMonthlyReturns(monthly);

            // --- Stats ---
            const totalReturn = navs[navs.length - 1] / navs[0] - 1;
            const years =
                (dates[dates.length - 1].getTime() - dates[0].getTime()) /
                (365 * 24 * 3600 * 1000);
            const cagr = Math.pow(1 + totalReturn, 1 / years) - 1;

            const maxDD = Math.min(...drawdowns);

            setStats({
                CAGR: (cagr * 100).toFixed(2) + "%",
                MaxDrawdown: maxDD.toFixed(2) + "%",
            });
        };

        fetchExcel();
    }, []);

    return (
        <main className="flex-1 bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">
                Portfolio Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-500">CAGR</p>
                    <h2 className="text-xl font-bold">{stats.CAGR}</h2>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-500">Max Drawdown</p>
                    <h2 className="text-xl font-bold">{stats.MaxDrawdown}</h2>
                </div>
            </div>

            {/* Equity Curve */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                {equityCurve ? <Line data={equityCurve} /> : "Loading..."}
            </div>

            {/* Drawdown */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                {drawdownCurve ? <Line data={drawdownCurve} /> : "Loading..."}
            </div>

            {/* Monthly Returns Heatmap */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-lg font-bold mb-4">Monthly Returns</h2>
                <div className="grid grid-cols-12 gap-2 text-center text-sm">
                    {Object.entries(monthlyReturns).map(([key, val]) => (
                        <div
                            key={key}
                            className={`p-2 rounded ${val > 0
                                    ? "bg-green-200 text-green-800"
                                    : "bg-red-200 text-red-800"
                                }`}
                        >
                            {key}: {(val * 100).toFixed(1)}%
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Portfolio;
