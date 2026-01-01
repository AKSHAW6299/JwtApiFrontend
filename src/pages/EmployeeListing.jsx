import React, { useEffect, useState } from "react";

// Modal component for View/Edit user
const UserModal = ({ user, onClose, onSave, isEdit }) => {
    const [formData, setFormData] = useState(user || {});

    useEffect(() => {
        setFormData(user || {});
    }, [user]);

    if (!user) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit User" : "View User"}</h2>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    <div className="flex items-center space-x-2">
                        <img src={user.image} alt={user.firstName} className="w-12 h-12 rounded-full" />
                        <span>{user.firstName} {user.lastName}</span>
                    </div>
                    <div>
                        <label className="font-semibold">Email:</label>
                        {isEdit ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border px-2 py-1 rounded w-full"
                            />
                        ) : (
                            <p>{user.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="font-semibold">Phone:</label>
                        {isEdit ? (
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border px-2 py-1 rounded w-full"
                            />
                        ) : (
                            <p>{user.phone}</p>
                        )}
                    </div>
                    <div>
                        <label className="font-semibold">Role:</label>
                        {isEdit ? (
                            <input
                                type="text"
                                name="role"
                                value={formData.role || ""}
                                onChange={handleChange}
                                className="border px-2 py-1 rounded w-full"
                            />
                        ) : (
                            <p>{user.role || "N/A"}</p>
                        )}
                    </div>
                    <div>
                        <label className="font-semibold">Address:</label>
                        <p>{user.address?.address}, {user.address?.city}, {user.address?.state}</p>
                    </div>
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Close</button>
                    {isEdit && (
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Settings = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchEmail, setSearchEmail] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Fetch users
    useEffect(() => {
        fetch("https://dummyjson.com/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Filtered users based on search
    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    // Pagination calculations
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Delete user
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter((u) => u.id !== id));
        }
    };

    // Save edited user (PUT API simulation)
    const handleSave = (updatedUser) => {
        // PUT request simulation
        fetch(`https://dummyjson.com/users/${updatedUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(users.map((u) => (u.id === data.id ? data : u)));
                setSelectedUser(null);
            })
            .catch((err) => console.error(err));
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by email..."
                value={searchEmail}
                onChange={(e) => {
                    setSearchEmail(e.target.value);
                    setCurrentPage(1); // reset page on search
                }}
                className="border px-3 py-2 rounded mb-4 w-full md:w-1/3"
            />

            {/* Users Table */}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-2 py-1">ID</th>
                        <th className="border px-2 py-1">Image</th>
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Email</th>
                        <th className="border px-2 py-1">Phone</th>
                        <th className="border px-2 py-1">Role</th>
                        <th className="border px-2 py-1">Address</th>
                        <th className="border px-2 py-1">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-2 py-1">{user.id}</td>
                            <td className="border px-2 py-1">
                                <img src={user.image} alt={user.firstName} className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="border px-2 py-1">{user.firstName} {user.lastName}</td>
                            <td className="border px-2 py-1">{user.email}</td>
                            <td className="border px-2 py-1">{user.phone}</td>
                            <td className="border px-2 py-1">{user.role || "N/A"}</td>
                            <td className="border px-2 py-1">{user.address?.city}, {user.address?.state}</td>
                            <td className="border px-2 py-1 space-x-2">
                                <button
                                    onClick={() => { setSelectedUser(user); setIsEdit(false); }}
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => { setSelectedUser(user); setIsEdit(true); }}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onSave={handleSave}
                    isEdit={isEdit}
                />
            )}
        </div>
    );
};

export default Settings;
