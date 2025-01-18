import React, { useEffect, useState } from 'react';
import './Table.css'
import { fetchData } from './api';

const Table = () => {
    const [data, setData] = useState([]);

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
    
    console.log(data)

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Message</th>
                        <th className="border border-gray-300 px-4 py-2">Submitted At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.message}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {new Date(item.createdAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
