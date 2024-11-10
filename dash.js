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
        { room_type: "Minamalist", room_size: 209.53 }
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
        { room_type: "Febuary", room_size: 245.59 },
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
    chartData[1].labels.map(label => label === "dining" ? "Dining Area" : label), 
    chartData[2].labels.map(label => label === "bathr" ? "Restroom" : label), 
    chartData[3].labels 
];


const chartConfigs = [
    { elementId: 'roomSizeChart', label: 'Average Room Size (sq ft)', data: chartData[0].averageSizes, labels: customLabels[0] },
    { elementId: 'roomTypeChart', label: 'Popular Design', data: chartData[1].averageSizes.map(size => size * Math.random() * 2), labels: customLabels[1] },
    { elementId: 'statusChart', label: 'Status of work (Progress)', data: chartData[2].averageSizes.map(size => size * 0.8), labels: customLabels[2] },
    { elementId: 'viewsChart', label: 'Page Views )', data: chartData[3].averageSizes.map(size => size * Math.random() * 1.5), labels: customLabels[3] }
];


function createChart(config) {
    const ctx = document.getElementById(config.elementId).getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: config.labels,
            datasets: [{
                label: config.label,
                data: config.data,
                backgroundColor: 'rgba(255, 182, 193, 0.5)',
                borderColor: 'rgba(255, 105, 180, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}


chartConfigs.forEach(config => createChart(config));
