'use client' // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleResetAndNavigate = () => {
    try {
      reset(); // Versuche den Fehlerzustand zurückzusetzen
      // Führe nach dem Reset eine Navigation aus
      if (typeof window !== "undefined") {
        window.location.href = '/'; // Verwende window.location als Fallback
      }
    } catch (e) {
      console.error("Fehler beim Zurücksetzen oder Navigieren", e);
    }
  };

  return (
    <div className='h-full w-full bg-[#eee]'>
        <div className='w-3/4 m-auto h-full min-h-[600px] min-h-screen flex justify-center items-center flex-col'>
            <h2 className='mb-5'>Dear Customers and Partners,<br />Muller is permanently improving its Services and Products!</h2>
            <p>This page is under maintenance and will soon present an upgrade</p>
            <button className="pb-3 border-b border-black border-solid" onClick={handleResetAndNavigate}>
            Click here to return to the homepage.
            </button>
        </div>
    </div>
  );
}

