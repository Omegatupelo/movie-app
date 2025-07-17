import React from 'react'; // Import React

// Component that shows a loading spinner with text
const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div> {/* Visual spinner element */}
        <p>Loading movies...</p> {/* Optional message to user */}
      </div>
    </div>
  );
};

export default LoadingSpinner; // Export the component