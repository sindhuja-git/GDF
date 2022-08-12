import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/overrides' {
  type MUIDataTableClassKey = 'responsiveBase';
  type MUIDataTableHeadCellClassKey = 'fixedHeader';
  type MuiToolbar = 'root';
  type MUIDataTableBodyCell = 'root';
  type MUITableCell = 'root';
  type MUIDataTableColumnOptions = 'root';

  interface ComponentNameToClassKey {
    MUIDataTable: MUIDataTableClassKey;
    MUIDataTableHeadCell: MUIDataTableHeadCellClassKey;
    MUIToolbar: MuiToolbar;
    MUIDataTableBodyCell: MUIDataTableBodyCell;
    MUITableCell: MUITableCell;
    MUIDataTableColumnOptions: MUIDataTableColumnOptions;
  }
}

export type SortDirection = 'asc' | 'desc';

export interface MUIDataTableColumnOptions {
  sortDirection?: SortDirection;
}

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        responsiveBase: {
          maxHeight: 'unset',
          overflowX: 'unset',
          overflowY: 'unset',
          border: '1px solid lightgray',
        },
      },
      MuiToolbar: {
        root: {
          top: 0,
          position: 'sticky',
          background: 'white',
          zIndex: 100,
        },
      },
      MUIDataTableHeadCell: {
        fixedHeader: {
          top: '0px',
          padding: '5px',
        },
      },
      MUITableCell: {
        root: {
          padding: '5px',
        },
      },
      MUIDataTableBodyCell: {
        root: {
          padding: '3px',
          paddingLeft: '5px',
        },
      },
    },
  });

const UseMuiDataTableTheme = () => {
  return getMuiTheme();
};

export default UseMuiDataTableTheme;
