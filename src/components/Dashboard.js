import React, { useState, useEffect, useMemo } from 'react';
import { fetchEVData } from '../utils/Data_ev_population_csv';
import Table from './Table';
import Charts from './Charts';
import Filters from './Filters';
import Pagination from './Pagination';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10);
    const [chunkSize] = useState(100);

    useEffect(() => {
        const loadData = async () => {
            const vehicleData = await fetchEVData();
            setData(vehicleData);
            setFilteredData(vehicleData.slice(0, chunkSize));
        };
        loadData();
    }, [chunkSize]);

    const handleFilter = (filters) => {
        const filtered = data.filter(vehicle =>
            (filters.make ? vehicle.Make.includes(filters.make) : true) &&
            (filters.year ? vehicle["Model Year"].includes(filters.year) : true)
        );
        setFilteredData(filtered.slice(0, chunkSize));
        setCurrentPage(1);
    };

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

    const loadMoreData = () => {
        const nextChunkStart = filteredData.length;
        const nextChunkEnd = nextChunkStart + chunkSize;
        setFilteredData(prevData => [
            ...prevData,
            ...data.slice(nextChunkStart, nextChunkEnd),
        ]);
    };

    const chartData = useMemo(() => filteredData.slice(0, chunkSize), [filteredData, chunkSize]);

    return (
        <div className="dashboard container">
            <h1>Electric Vehicle Dashboard</h1>
            <Filters applyFilters={handleFilter} />
            <Charts data={chartData} />
            <Table data={currentData} />
            <Pagination
                totalData={filteredData.length}
                dataPerPage={dataPerPage}
                currentPage={currentPage}
                paginate={setCurrentPage}
            />
            {filteredData.length < data.length && (
                <button onClick={loadMoreData} className="load-more">
                    Load More Data
                </button>
            )}
        </div>
    );
};

export default Dashboard;
