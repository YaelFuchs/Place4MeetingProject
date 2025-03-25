
// // import React, { useState } from 'react';

// // const ImageUploadComponent = () => {
// //     const [selectedFile, setSelectedFile] = useState(null);

// //     const handleFileChange = (e) => {
// //         setSelectedFile(e.target.files[0]);
// //     };

// //     const handleUpload = async () => {
// //         if (!selectedFile) {
// //             console.log('Please select a file');
// //             return;
// //         }

// //         const formData = new FormData();
// //         console.log(selectedFile);
        
// //         formData.append('users', JSON.stringify({ userName: 'example_user' }));
// //         formData.append('image', selectedFile);

// //         try {
// //             const response = await fetch('http://localhost:8080/api/Users/signup', {
// //                 method: 'POST',
// //                 body: formData
// //             });

// //             if (response.ok) {
// //                 const data = await response.json();
// //                 console.log(data);
// //             } else {
// //                 console.error('Failed to upload image');
// //             }
// //         } catch (error) {
// //             console.error('Error:', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <input type="file" onChange={handleFileChange} />
// //             <button onClick={handleUpload}>Upload</button>
// //         </div>
// //     );
// // };

// // export default ImageUploadComponent;


// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUploadComponent = () => {
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             console.log('Please select a file');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', selectedFile);

//         try {
//             const response = await axios.post('http://localhost:8080/api/Users/signup', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             console.log('Image uploaded successfully:', response.data);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload</button>
//         </div>
//     );
// };

// export default ImageUploadComponent;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUploadComponent = () => {
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             console.log('Please select a file');
//             return;
//         }

//         const formData = new FormData();

//         const userData = { userName: 'example_user' };
//         formData.append('users', JSON.stringify(userData));
//         formData.append('file', selectedFile);

//         try {
//             const response = await axios.post('http://localhost:8080/api/Users/signup', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             console.log('Image uploaded successfully:', response.data);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload</button>
//         </div>
//     );
// };

// export default ImageUploadComponent;

import React, { useState } from 'react';
import axios from 'axios';

const fileToByteArray = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result;
            const byteArray = new Uint8Array(arrayBuffer);
            resolve(byteArray);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};

const ImageUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.log('Please select a file');
            return;
        }

        const byteFile = await fileToByteArray(selectedFile);

        const formData = new FormData();
        formData.append('users', JSON.stringify({ userName: 'example_user' }));
        formData.append('file', new Blob([byteFile]));

        try {
            const response = await axios.post('http://localhost:8080/api/Users/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImageUploadComponent;