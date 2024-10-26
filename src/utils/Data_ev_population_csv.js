import Papa from 'papaparse';
import axios from 'axios';

// fetch and parse the csvv data
export const fetchEVData = async () => {
    const response = await axios.get('/Electric_Vehicle_Population_Data.csv');
    const parsedData = Papa.parse(response.data, {
        header: true,
        skipEmptyLines: true
    });
    return parsedData.data;
};
