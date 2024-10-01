import React,{useState} from 'react';
import jsPDF from 'jspdf';
import './Midleveltempl.css';

const Midleveltempl = ({ formData }) => {
    const [pdfUrl, setPdfUrl] = useState('');

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        // Get the HTML content for the resume
        const content = document.getElementById('resume-template-2');
        
        // Add content to the PDF using the html method of jsPDF
        pdf.html(content, {
            callback: (pdf) => {
                // Save the PDF to a Blob
                const pdfBlob = pdf.output('blob');
                // Create a URL for the Blob
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setPdfUrl(pdfUrl);
                // Automatically download the PDF
                pdf.save('resume.pdf');
            },
            margin: [20, 20, 20, 20], // Margin for the document
            autoPaging: true,         // Auto page handling for long content
            html2canvas: { scale: 0.6 }, // Reduces size to fit better in PDF
            x: 20,                    // X position
            y: 20                     // Y position
        });
    };

    const copyPdfUrl = () => {
        navigator.clipboard.writeText(pdfUrl).then(() => {
            alert('PDF URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy PDF URL: ', err);
        });
    };

    const renderSection = (title, content) => {
        if (!content || content.length === 0) return null;
   
        if (title === 'Certifications' || title === 'Languages' || title === 'Hobbies' || title === 'Areas of Interest' || title === 'Achievements' || title === 'Leadership Qualities') {
            return (
                <div className="section">
                    <div className="section-heading">{title}</div>
                    <ul>
                        {content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            // Other sections remain unchanged
            return (
                <div className="section">
                    <div className="section-heading">{title}</div>
                    {content.map((item, index) => (
                        <div key={index}>
                            {Object.entries(item).map(([key, value]) => (
                                typeof value === 'object' ? (
                                    Object.entries(value).map(([nestedKey, nestedValue]) => (
                                        nestedValue ? <p key={nestedKey}><strong>{nestedKey}:</strong> {nestedValue}</p> : null
                                    ))
                                ) : value ? (
                                    <p key={key}><strong>{key}:</strong> {value}</p>
                                ) : null
                            ))}
                        </div>
                    ))}
                </div>
            );
        }
    };
   

    const renderResume = () => {
        if (!formData.CareerLevel) {
            return <p>Career Level not specified</p>;
        }
            return (
                <>
                    {formData.CareerObjective && (
                        <div className="section">
                            <div className="section-heading">Career Objective</div>
                            <p>{formData.CareerObjective}</p>
                        </div>
                    )}
                    {renderSection('Experience', formData.Experience)}
                    {renderSection('Projects', formData.Projects)}
                    {renderSection('Certifications', formData.Certifications)}
                    {renderSection('Languages', formData.Languages)}
                    {renderSection('Achievements',formData.Achievements)}
                    {renderSection('Leadership Qualities', formData.LeadershipQualities)}
                </>
            );
        }
   

    return (
        <div className="resume-container">
            <div id="resume-template-2">
                <div className="header">
                    <div className="left-section">
                        <p className="name">{formData.Name || ''}</p>
                        
                    </div>
                    <div className="right-section">
                        <div className="contact-info">
                            {/* Phone and email on one line */}
                            <div className="phone-email">
                                {formData.PhoneNumber && <p>Phone: {formData.PhoneNumber}</p>}
                                {formData.Email && <p>Email:{formData.Email}</p>}
                            </div>
                            {/* Social links on a separate line */}
                            <div className="social-links">
                                {formData.GitHub && <p>GitHub: <a href={formData.GitHub} target="_blank" rel="noopener noreferrer">{formData.GitHub}</a></p>}
                                {formData.LinkedIn && <p>LinkedIn: <a href={formData.LinkedIn} target="_blank" rel="noopener noreferrer">{formData.LinkedIn}</a></p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="resume-divider"></div>
                {renderResume()}
            </div>
            <button className="pdf-download-button" onClick={generatePDF}>Download as PDF</button>
            {pdfUrl && (
                <div>
                    <button className="pdf-download-button" onClick={copyPdfUrl}>Copy PDF URL</button>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Open PDF in new tab</a>
                </div>
            )}
        </div>
    );
};

export default Midleveltempl ;
