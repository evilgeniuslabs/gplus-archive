import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Pagination extends Component {

  render() {
    const { page, total, per_page, hrefBuilder, onPageChange } = this.props;

    if (!total || total < 1)
      return null;

    let currentPage = page ? page : 1;

    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const lastPage = Math.ceil(total / per_page);

    const firstItemNumber = (currentPage - 1) * per_page + 1;
    const lastItemNumber = Math.min(currentPage * per_page, total);

    const itemCount = lastItemNumber + 1 - firstItemNumber;

    const itemPlurality = itemCount === 1 ? '' : 's';

    if (lastPage === 1) {
      return (
        <nav aria-label="Page Navigation">
          <ul className="pagination">
            <li className="page-item disabled">
              <span
                className="page-link">{itemCount} item{itemPlurality}</span>
            </li>
          </ul>
        </nav>
      );
    }

    const firstPageItemClass = currentPage > 1 ? 'page-item' : 'page-item disabled';
    const previousPageItemClass = currentPage > 1 ? 'page-item' : 'page-item disabled';
    const nextPageItemClass = currentPage * per_page < total ? 'page-item' : 'page-item disabled';

    return (
      <nav aria-label="Page Navigation">
        <ul className="pagination">
          <li className={firstPageItemClass}>
            <NavLink className="page-link" to={hrefBuilder(1)}
                     onClick={() => onPageChange(1)} title="First Page">
              <i title="First Page" className="fas fa-step-backward"/>
            </NavLink>
          </li>
          <li className={previousPageItemClass}>
            <NavLink className="page-link" to={hrefBuilder(previousPage)}
                     onClick={() => onPageChange(previousPage)} title="Previous Page">
              <i title="Prevous Page" className="fas fa-chevron-left"/>
            </NavLink>
          </li>
          <li className="page-item disabled">
            <span className="page-link">Page {currentPage} of {lastPage.toLocaleString()}</span>
          </li>
          <li className={nextPageItemClass}>
            <NavLink className="page-link" to={hrefBuilder(nextPage)}
                     onClick={() => onPageChange(nextPage)} title="Next Page">
              <i title="Next Page" className="fas fa-chevron-right"/>
            </NavLink>
          </li>
          <li className={nextPageItemClass}>
            <NavLink className="page-link" to={hrefBuilder(lastPage)}
                     onClick={() => onPageChange(lastPage)} title="Last Page">
              <i title="Last Page" className="fas fa-step-forward"/>
            </NavLink>
          </li>
        </ul>
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">
              Showing {itemCount} item{itemPlurality} ({firstItemNumber.toLocaleString()} - {lastItemNumber.toLocaleString()} of {total.toLocaleString()} total)
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
