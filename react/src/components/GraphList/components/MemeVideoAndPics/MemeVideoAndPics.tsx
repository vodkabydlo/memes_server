import React, { useContext, useEffect, useState } from "react";
import { GraphContext } from "../../../context";
import { graphService } from "../../../../services/graph.service";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MemeVideoAndPics: React.FC = () => {
    const { startDate, endDate }: {} | any = useContext(GraphContext);
    const [graphData, setGraphData] = useState<any>("");
    const [labels, setLabels] = useState<any>([]); // Initialize as an empty array
    useEffect(() => {
        async function fetchData() {
            const data = await graphService.getVideosAndPics(
                startDate,
                endDate
            );
            if (data) {
                setGraphData(data.data);
            }
        }
        fetchData();
    }, []);

    const options = {
        plugins: {
            legend: {
                position: "left" as const,
            },
            title: {
                display: true,
                text: "Chart.js Bar Chart",
            },
        },
    };

    useEffect(() => {
        if (graphData) {
            setLabels(Object.keys(graphData.usersObj));
        }
    }, [graphData]);

    const data = {
        labels: labels.map((label) => label), // Map labels to user IDs
        datasets: [
            {
                label: "Картиночки",
                data: labels.map((label) => graphData.usersObj[label].pictures),
                backgroundColor: "rgb(80,99,133)",
            },
            {
                label: "Видевовс",
                data: labels.map((label) => graphData.usersObj[label].videos),
                backgroundColor: "rgb(31,31,34)",
            },
        ],
    };

    return <Bar options={options} data={data} />;
};

export default MemeVideoAndPics;
