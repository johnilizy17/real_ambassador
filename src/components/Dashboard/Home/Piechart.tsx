import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }: any) {

    return (
        <Pie
            style={{ width: "100%" }}
            data={chartData}
            options={{
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: true,
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            boxHeight: 10
                        }
                    }
                }
            }}
        />
    );
}
export default PieChart;
