// TableComponent.js
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rootTermMessage, setRootTermMessage] = useState(null);
    const [nextPage, setNextPage] = useState(null);



    const fetchData = async (url) => {
        try {
            setLoading(true);
            const response = await axios.get(url || 'http://127.0.0.1:8000/api/table/efotermstable');
            if (url) {
                setData(prevData => [...prevData, ...response.data.results]);
            } else {
                setData(response.data.results);
            }
            setNextPage(response.data.next);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLoadMore = () => {
        if (nextPage) {
            fetchData(nextPage);
        }
    };

    const columns = [
        {
            title: 'Term ID',
            dataIndex: 'term_id',
            key: 'term_id',
        },
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'IRI',
            dataIndex: 'iri',
            key: 'iri',
            render: (iri) => <a href={iri} target="_blank" rel="noopener noreferrer">{iri}</a>,
        },
        {
            title: 'Synonyms',
            dataIndex: 'synonyms',
            key: 'synonyms',
            render: synonyms => <div>{synonyms.join(', ')}</div>,
        },
        {
            title: 'Description',
            dataIndex: 'descriptions',
            key: 'descriptions',
            render: descriptions => <div>{descriptions.join(', ')}</div>,
        },
        {
            title: 'Parents',
            dataIndex: 'parents',
            key: 'parents',
            render: (text, record) => (
                <a onClick={() => handleParentClick(record.id)}>View Parents</a>
            ),
        },
        {
            title: 'Children',
            dataIndex: 'children',
            key: 'children',
            render: (text, record) => (
                <a onClick={() => handleChildrenClick(record.id)}>View Children</a>
            ),
        },
    ];

    const handleParentClick = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/table/efotermstable/${id}/parents`);
            if (response.data.results.length === 0) {
                setData([]);
                setRootTermMessage("This is a root term, no parents available. Click the clear button.");
                setLoading(false);
            } else {
                setData(response.data.results);
                setRootTermMessage(null);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handleChildrenClick = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/table/efotermstable/${id}/children`);
            setData(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handleClearData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/table/efotermstable');
            setData(response.data.results);
            setRootTermMessage(null);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <div>
            <div className="table-title">OLS Lookup Service</div>
            <div className="button-container">
                <button className="clear-button" onClick={handleClearData}>
                    Clear Data
                </button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
            />
            {
                rootTermMessage && (
                    <div className="root-term-message">{rootTermMessage}</div>
                )
            }
            {
                nextPage && (
                    <div className="load-more-container">
                        <button className="load-more-button" onClick={handleLoadMore}>
                            Load More Data
                        </button>
                    </div>
                )
            }
        </div >
    );
};
export default TableComponent;
