// import { PutCommand } from "@aws-sdk/lib-dynamodb";
// import { ddbDocClient } from "@/config/dbconfig";
// import { redirect } from "next/navigation";

// export default function AddUser() {
//   const addUser = async (formData) => {
//     "use server";
//     const params = {
//       TableName: "Users",
//       Item: {
//         id: Math.floor(Math.random() * 10000),
//         dateAdded: new Date().toLocaleString(),
//         dateModified: "",
//         firstName: formData.get("firstName"),
//         lastName: formData.get("lastName"),
//         city: formData.get("city"),
//         phoneNumber: formData.get("phoneNumber"),
//       },
//     };

//     try {
//       alert("User added successfully!");
//       const data = await ddbDocClient.send(new PutCommand(params));
//     } catch (err) {
//       alert("Failed to add user. Please try again.");
//       console.log("Error", err.stack);
//     }
//     redirect("/");
//   };

//   return (
//     <div className="flex flex-col space-y-2 sm:pt-5 md:pt-20">
//       <div className="text-2xl font-bold text-center mb-10 dark:text-gray-50 text-gray-900">
//         ADD USER
//       </div>
//       <div className="w-full  ">
//         <form action={addUser} className="max-w-screen-sm  mx-auto" name="addData-form">
//           <div className="mb-5">
//             <label
//               htmlFor="firstName"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               First Name
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               placeholder="Jhon"
//               required
//             />
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="lastName"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Last Name
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               placeholder="Doe"
//               required
//             />
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="city"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               City
//             </label>
//             <input
//               type="text"
//               name="city"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               placeholder="Bangalore"
//               required
//             />
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="phoneNumber"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Phone Number
//             </label>
//             <input
//               type="text"
//               name="phoneNumber"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//               placeholder="+91 4506070654"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Add User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
