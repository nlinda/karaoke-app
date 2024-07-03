import { useState, useEffect } from "react";

interface FetchState<T> {
    data: T | null;
    isPending: boolean;
    errorMessage: string | null;
}
function useFetch<T>(url:string): FetchState<T>  {
// const useFetch = <T>(url: string): FetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(url, { signal: abortController.signal })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setData(data);
            })
            .catch(e => {
                if (e.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setIsPending(false);
                    setErrorMessage(e.message);
                }
            });

        return () => abortController.abort();
    }, [url]);

    return { data, isPending, errorMessage };
};

export default useFetch;
