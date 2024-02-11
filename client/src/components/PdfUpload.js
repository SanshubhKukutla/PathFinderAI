// import React, { useState } from 'react';

// function PdfUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleFileUpload = async (event) => {
//     event.preventDefault();
//     if (!selectedFile) {
//       alert('Please select a PDF file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('pdf', selectedFile);

//     try {
//       const response = await fetch('http://localhost:5000/api/extract-text', {
//         method: 'POST',
//         body: formData,
//       });
//       if (!response.ok) throw new Error('Network response was not ok.');
//       const result = await response.json();
//       console.log('Upload successful:', result);
//       // Perform additional actions upon successful upload, if necessary
//     } catch (error) {
//       console.error('There has been a problem with your fetch operation:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>PDF Upload</h1>
//       <form onSubmit={handleFileUpload}>
//         <input type="file" onChange={handleFileChange} accept="application/pdf" />
//         <button type="submit">Upload PDF</button>
//       </form>
//     </div>
//   );
// }

// export default PdfUpload;
