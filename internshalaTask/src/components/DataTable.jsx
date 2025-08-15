import React, { useState, useMemo } from "react";

export default function DataTable({
  data = [],
  columns = [],
  loading = false,
  selectable = false,
  onRowSelect,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleRowSelect = (row) => {
    let updatedSelection;
    if (selectedRows.includes(row)) {
      updatedSelection = selectedRows.filter((r) => r !== row);
    } else {
      updatedSelection =
        selectable === "single" ? [row] : [...selectedRows, row];
    }
    setSelectedRows(updatedSelection);
    if (onRowSelect) onRowSelect(updatedSelection);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!loading && data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No data available</div>
    );
  }

  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          {selectable && <th className="border p-2">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className="border p-2 cursor-pointer select-none"
              onClick={() => handleSort(col.key)}
            >
              {col.label}
              {sortConfig.key === col.key &&
                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr
            key={idx}
            className={`hover:bg-gray-100 ${
              selectedRows.includes(row) ? "bg-gray-200" : ""
            }`}
          >
            {selectable && (
              <td className="border p-2 text-center">
                <input
                  type={selectable === "single" ? "radio" : "checkbox"}
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowSelect(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="border p-2">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
