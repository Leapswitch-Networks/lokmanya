import DataTable from 'react-data-table-component';
import './datatable.css'

const DataTableComponent = ({
  paginationRowsPerPageOptions = [50, 100, 150, 200],
  paginationPerPage = paginationRowsPerPageOptions[0],
  ...props
}) => {


  const tableStyle = {
    table: {
      style: {
        backgroundColor: 'transparent',
        overflowY: 'auto !important',
        // padding: '0 20px',
      },
    },
    header: {
      style: {
        backgroundColor: 'lightblue',
        width: '90%',
        '&:hover': {
          backgroundColor: 'red'
        },
      },
    },
    headRow: {
      style: {
        fontSize: '14px',
        fontWeight: '400',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        borderRadius: '10px',
        marginBottom: '0px',
        height: '20px !important',
        border: 'none',
        textTransform: 'capitalize',
        width: '100%',
        padding: '0 10px',
      },
    },
    rows: {
      style: {
        fontSize: '12px',
        fontWeight: '400',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: '50px',
        marginBottom: '5px',
        minHeight: '40px',
        height: '40px',
        border: 'none !important',
        borderBottomWidth: '0',
        padding: '0 10px',
        transition: '.3s',
        '&:hover': {
          border: 'none !important',
          boxShadow: '0px 1px 3px 0px #00000014',
          transform: 'translateY(-1px) scale(1.01)',
        },
      },
    },
    pagination: {
      style: {
        border: 'none !important',
        minHeight: '40px',
        height: '40px',
        // marginLeft:'20px',

      },
    },
    noDataComponent: {
      style: {
        backgroundColor: 'red !important'
      }
    }
  };

  return (
    <DataTable
      responsive
      customStyles={tableStyle}
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      paginationPerPage={paginationPerPage}
      noDataComponent={<div className='nodata-component'><span>No Data Found</span></div>}
      {...props}
      persistTableHead={true}
    >
    </DataTable>
  )
}

export default DataTableComponent
