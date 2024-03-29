import { useCallback, useMemo, useRef, useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { GridApi } from "ag-grid-community";
import { getFakeRowData, RowData } from "./helpers";
import { faker } from "@faker-js/faker";
import ActionsCell from "./components/ActionsCell";

const App = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const tableRef = useRef<any>(null);

  const handleDelete = useCallback((id: string) => {
    setRowData((prev) => prev.filter((row) => row.id !== id));
  }, []);

  const handleDuplicate = useCallback((data: RowData) => {
    const newRow = { ...data, id: faker.datatype.uuid() };
    setRowData((prev) => [...prev, newRow]);
  }, []);

  const removeSelectedRows = () => {
    const selectedNodes = (tableRef.current.api as GridApi).getSelectedNodes();
    const newRows = rowData.filter((row) =>
      selectedNodes.every((node) => node.data.id !== row.id)
    );

    setRowData(newRows);
  };
  const onInsertRandom = () => {
    const row = getFakeRowData();
    setRowData((prev) => [...prev, row]);
  };
  const getRowId = (params: { data: { id: string } }) => {
    return params.data.id;
  };

  const columnDefs = useMemo(
    () => [
      { field: "id", checkboxSelection: true },
      { field: "lastName" },
      { field: "status" },

      {
        field: "actions",
        cellRenderer: ActionsCell,
        cellRendererParams: { handleDelete, handleDuplicate },
      },
    ],
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <button onClick={onInsertRandom}>Insert Random</button>
      <button onClick={removeSelectedRows}>Remove Selected</button>
      <AgGridReact
        ref={tableRef}
        rowData={rowData}
        rowSelection="multiple"
        columnDefs={columnDefs}
        getRowId={getRowId}
      ></AgGridReact>
    </div>
  );
};

export default App;
