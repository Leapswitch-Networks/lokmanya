import React, { useEffect } from 'react';

const Pagination = ({ totalItems, itemsPerPage, setCurrentPage, currentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleClick = (action) => {
        if (action === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (action === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const renderPages = () => {
        const maxVisiblePages = 5;
        const pageNumbers = [];

        if (totalPages <= maxVisiblePages) {
            pageNumbers.push(...pages);
        } else {
            const left = Math.max(2, currentPage - 2);
            const right = Math.min(totalPages - 1, currentPage + 2);

            pageNumbers.push(1);

            if (left > 2) pageNumbers.push('...');

            for (let i = left; i <= right; i++) {
                pageNumbers.push(i);
            }

            if (right < totalPages - 1) pageNumbers.push('...');

            pageNumbers.push(totalPages);
        }

        return pageNumbers.map((page, i) => (
            <button
                key={i}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                className={`pagination-page-number ${page === currentPage ? 'active button-primary' : ''} ${typeof page !== 'number' ? 'page-ellips' : ''}`}
            >
                <span>{page}</span>
            </button>
        ));
    };

    return (
        <div className="pagination-container">
            <div className="pagination">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>&lt;&lt;</button>
                <button onClick={() => handleClick('prev')} disabled={currentPage === 1}>&lt;</button>
                {renderPages()}
                <button onClick={() => handleClick('next')} disabled={currentPage === totalPages}>&gt;</button>
                <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
            </div>
        </div>
    );
};

export default Pagination;
