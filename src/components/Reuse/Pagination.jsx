import React from 'react';

export const Pagination = ({ page, count, handleChange }) => {
  // Generate an array of page numbers based on the count
  const pageNumbers = [];
  for (let i = 1; i <= count; i++) {
    pageNumbers.push(i);
  }

  console.log(page, count,pageNumbers )

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {/* Previous page button */}
        <li className={`page-item ${page === 1 && 'disabled'}`}>
          <p className="page-link" onClick={() => handleChange(page - 1)}>Previous</p>
        </li>

        {/* Render page numbers */}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`page-item ${pageNumber === page && 'active'}`}>
            <p className="page-link" onClick={() => handleChange(pageNumber)}>{pageNumber}</p>
          </li>
        ))}

        {/* Next page button */}
        <li className={`page-item ${page === count && 'disabled'}`}>
          <p className="page-link" onClick={() => handleChange(page + 1)}>Next</p>
        </li>
      </ul>
    </nav>
  );
};
