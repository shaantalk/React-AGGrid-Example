import React, { useState, useContext, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { FormControl, FormControlLabel, InputLabel, Select, Switch as SwitchUI, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'

import { CustomThemeContext } from '../Themes/CustomThemeProvider'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function AgGrid() {
    const classes = useStyles();
    const { currentTheme, setTheme } = useContext(CustomThemeContext)
    
    // Ref to the table
    const agGridRef = useRef(null)

    // Default properties of agGrid
    const agGridTheme = currentTheme === 'dark' ? "ag-theme-balham-dark" : "ag-theme-alpine"
    const [gridApi, setGridApi] = useState(null);

    // Pagination
    const [pagination, setPagination] = useState(true);
    const handlePagination = (event) => {
        let { checked } = event.target
        setPagination(checked)
        // agGridRef.forceUpdate()
    }

    // Pagination Page Size
    const [paginationPageSize, setPaginationPageSize] = useState(1);
    const handlePageSizeChange = (event) => {
        let newPaginationPageSize = event.target.value;
        gridApi.paginationSetPageSize(Number(newPaginationPageSize));
        setPaginationPageSize(newPaginationPageSize)
    };

    // Sortable
    const [sortable, setSortable] = useState(true);
    const toggleSortable = () => setSortable(!sortable)

    // Filter
    const [filter, setFilter] = useState(true);
    const handleFilter = (event) => {
        let { checked } = event.target
        setFilter(checked)
    }

    // FloatingFilter
    const [floatingFilter, setFloatingFilter] = useState(true)
    const handleFloatingFilter = (event) => {
        let { checked } = event.target
        setFloatingFilter(checked)
    }

    const rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];

    const columns = [
        {
            headerName: "Make",
            field: "make",
        },
        {
            headerName: "Model",
            field: "model",
        },
        {
            headerName: "Price",
            field: "price",
        }
    ]

    console.log({sortable})
    
    return (
    <div style={{ width: '100%', height: '100%' }}>


        <FormControlLabel
            control={<SwitchUI checked={pagination} onChange={handlePagination} />}
            label="Pagination"
        />

        <FormControl className={classes.formControl}>
            <InputLabel>Page Size</InputLabel>
            <Select value={paginationPageSize} onChange={handlePageSizeChange}>
            {
                [1,2,100,500,1000].map((size) => <MenuItem value={size}>{size}</MenuItem>)
            }
            </Select>
        </FormControl>

        <FormControlLabel
            control={<SwitchUI checked={sortable} onChange={toggleSortable} />}
            label="Sortable"
        />

        <FormControlLabel
            control={<SwitchUI checked={filter} onChange={handleFilter} />}
            label="Filter"
        />

        <FormControlLabel
            control={<SwitchUI checked={floatingFilter} onChange={handleFloatingFilter} />}
            label="Floating Filter"
        />

        <div style={{ height: '80%', width: '100%', }} className={agGridTheme}>
            <AgGridReact

            ref={agGridRef}

            onGridReady={(params) => setGridApi(params.api)}
            
            defaultColDef={{
                sortable,
                filter,
                floatingFilter,
                flex: 1,
                minWidth: 100,
            }}
            
            pagination
            paginationPageSize
            paginationNumberFormatter={(params) => params.value.toLocaleString()}

            rowData={rowData} 
            columnDefs={columns}
            />
        </div>
    </div>
    );
};