import React, { useState, useContext, useEffect, useReducer } from 'react';
import Ag from './ag'

import { FormControl, FormControlLabel, InputLabel, Select, Switch as SwitchUI, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'

import { CustomThemeContext } from '../Themes/CustomThemeProvider'
import { dateComparator, filterParams } from "./datehelpers";

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

    // Default properties of agGrid
    const agGridTheme = currentTheme === 'dark' ? "ag-theme-balham-dark" : "ag-theme-alpine"
    const [gridApi, setGridApi] = useState(null);

    // Pagination
    const [pagination, togglePagination] = useReducer(val => !val, true);
    // Sortable
    const [sortable, toggleSortable] = useReducer(val => !val, true);
    // Filter
    const [filter, toggleFilter] =  useReducer(val => !val, true);
    // FloatingFilter
    const [floatingFilter, toggleFloatingFilter] = useReducer(val => !val, true);
    // Pagination Page Size
    const [paginationPageSize, setPaginationPageSize] = useState(10);

    const onPageSizeChange = (event) => {
        let newPaginationPageSize = event.target.value;
        gridApi.paginationSetPageSize(Number(newPaginationPageSize));
        setPaginationPageSize(newPaginationPageSize)
    };

    const [rowData, setRowData] = useState([])
    const [columnDefs, setColumnDefs] = useState([])

    // Grid Options
    const gridOptions = {
        // Properties
        rowData,
        columnDefs,
        pagination,
        paginationPageSize,
        rowSelection: 'single',
        defaultColDef:{
            sortable,
            filter,
            floatingFilter,
            flex: 1,
            minWidth: 100,
            filterParams: {
              buttons: ["apply", "reset", "cancel"],
              closeOnApply: true
            }
        },
    }

    const getData = () => {
      fetch('data.json'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then((response) => {
          // console.log(response)
          return response.json();
        })
        .then((myJson) => {
          myJson.columnDefs = myJson.columnDefs.map(col => {
            return (col.filter === "agDateColumnFilter") ? {...col, filterParams, comparator: dateComparator,} : col ;
          })

          return myJson
        })
        .then((myJson)=>{
          // console.log(myJson.columnDefs)
          setRowData(myJson.rowData);
          setColumnDefs(myJson.columnDefs);
        });
    }

    useEffect(()=>{
      getData()
    },[])

    return (
    !(rowData.length > 0 && columnDefs.length > 0)
    ?
    (<div>Loading...</div>)
    :
    (
    <div style={{ width: '100%', height: '100%' }}>
        <FormControlLabel
            control={<SwitchUI checked={pagination} onChange={togglePagination} />}
            label="Pagination"
        />

        <FormControl className={classes.formControl}>
            <InputLabel>Page Size</InputLabel>
            <Select value={paginationPageSize} onChange={onPageSizeChange}>
            {
                [10,50,100,500,1000].map((size) => <MenuItem value={size}>{size}</MenuItem>)
            }
            </Select>
        </FormControl>

        <FormControlLabel
            control={<SwitchUI checked={sortable} onChange={toggleSortable} />}
            label="Sortable"
        />

        <FormControlLabel
            control={<SwitchUI checked={filter} onChange={toggleFilter} />}
            label="Filter"
        />

        <FormControlLabel
            control={<SwitchUI checked={floatingFilter} onChange={toggleFloatingFilter} />}
            label="Floating Filter"
        />

        <Ag agGridTheme={agGridTheme} gridOptions={gridOptions} setGridApi={setGridApi}/>
    </div>
    )
    );
};