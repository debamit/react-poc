import React, { useEffect, useState } from 'react';

const CounterDisplay = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleMessage = (event) => {
      const message = event.data;
      if (message && message.count) {
        setCount(message.count);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);


  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleClose = () => {
    window.parent.postMessage({ count, onClose: true }, '*');

    // Close the iframe
    const iframe = document.getElementById('reactAppIframe');
    if (iframe) {
      iframe.style.display = 'none';
      // or iframe.remove(); to completely remove it from the DOM
    }
  };

  return (
    <div>
      <h2>React Counter App</h2>
      <p>Count from Angular: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default CounterDisplay;