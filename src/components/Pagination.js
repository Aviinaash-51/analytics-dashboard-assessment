import React from 'react';

const Pagination = ({ totalData, dataPerPage, currentPage, paginate }) => {
    const totalPages = Math.ceil(totalData / dataPerPage);
    const maxPageNumbers = 5;

  
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    return (
        <nav className="pagination-nav">
            <ul className="pagination">
                {/* First Page Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(1)} className="page-link" disabled={currentPage === 1}>
                        «
                    </button>
                </li>

              
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage - 1)} className="page-link" disabled={currentPage === 1}>
                        ‹
                    </button>
                </li>

               
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                        <button onClick={() => paginate(page)} className="page-link">
                            {page}
                        </button>
                    </li>
                ))}

               
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage + 1)} className="page-link" disabled={currentPage === totalPages}>
                        ›
                    </button>
                </li>

              
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(totalPages)} className="page-link" disabled={currentPage === totalPages}>
                        »
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
