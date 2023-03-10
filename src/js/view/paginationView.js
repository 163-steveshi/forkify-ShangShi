import View from './View.js';
import icons from 'url:../../img/icons.svg'; //import icon data

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      //find the closest button that triggering the click event
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage); //return this value with parameter
    });
  }
  _generateMarkup() {
    //html element hsa duplicate code: can be refactored in the future if I have time:D
    const curPage = this._data.page;
    //first compute page

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Pag1, and there are other page
    if (curPage === 1 && numPages > 1)
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    //last page condition with more than 1 page
    if (curPage === numPages)
      return `
        <button data-goto="${
          curPage - 1
        }"class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    //other page
    if (curPage < numPages)
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;

    return ''; //not add any button since there is only 1 page
  }
}
export default new PaginationView();
