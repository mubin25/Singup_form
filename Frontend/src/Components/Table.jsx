import React, { useEffect, useState } from 'react';
import './Table.css';
import { fetchData, updateData, deleteData } from './api';

const Table = () => {
    const [data, setData] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchData();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);
    
    // Handle input changes for editable fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    // Enable editing mode for the selected item
    const handleEdit = (item) => {
        setEditingItemId(item._id);
        setEditedData({ ...item });
    };

    // Save edited data
    const handleSave = async () => {
        try {
            const response = await updateData(editingItemId, editedData); // Update the data in the backend
            setData((prevData) =>
                prevData.map((item) =>
                    item._id === editingItemId ? response.data : item
                )
            );
            setEditingItemId(null); // Exit editing mode
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    // Cancel editing without saving
    const handleCancel = () => {
        setEditingItemId(null); // Exit editing mode
    };

    // Delete data item
    const handleDelete = async (id) => {
        console.log("deleting data with id:", id);
        try {
            await deleteData(id); // Call delete API to remove the data
            setData(data.filter((item) => item._id !== id)); // Remove the item from local state
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                        <th className="border border-gray-300 px-4 py-2">Submitted At</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            {editingItemId === item._id ? (
                                <>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedData.name}
                                            onChange={handleChange}
                                            className="border p-1"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedData.email}
                                            onChange={handleChange}
                                            className="border p-1"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            name="phone"
                                            value={editedData.phone}
                                            onChange={handleChange}
                                            className="border p-1"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={handleSave}
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                        

                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
