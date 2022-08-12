import { screen } from '@testing-library/react';

const rowCellToEntries = (rowCell: any) => {
  const divs: any[] = Array.from(rowCell.querySelectorAll('div'));
  return [divs[0].innerHTML, divs[1].innerHTML.replace(/<[^>]*>/g, '')];
};

const rowNodeToRowCell = (rowNode: any) =>
  Array.from(rowNode.querySelectorAll('td'));

const rowCellToObject = (rowCell: any) =>
  Object.fromEntries([rowCellToEntries(rowCell)]);

const getAllDisplayedRows = (type: any) => {
  return Array.from(
    screen.getByRole('grid').querySelectorAll(`tr.${type}-row`)
  );
};

export const getHighlightedCells = (type: any) =>
  getAllDisplayedRows(type)
    .flatMap(rowNodeToRowCell)
    .filter((rowCell: any) =>
      rowCell.querySelector('div > div.highlighted-cell')
    )
    .map(rowCellToObject);
