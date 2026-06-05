// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";
// import AuthContext from "../../providers/AuthProvider";
// import {
//   HiOutlineOfficeBuilding,
//   HiOutlineMail,
//   HiOutlinePhone,
//   HiOutlineLocationMarker,
//   HiOutlinePhotograph,
//   HiOutlineDocumentText,
//   HiOutlineArrowLeft,
// } from "react-icons/hi";
// import { MdAccountBalance } from "react-icons/md";

// const CreateBank = () => {
//   const navigate = useNavigate();
//   const { auth } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     logo: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await axios.post(
//         "/bank/create",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.accessToken}`,
//           },
//         }
//       );

//       setSuccess("Bank created successfully!");

//       setTimeout(() => {
//         navigate("/superadmin/bank");
//       }, 1500);

//       console.log(response.data);
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           "Failed to create bank"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen p-6"
//       style={{
//         background:
//           "linear-gradient(135deg, #f0f4ff 0%, #fafbff 60%, #f0f7ff 100%)",
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
//             <MdAccountBalance
//               size={20}
//               className="text-white"
//             />
//           </div>

//           <div>
//             <h1
//               className="text-xl font-bold text-slate-800"
//               style={{
//                 fontFamily: "'Sora', sans-serif",
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Create Bank
//             </h1>

//             <p className="text-xs text-slate-400">
//               Register a new bank
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={() => navigate("/superadmin/bank")}
//           className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition"
//         >
//           <HiOutlineArrowLeft />
//           Back
//         </button>
//       </div>

//       {/* Form Card */}
//       <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
//         <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-400" />

//         <form
//           onSubmit={handleSubmit}
//           className="p-8"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Bank Name */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Bank Name
//               </label>

//               <div className="relative">
//                 <HiOutlineOfficeBuilding className="absolute left-3 top-3.5 text-slate-400" />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   placeholder="Enter bank name"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Email
//               </label>

//               <div className="relative">
//                 <HiOutlineMail className="absolute left-3 top-3.5 text-slate-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   placeholder="bank@example.com"
//                 />
//               </div>
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Phone Number
//               </label>

//               <div className="relative">
//                 <HiOutlinePhone className="absolute left-3 top-3.5 text-slate-400" />
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   placeholder="+234..."
//                 />
//               </div>
//             </div>

//             {/* Logo URL */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Logo URL
//               </label>

//               <div className="relative">
//                 <HiOutlinePhotograph className="absolute left-3 top-3.5 text-slate-400" />
//                 <input
//                   type="text"
//                   name="logo"
//                   value={formData.logo}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   placeholder="https://..."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Address */}
//           <div className="mt-6">
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Address
//             </label>

//             <div className="relative">
//               <HiOutlineLocationMarker className="absolute left-3 top-3.5 text-slate-400" />
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 placeholder="Enter address"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mt-6">
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Description
//             </label>

//             <div className="relative">
//               <HiOutlineDocumentText className="absolute left-3 top-3.5 text-slate-400" />

//               <textarea
//                 rows="4"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 placeholder="Enter bank description"
//               />
//             </div>
//           </div>

//           {/* Messages */}
//           {error && (
//             <div className="mt-5 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
//               {error}
//             </div>
//           )}

//           {success && (
//             <div className="mt-5 p-3 rounded-xl bg-green-50 text-green-600 text-sm">
//               {success}
//             </div>
//           )}

//           {/* Submit */}
//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-md shadow-blue-200 transition-all active:scale-95 disabled:opacity-70"
//             >
//               {loading ? "Creating..." : "Create Bank"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateBank;