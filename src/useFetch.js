import { useEffect, useState } from 'react';

const useFetch = url =>
{
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>
  {
    const abortController = new AbortController();

    fetch(url,  { signal: abortController.signal })
      .then(res =>
      {
        if (!res.ok) throw Error('could not fetch data for that resource');

        return res.json();
      })
      .then(data =>
      {
        setData(data);
        setError(null);
        setIsPending(false);
      })
      .catch(err =>
      {
        if (err.name === 'AbortError') return console.log('fetch aborted');

        setIsPending(false);
        setError(err.message);
      });

    return () => abortController.abort();
  }, [ url ]);

  return { data, isPending, error };
};

export default useFetch;