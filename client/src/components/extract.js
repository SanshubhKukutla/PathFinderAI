import React, { useState } from 'react';
import axios from 'axios';

function Extractor() {
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const extractText = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file first.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', pdfFile);

    setIsLoading(true);
    try {
      // Assuming you have an endpoint '/api/extract-text' that handles PDF text extraction and API interaction
      const response = await axios.post('http://localhost:5000/api/extract-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(response.data);
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      alert('Failed to extract text from PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={extractText} disabled={isLoading}>
        {isLoading ? 'Extracting...' : 'Extract Text'}
      </button>
      {JSON.stringify(extractedText, null, 2) && (
        <div>
          <h3>Extracted Text:</h3>
          <pre>{JSON.stringify(extractedText, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Extractor;

