import { useState, useEffect } from 'react';
import { get as _get } from 'lodash';

const useStream = (
    getPage, options,
) => {
    const defaultOptions = {
        dataLocation: 'data',
        totalRecordsLocation: 'total',
    };

    const determinedOpts = { ...defaultOptions, ...options };

    const {
        dataLocation,
        totalRecordsLocation,
    } = determinedOpts;

    const [totalRecords, setTotalRecords] = useState(0);
    const [rows, setRows] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let currentPage = 1;
        let totalPages = 1;

        const fetchPage = async () => {
            const response = await getPage(currentPage);
            const pageRows = _get(response, dataLocation);

            setRows((prevRows) => prevRows.concat(pageRows));

            if (currentPage === 1) {
                const determinedTotalRecords = _get(response, totalRecordsLocation);
                setTotalRecords(determinedTotalRecords);
                totalPages = Math.ceil(determinedTotalRecords / pageRows.length);
            }
        };

        (async () => {
            try {
                await fetchPage();
                setIsLoading(false);

                while (currentPage < totalPages) {
                    setIsStreaming(true);
                    currentPage += 1;
                    // eslint-disable-next-line no-await-in-loop
                    await fetchPage(currentPage);
                }
            } catch (e) {
                setError(e);
            } finally {
                setIsStreaming(false);
            }
        })();
    }, [getPage, dataLocation, totalRecordsLocation]);

    return [
        rows,
        {
            totalRecords,
            isStreaming,
            isLoading,
            progress: rows.length / totalRecords,
            error,
        },
    ];
};

export default useStream;
