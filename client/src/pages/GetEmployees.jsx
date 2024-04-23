import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
function GetEmployees() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const getall = async () => {
      try {
        const response = await fetch("/api/auth/getemployees");
        const data = await response.json();
        setEmployees(data);
        console.log(employees);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getall();
  }, []);

  const handleDelete = async (empId) => {
    try {
      const result = await fetch(`/api/auth/deleteemployee/${empId}`, {
        method: "DELETE",
      });
      const data = await result.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setEmployees((previous) => previous.filter((list) => list._id !== empId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      {/* <table className="table-auto">
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((item, i) => (
              <tr key={item.id}>
                <td className="border-2 border-green-700">{item._id}</td>
                <td className="border-2 border-green-700">
                  <img height={100} width={100} src={item.photo} />
                </td>
                <td className="border-2 border-green-700">{item.name}</td>
                <td className="border-2 border-green-700">{item.email}</td>
                <td className="border-2 border-green-700">{item.mobile}</td>
                <td className="border-2 border-green-700 text-center">
                  {item.designation}
                </td>
                <td className="border-2 border-green-700">{item.gender}</td>
                <td className="border-2 border-green-700">
                  {[
                    ...new Set(
                      item.course.map((course) => course.toLowerCase())
                    ),
                  ].map((course, index, array) => (
                    <span key={index}>
                      {course}
                      {array.length > 1 && index !== array.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td className="border-2 border-green-700">
                  {item.updatedAt.split("T")[0]}
                </td>
                <td className="border-2 border-green-700">
                  <Link
                    className="border border-slate-400 rounded p-2 m-2"
                    to={`/editemployee/${item._id}`}
                  >
                    Edit{" "}
                  </Link>
                  <button
                    className="border border-slate-400 rounded p-2 m-2"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      {/* *********************************************************************************************************** */}
      <div className="flex gap-2 flex-row flex-wrap min-w-80 justify-center">
        {employees.map((emp) => (
          <div className="m-5 border-2 rounded-lg w-80 bg-slate-700 ">
            <div className="flex flex-col items-center gap-2 py-2 text-white">
              <p>ID: {emp._id}</p>
              <img className="h-[10rem] rounded-lg" src={emp.photo} alt="" />
              <p>Name: {emp.name}</p>
              <p>Email: {emp.email}</p>
              <p>Mobile: {emp.mobile}</p>
              <p>Des: {emp.designation}</p>
              <p>Gender: {emp.gender}</p>
              <p>
                Courses:{" "}
                {[
                  ...new Set(
                    emp.course.map((course) =>
                      typeof course === "string"
                        ? course.toLowerCase()
                        : course.name
                    )
                  ),
                ].map((course, index, array) => (
                  <span key={index}>
                    {typeof course === "string" ? course : course.name}{" "}
                    {/* Render course if it's a string, otherwise render course.name */}
                    {array.length > 1 && index !== array.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <p>Joining Date: {emp.updatedAt.split("T")[0]}</p>
              <div className="flex gap-5">
                <Link
                  className="p-2 bg-slate-400 hover:bg-slate-200 hover:text-slate-900 rounded-lg"
                  to={`/editemployee/${emp._id}`}
                >
                  Edit{" "}
                </Link>
                <button
                  className="p-2 bg-slate-400 hover:bg-slate-200 hover:text-slate-900 rounded-lg"
                  onClick={() => {
                    handleDelete(emp._id);
                  }}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetEmployees;
