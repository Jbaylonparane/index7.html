const roomDataSets = [
    { data: [
        { room_type: "dining room", room_size: 262.29 },
        { room_type: "bathroom", room_size: 61.74 },
        { room_type: "bedroom", room_size: 104.01 },
        { room_type: "kitchen", room_size: 245.59 },
        { room_type: "living room", room_size: 209.53 }
    ]},
    { data: [
        { room_type: "Costal", room_size: 262.29 },
        { room_type: "Farm house", room_size: 61.74 },
        { room_type: "Contemporary", room_size: 104.01 },
        { room_type: "Meditarranean", room_size: 245.59 },
        { room_type: "Minimalist", room_size: 209.53 }
    ]},
    { data: [
        { room_type: "completed r", room_size: 262.29 },
        { room_type: "cancel plan", room_size: 61.74 },
        { room_type: "planning", room_size: 104.01 },
        { room_type: "In process", room_size: 245.59 },
    ]},
    { data: [
        { room_type: "January", room_size: 262.29 },
        { room_type: "April", room_size: 104.01 },
        { room_type: "February", room_size: 245.59 },
        { room_type: "March", room_size: 209.53 }
    ]}
];

function calculateAverageSizes(data) {
    const roomTypeSizes = {};
    data.forEach(entry => {
        if (!roomTypeSizes[entry.room_type]) {
            roomTypeSizes[entry.room_type] = { totalSize: 0, count: 0 };
        }
        roomTypeSizes[entry.room_type].totalSize += entry.room_size;
        roomTypeSizes[entry.room_type].count += 1;
    });
    const labels = [];
    const averageSizes = [];
    for (const [roomType, values] of Object.entries(roomTypeSizes)) {
        labels.push(roomType);
        averageSizes.push(values.totalSize / values.count);
    }
    return { labels, averageSizes };
}

const chartData = roomDataSets.map(dataset => calculateAverageSizes(dataset.data));

const customLabels = [
    chartData[0].labels, 
    chartData[1].labels.map(label => label === "dining room" ? "Dining Area" : label), 
    chartData[2].labels.map(label => label === "completed r" ? "Completed" : label), 
    chartData[3].labels 
];

const chartConfigs = [
    { elementId: 'roomSizeChart', label: 'Average Room Size (sq ft)', data: chartData[0].averageSizes, labels: customLabels[0], type: 'bar' },
    { elementId: 'roomTypeChart', label: 'Popular Design', data: chartData[1].averageSizes, labels: customLabels[1], type: 'pie' },
    { elementId: 'statusChart', label: 'Status of work (Progress)', data: chartData[2].averageSizes, labels: customLabels[2], type: 'doughnut' },
    { elementId: 'viewsChart', label: 'Page Views', data: chartData[3].averageSizes, labels: customLabels[3], type: 'line' }
];

function createChart(config) {
    const ctx = document.getElementById(config.elementId).getContext('2d');
    const backgroundColor = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
    ];
    const borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
    ];

    return new Chart(ctx, {
        type: config.type,
        data: {
            labels: config.labels,
            datasets: [{
                label: config.label,
                data: config.data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: config.type === 'bar' ? { y: { beginAtZero: true } } : {},
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}

chartConfigs.forEach(config => createChart(config));
