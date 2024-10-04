import React, { useState } from 'react';
import jsPDF from 'jspdf';
const Freshertemp = ({ formData }) => {
    const [pdfUrl, setPdfUrl] = useState('');
    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });
        const content = document.getElementById('Freshertemp');
        pdf.html(content, {
            callback: (pdf) => {
                const pdfBlob = pdf.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setPdfUrl(pdfUrl);
                pdf.save('resume.pdf');
            },
            margin: [20, 20, 20, 20],
            autoPaging: true,
            html2canvas: { scale: 0.6 },
            x: 20,
            y: 20
        });
    };
    const copyPdfUrl = () => {
        navigator.clipboard.writeText(pdfUrl).then(() => {
            alert('PDF URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy PDF URL: ', err);
        });
    };
    return (
        <div className="p-4">
            <div id="Freshertemp" className="max-w-3xl mx-auto p-6 bg-white shadow-lg">
                <header className="flex justify-between items-start mb-6 pb-4 border-b-2 border-blue-600">
                    <div className="w-2/3">
                        <h1 className="text-3xl font-bold">{formData.Name}</h1>
                        <div className="mt-2">
                            {formData.LinkedIn && <a href={formData.LinkedIn} className="text-blue-600 mr-4">LinkedIn</a>}
                            {formData.GitHub && <a href={formData.GitHub} className="text-blue-600">GitHub</a>}
                        </div>
                    </div>
                    <div className="text-right text-sm">
                        <p>{formData.Location}</p>
                        <p>Email: {formData.Email}</p>
                        <p>Phone: {formData.PhoneNumber}</p>
                    </div>
                </header>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600">Career Objective</h2>
                    <div className="w-full h-0.5 bg-blue-600 my-2"></div>
                    <p className="text-base">{formData.CareerObjective}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600">Technical Skills</h2>
                    <div className="w-full h-0.5 bg-blue-600 my-2"></div>
                    <p><strong>Programming Languages: </strong>{formData.ProgrammingLanguages.join(', ')}</p>
                    <p><strong>Web Technologies: </strong>{formData.WebTechnologies.join(', ')}</p>
                    <p><strong>Tools and Frameworks: </strong>{formData.ToolsandFrameworks.join(', ')}</p>
                    <p><strong>Databases: </strong>{formData.Databases.join(', ')}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600">Experience</h2>
                    <div className="w-full h-0.5 bg-blue-600 my-2"></div>
                    {formData.Experience.map((job, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-medium">{job.Position}</h3>
                            <p className="text-base">{job.Company} | {job.Location}</p>
                            <p className="text-sm">{job.Dates}</p>
                            <p className="text-sm">{job.Description}</p>
                        </div>
                    ))}
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600">Education</h2>
                    <div className="w-full h-0.5 bg-blue-600 my-2"></div>
                    {formData.Education.map((edu, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-medium">{edu.Institution}</h3>
                            <p className="text-base">{edu.Degree} | {edu.Year}</p>
                        </div>
                    ))}
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600">Projects</h2>
                    <div className="w-full h-0.5 bg-blue-600 my-2"></div>
                    {formData.Projects.map((project, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-medium">{project.ProjectName}</h3>
                            <p className="text-sm">{project.Description}</p>
                        </div>
                    ))}
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600">Certifications</h2>
                    <div className="w-full h-0.5 bg-blue-600 my-2"></div>
                    {formData.Certifications.map((cert, index) => (
                        <p key={index}>{cert}</p>
                    ))}
                </section>
            </div>
            <button 
                className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700" 
                onClick={generatePDF}
            >
                Download
            </button>
            {pdfUrl && (
                <div className="mt-4">
                    <button 
                        className="bg-blue-600 text-white py-2 px-4 rounded mr-2 hover:bg-blue-700" 
                        onClick={copyPdfUrl}
                    >
                        Copy PDF URL
                    </button>
                    <a 
                        href={pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 underline"
                    >
                        Open PDF in new tab
                    </a>
                </div>
            )}
        </div>
    );
};
export default Freshertemp;