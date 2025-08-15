import React from "react";
import { DataTable, InputField } from "../handler";
import { useViewStore } from "../store/viewStore";

export default function Home() {
  const { viewComponent, toggleView } = useViewStore();
  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
  ];

  const data = [
    { name: "Anand", age: 25, email: "anand@example.com" },
    { name: "Anand2", age: 30, email: "anand2@example.com" },
    { name: "Anand3", age: 28, email: "anand3@example.com" },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <button
        onClick={toggleView}
        className="text-xl p-2 border rounded-md bg-black text-white"
      >
        {viewComponent ? "Show Input Field" : "Show Data Table"}
      </button>

      {viewComponent ? (
        <div className="flex flex-col justify-center items-center">
          <DataTable
            data={data}
            columns={columns}
            loading={false}
            selectable="multiple"
            onRowSelect={(rows) => console.log("Selected rows:", rows)}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <InputField
            label="Email"
            placeholder="Enter your email"
            helperText="We'll never share your email."
            errorMessage="Invalid email"
            invalid={false}
            disabled={false}
            loading={false}
            variant="outlined"
            size="md"
            type="text"
            showClearButton={true}
            showPasswordToggle={false}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            showPasswordToggle={true}
            showClearButton={false}
            variant="filled"
            size="lg"
          />
        </div>
      )}
    </div>
  );
}
