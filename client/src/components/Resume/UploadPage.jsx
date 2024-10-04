import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UploadPage({ setResumeData }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            console.error('No file selected!');
            return;
        }
        const data = new FormData();
        data.append('pdf_doc', file);
        setLoading(true); // Set loading to true when upload starts
        try {
            const response = await axios.post('http://localhost:5000/process', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResumeData(response.data); // Set parsed resume data
            navigate('/display'); // Navigate to display page
        } catch (error) {
            console.error('Error parsing the resume!', error);
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };
    const handleBuildFromScratch = () => {
        setResumeData({}); // Set empty resume data
        navigate('/display'); // Navigate to display page
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full text-lg">1</div>
                <div className="h-1 bg-gray-300 w-20 mx-2"></div>
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full text-lg">2</div>
                <div className="h-1 bg-gray-300 w-20 mx-2"></div>
                <div className="flex items-center justify-center w-12 h-12 bg-gray-300 text-white rounded-full text-lg">3</div>
            </div>
            {loading ? (
                <div className="flex flex-col items-center text-white">
                    <div className="loader"></div>
                    <p>Processing your resume, please wait...</p>
                </div>
            ) : (
                <div className="bg-blue-500 text-white shadow-lg rounded-lg p-12 w-96 md:w-1/2 lg:w-1/3"> {/* Set background to black and increase size */}
                    <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Resume</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border rounded p-2 mb-4 w-full bg-gray-800 text-white" // Set background color for input
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded px-6 py-3 hover:bg-black-600 w-full"
                        >
                            Choose file
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
export default UploadPage;