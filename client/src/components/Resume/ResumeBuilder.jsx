import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Midleveltempl from './Midleveltempl'
import './ResumeBuilder.css'; // Importing CSS for styling
import Freshertemp from './Freshertemp';


const ResumeBuilder = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!formData || !formData.CareerLevel) {
            navigate('/display');
            window.alert("Check Career Level");
        }
    }, [formData, navigate]);

    const renderTemplateByCareerLevel = () => {
        if (!formData || !formData.CareerLevel) {
            return <p>Error: Missing career level data.</p>; // Render an error message or a fallback UI
        }

        switch (formData.CareerLevel.toLowerCase()) {
            case 'fresher':
                return <Freshertemp formData={formData} />;
            case 'mid-level':
                return <Midleveltempl formData={formData} />;
            case 'senior-level':
                return <Midleveltempl formData={formData} />;
            
            default:
                return <Freshertemp formData={formData} />; // Fallback template
        }
    };

    return (
        <div className="resume-builder-container"> {/* Use CSS class to limit width and add padding */}
            <h1 className="resume-builder-title">
                Rendering Resume for {formData?.CareerLevel || 'Unknown'} Level
            </h1>
            <div className="resume-builder-content"> {/* Inner container for the template */}
                {renderTemplateByCareerLevel()}
            </div>
        </div>
    );
};

export default ResumeBuilder;
