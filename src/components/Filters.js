import React, { useState } from 'react';

const Filters = ({ applyFilters }) => {
    const [make, setMake] = useState('');
    const [year, setYear] = useState('');

    const handleApply = () => {
        applyFilters({ make, year });
    };

    return (
        <div className="filters">
            <input
                type="text"
                placeholder="Filter by Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
            />
            <input
                type="text"
                placeholder="Filter by Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <button style={{cursor:"pointer"}} onClick={handleApply}>Apply Filters</button>
        </div>
    );
};

export default Filters;
