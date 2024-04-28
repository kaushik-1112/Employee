"use client";
import React, { useState, useEffect } from "react";
import { ddbDocClient } from "@/config/dbconfig";
import { ScanCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import Link from "next/link";

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    qualification: '',
    city: '',
    phoneNumber: '',
    department: '',
    position: ''
  });

  const scanTable = async () => {
    try {
      const data = await ddbDocClient.send(new ScanCommand({ TableName: "Employees" }));
      setTableData(data.Items);
    } catch (err) {
      console.log("Error scanning table:", err);
    }
  };

  const deleteItem = async (userId) => {
    try {
      await ddbDocClient.send(
        new DeleteCommand({
          TableName: "Employees",
          Key: {
            id: userId,
          },
        })
      );
      alert("Employee details deleted successfully!")
      console.log("Success - item deleted");
      scanTable();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const updateItem = async (userId) => {
    try {
      await ddbDocClient.send(
        new UpdateCommand({
          TableName: "Employees",
          Key: {
            id: userId,
          },
          UpdateExpression: "SET #fn = :firstName, #ln = :lastName, #ag = :age, #ql = :qualification, #ct = :city, #pn = :phoneNumber, #dp = :department, #pos = :position",
          ExpressionAttributeValues: {
            ":firstName": editedUserData.firstName,
            ":lastName": editedUserData.lastName,
            ":age": editedUserData.age,
            ":qualification": editedUserData.qualification,
            ":city": editedUserData.city,
            ":phoneNumber": editedUserData.phoneNumber,
            ":department": editedUserData.department,
            ":position": editedUserData.position
          },
          ExpressionAttributeNames: {
            "#fn": "firstName",
            "#ln": "lastName",
            "#ag": "age",
            "#ql": "qualification",
            "#ct": "city",
            "#pn": "phoneNumber",
            "#dp": "department",
            "#pos": "position"
          }
        })
      );
      alert("Employee details updated!")
      console.log("Success - item updated");
      setEditUserId(null);
      scanTable();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  useEffect(() => {
    scanTable();
  }, []);

  const handleEdit = (userId) => {
    setEditUserId(userId);
    const userToEdit = tableData.find((user) => user.id === userId);
    setEditedUserData({ ...userToEdit });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditedUserData(null);
  };

  return (
    <div className="bp-3 sm:p-5 md:p-20">
      <h1 className="text-center text-4xl font-bold text-white">EMPLOYEE MANAGEMENT SYSTEM</h1>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="w-full md:w-auto flex flex-col md:flex-row my-2 mr-5 space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <Link href="/addemployee">
              <button
                type="button"
                className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
              >
                Add Employee
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Qualification
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    City
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b dark:border-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-center">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editUserId === row.id ? (
                        <input
                          type="text"
                          name="firstName"
                          placeholder={row.firstName}
                          value={editedUserData.firstName}
                          onChange={handleChange}
                          className="border-b focus:border-indigo-500 focus:outline-none"
                        />
                      ) : (
                        row.firstName
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editUserId === row.id ? (
                        <input
                          type="text"
                          name="lastName"
                          placeholder={row.lastName}
                          value={editedUserData.lastName}
                          onChange={handleChange}
                          className="border-b focus:border-indigo-500 focus:outline-none"
                        />
                      ) : (
                        row.lastName
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editUserId === row.id ? (
                        <input
                          type="number"
                          name="age"
                          placeholder={row.age}
                          value={editedUserData.age}
                          onChange={handleChange}
                          className="border-b focus:border-indigo-500 focus:outline-none"
                        />
                      ) : (
                        row.age
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editUserId === row.id ? (
                        <input
                          type="text"
                          name="qualification"
                          placeholder={row.qualification}
                          value={editedUserData.qualification}
                          onChange={handleChange}
                          className="border-b focus:border-indigo-500 focus:outline-none"
                        />
                      ) : (
                        row.qualification
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editUserId === row.id ? (
                        <input
                          type="text"
                          name="city"
                          placeholder={row.city}
                          value={editedUserData.city}
                          onChange={handleChange}
                          className="border-b focus:border-indigo-500 focus:outline-none"
                        />
                      ) : (
                        row.city
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editUserId === row.id ? (
                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder={row.phoneNumber}
                          value={editedUserData.phoneNumber}
                          onChange={handleChange}
                          className="border-b focus:border-indigo-500 focus:outline-none"
                        />
                      ) : (
                        row.phoneNumber
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editUserId === row.id ? (
                        <input
                          type="text"
                          name="department"
                          placeholder={row.department}
                          value={editedUserData.department}
                          onChange={handleChange}
                          className="border-b focus:border-indigo-500 focus:outline-none"
                        />
                      ) : (
                        row.department
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editUserId === row.id ? (
                        <input
                          type="text"
                          name="position"
                          placeholder={row.position}
                          value={editedUserData.position}
                          onChange={handleChange}
                          className="border-b focus:border-indigo-500 focus:outline-none"
                        />
                      ) : (
                        row.position
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {editUserId === row.id ? (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => updateItem(row.id)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => setEditUserId(row.id)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => deleteItem(row.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
