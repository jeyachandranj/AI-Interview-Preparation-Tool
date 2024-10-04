import React, { useState } from 'react';
import jsPDF from 'jspdf';

const Midleveltempl = ({ formData }) => {
    const [pdfUrl, setPdfUrl] = useState('');

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });

        const content = document.getElementById('resume-template-2');
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
            y: 20,
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
                <div className="mb-5">
                    <div className="font-bold uppercase text-lg">{title}</div>
                    <ul className="list-none pl-0">
                        {content.map((item, index) => (
                            <li key={index} className="mb-2">
                                <span className="inline-block text-gray-800 font-bold mr-1">&bull;</span>{item}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="mb-5">
                    <div className="font-bold uppercase text-lg">{title}</div>
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
                    <div className="mb-5">
                        <div className="font-bold uppercase text-lg">Career Objective</div>
                        <p>{formData.CareerObjective}</p>
                    </div>
                )}
                {renderSection('Experience', formData.Experience)}
                {renderSection('Projects', formData.Projects)}
                {renderSection('Certifications', formData.Certifications)}
                {renderSection('Languages', formData.Languages)}
                {renderSection('Achievements', formData.Achievements)}
                {renderSection('Leadership Qualities', formData.LeadershipQualities)}
            </>
        );
    };

    return (
        <div className="p-5 max-w-7xl mx-auto font-sans text-gray-900">
            <div id="resume-template-2" className="bg-white p-4">
                <div className="flex justify-between items-start mb-6 flex-wrap">
                    <div className="flex-1 text-left mr-5">
                        <p className="text-2xl font-bold mb-1">{formData.Name || ''}</p>
                    </div>
                    <div className="flex-1 text-right flex flex-col items-end">
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-4">
                                {formData.PhoneNumber && <p>Phone: {formData.PhoneNumber}</p>}
                                {formData.Email && <p>Email: {formData.Email}</p>}
                            </div>
                            <div className="flex gap-4">
                                {formData.GitHub && <p>GitHub: <a href={formData.GitHub} target="_blank" rel="noopener noreferrer">{formData.GitHub}</a></p>}
                                {formData.LinkedIn && <p>LinkedIn: <a href={formData.LinkedIn} target="_blank" rel="noopener noreferrer">{formData.LinkedIn}</a></p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b-4 border-black mb-6"></div>
                {renderResume()}
            </div>
            <button className="block mx-auto my-5 py-2 px-5 text-lg bg-blue-600 text-white rounded hover:bg-blue-800" onClick={generatePDF}>Download as PDF</button>
            {pdfUrl && (
                <div className="text-center">
                    <button className="py-2 px-5 text-lg bg-blue-600 text-white rounded hover:bg-blue-800" onClick={copyPdfUrl}>Copy PDF URL</button>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="block mt-4 text-blue-500">Open PDF in new tab</a>
                </div>
            )}
        </div>
    );
};

export default Midleveltempl;