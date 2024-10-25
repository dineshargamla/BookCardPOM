class DataTable {
    constructor() {
        this.init();
    }

    async init() {
        const data = await this.fetchData();
        this.populateTable(data);
    }

    async fetchData() {
        try {
            const response = await fetch('/data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    populateTable(data) {
        const tableBody = document.getElementById('data-table').querySelector('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.city}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Initialize the DataTable when the page loads
window.onload = () => new DataTable();
