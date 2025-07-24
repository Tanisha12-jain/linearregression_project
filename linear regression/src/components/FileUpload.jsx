import React from 'react';

const FileUpload = ({ handleFile }) => {
  return (
    <div className="mb-4">
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
    </div>
  );
};

export default FileUpload;
