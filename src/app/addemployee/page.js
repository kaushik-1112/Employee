"use client";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "@/config/dbconfig";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const id = Math.floor(Math.random() * 10000).toString();

    const params = {
      TableName: "Employees",
      Item: {
        id: id,
        dateAdded: new Date().toLocaleString(),
        dateModified: "",
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        age: event.target.age.value,
        qualification: event.target.qualification.value,
        city: event.target.city.value,
        phoneNumber: event.target.phoneNumber.value,
        department: event.target.department.value,
        position: event.target.position.value
      },
    };

    try {
      const data = await ddbDocClient.send(new PutCommand(params));
      alert("Employee added successfully!");
      router.push("/");

      document.getElementById("addData-form").reset();
    } catch (err) {
      console.log("Error", err.stack);
      alert("Failed to add employee. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when the operation completes (whether success or failure)
    }
  };
  
  return (
    <div className="flex flex-col space-y-2 sm:pt-5 md:pt-20">
      <div className="text-2xl font-bold text-center mb-10 dark:text-gray-50 text-gray-900">
        ADD EMPLOYEE
      </div>
      <div className="w-full  ">
        <form
          onSubmit={handleSubmit}
          className="max-w-screen-sm  mx-auto"
          id="addData-form"
        >
          <div className="mb-5">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Kaushik"
              required
            />
          </div>
          
          <div className="mb-5">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="rocky"
              required
            />
          </div>
          
          <div className="mb-5">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="30"
              required
            />
          </div>
          
          <div className="mb-5">
            <label
              htmlFor="qualification"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qualification
            </label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Bachelor's Degree"
              required
            />
          </div>
          
          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="New York"
              required
            />
          </div>
          
          <div className="mb-5">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="+1234567890"
              required
            />
          </div>
          
          <div className="mb-5">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Marketing"
              required
            />
          </div>
          
          <div className="mb-5">
            <label
              htmlFor="position"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Manager"
              required
            />
          </div>
          
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}
