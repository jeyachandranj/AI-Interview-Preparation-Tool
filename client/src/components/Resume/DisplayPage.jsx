import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DisplayPage.module.css'; // Import the enhanced CSS module
import ProgressBar from './ProgressBar';

const DisplayPage = ({ resumeData }) => {
  const [formData, setFormData] = useState(() => ({
    Name: resumeData?.Name || '',
    Role: resumeData?.Role || '',
    Email: resumeData?.Email || '',
    PhoneNumber: resumeData?.PhoneNumber || '',
    GitHub: resumeData?.GitHub || '',
    LinkedIn: resumeData?.LinkedIn || '',
    CareerObjective: resumeData?.CareerObjective || '',
    Education: resumeData?.Education || [{ Institution: '', Year: '', Degree: '', Results: '' }],
    ProgrammingLanguages: Array.isArray(resumeData?.ProgrammingLanguages) ? resumeData.ProgrammingLanguages : resumeData?.ProgrammingLanguages ? [resumeData.ProgrammingLanguages] : [],
    WebTechnologies: Array.isArray(resumeData?.WebTechnologies) ? resumeData.WebTechnologies : resumeData?.WebTechnologies ? [resumeData.WebTechnologies] : [],
    OtherSkills: Array.isArray(resumeData?.OtherSkills) ? resumeData.OtherSkills : resumeData?.OtherSkills ? [resumeData.OtherSkills] : [],
    ToolsandFrameworks: Array.isArray(resumeData?.ToolsandFrameworks) ? resumeData.ToolsandFrameworks : resumeData?.ToolsandFrameworks ? [resumeData.ToolsandFrameworks] : [],
    Databases: Array.isArray(resumeData?.Databases) ? resumeData.Databases : resumeData?.Databases ? [resumeData.Databases] : [],
    Experience: resumeData?.Experience || [{ Position: '', Company: '', Location: '', Dates: '', Description: '' }],
    Projects: resumeData?.Projects || [{ ProjectName: '', Description: '' }],
    Achievements: resumeData?.Achievements ? Object.values(resumeData.Achievements) : [],
    CareerLevel: resumeData?.CareerLevel || '',
    Certifications: resumeData?.Certifications || [],
    AreasOfInterest: resumeData?.AreasOfInterest || [],
    LeadershipQualities: resumeData?.LeadershipQualities || []
  }));

  const [newAchievement, setNewAchievement] = useState('');
  const [newProject, setNewProject] = useState({ ProjectName: '', Description: '' });
  const [newEducation, setNewEducation] = useState({ Institution: '', Year: '', Degree: '', Results: '' });
  const [newCertification, setNewCertification] = useState('');
  const [newExperience, setNewExperience] = useState({ Position: '', Company: '', Location: '', Dates: '', Description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      ...resumeData,
      Achievements: resumeData?.Achievements ? Object.values(resumeData.Achievements) : [],
      ProgrammingLanguages: Array.isArray(resumeData?.ProgrammingLanguages) ? resumeData.ProgrammingLanguages : [resumeData?.ProgrammingLanguages],
      WebTechnologies: Array.isArray(resumeData?.WebTechnologies) ? resumeData.WebTechnologies : [resumeData?.WebTechnologies],
      OtherSkills: Array.isArray(resumeData?.OtherSkills) ? resumeData.OtherSkills : [resumeData?.OtherSkills],
      ToolsandFrameworks: Array.isArray(resumeData?.ToolsandFrameworks) ? resumeData.ToolsandFrameworks : [resumeData?.ToolsandFrameworks],
      Databases: Array.isArray(resumeData?.Databases) ? resumeData.Databases : [resumeData?.Databases],
      Experience: resumeData?.Experience || [{ Position: '', Company: '', Location: '', Dates: '', Description: '' }],
      Projects: resumeData?.Projects || [{ ProjectName: '', Description: '' }],
      CareerLevel: resumeData?.CareerLevel || '',
      Certifications: resumeData?.Certifications || [],
      AreasOfInterest: resumeData?.AreasOfInterest || [],
      LeadershipQualities: resumeData?.LeadershipQualities || []
    }));
  }, [resumeData]);

  const handleInputChange = (e, key, section, index) => {
    const { value } = e.target;
    if (section) {
      const updatedArray = [...formData[section]];
      if (typeof updatedArray[index] === 'object') {
        updatedArray[index] = { ...updatedArray[index], [key]: value };
      } else {
        updatedArray[index] = value;
      }
      setFormData({ ...formData, [section]: updatedArray });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleGenerateResume = () => {
    navigate('/resume-builder', { state: { formData } });
  };

  const getDisplayValue = (field) => Array.isArray(field) ? field.join(', ') : field;

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setFormData(prevData => ({
        ...prevData,
        Achievements: [...prevData.Achievements, newAchievement]
      }));
      setNewAchievement('');
    }
  };

  const handleAddProject = () => {
    if (newProject.ProjectName.trim() && newProject.Description.trim()) {
      setFormData(prevData => ({
        ...prevData,
        Projects: [...prevData.Projects, newProject]
      }));
      setNewProject({ ProjectName: '', Description: '' });
    }
  };

  const handleAddEducation = () => {
    if (newEducation.Institution.trim() && newEducation.Year.trim() && newEducation.Degree.trim() && newEducation.Results.trim()) {
      setFormData(prevData => ({
        ...prevData,
        Education: [...prevData.Education, newEducation]
      }));
      setNewEducation({ Institution: '', Year: '', Degree: '', Results: '' });
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prevData => ({
        ...prevData,
        Certifications: [...prevData.Certifications, newCertification]
      }));
      setNewCertification('');
    }
  };

  const handleAddExperience = () => {
    if (newExperience.Position.trim() && newExperience.Company.trim() && newExperience.Location.trim() && newExperience.Dates.trim() && newExperience.Description.trim()) {
      setFormData(prevData => ({
        ...prevData,
        Experience: [...prevData.Experience, newExperience]
      }));
      setNewExperience({ Position: '', Company: '', Location: '', Dates: '', Description: '' });
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = formData.Education.filter((_, i) => i !== index);
    setFormData({ ...formData, Education: updatedEducation });
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = formData.Projects.filter((_, i) => i !== index);
    setFormData({ ...formData, Projects: updatedProjects });
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = formData.Certifications.filter((_, i) => i !== index);
    setFormData({ ...formData, Certifications: updatedCertifications });
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = formData.Achievements.filter((_, i) => i !== index);
    setFormData({ ...formData, Achievements: updatedAchievements });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = formData.Experience.filter((_, i) => i !== index);
    setFormData({ ...formData, Experience: updatedExperience });
  };

  const handleCareerLevelChange = (e) => {
    setFormData({ ...formData, CareerLevel: e.target.value });
  };

  const handleChange = (event, field) => {
    const { value } = event.target;

    const newValue = value.includes(',') ? value.split(',').map(item => item.trim()) : value;

    setFormData({
      ...formData,
      [field]: newValue,
    });
  };

  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    {
      title: 'Personal Information',
      content: (
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Personal Information</h2>
          {['Name', 'Email', 'PhoneNumber', 'GitHub', 'LinkedIn', 'Role'].map(field => (
            <p className={styles.displayPageParagraph} key={field}>
              <strong>{field}:</strong>
              <input
                type={field === 'Email' ? 'email' : 'text'}
                className={styles.displayPageInput}
                value={formData[field]}
                onChange={(e) => handleInputChange(e, field)}
                placeholder={`Enter your ${field.toLowerCase()}`}
              />
            </p>
          ))}
        </section>
      ),
    },
    {
      title: 'Career Objective',
      content: (
        // Career Objective section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Career Objective</h2>
          <textarea
            className={styles.displayPageTextarea}
            value={formData.CareerObjective}
            onChange={(e) => handleInputChange(e, 'CareerObjective')}
            placeholder="Write your career objective"
          />
        </section>
      ),
    },
    {
      title: 'Career Level',
      content: (
        // Career Level section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Career Level</h2>
          <input
            type="text"
            className={styles.displayPageInput}
            value ={formData.CareerLevel}
            onChange={handleCareerLevelChange}
            placeholder="Enter your career level (e.g., Fresher,Mid-level, Senior-level)"
          />
        </section>
      ),
    },
    {
      title: 'Programming Languages',
      content: (
        // Programming Languages section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Programming Languages</h2>
          <p className={styles.displayPageParagraph}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={getDisplayValue(formData.ProgrammingLanguages)}
              onChange={(e) => handleChange(e, 'ProgrammingLanguages')}
              placeholder="Enter programming languages"
            />
          </p>
        </section>
      ),
    },
    {
      title: 'Web Technologies',
      content: (
        // Web Technologies section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Web Technologies</h2>
          <p className={styles.displayPageParagraph}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={getDisplayValue(formData.WebTechnologies)}
              onChange={(e) => handleChange(e, 'WebTechnologies')}
              placeholder="Enter web technologies"
            />
          </p>
        </section>
      ),
    },
    {
      title: 'Tools and Frameworks',
      content: (
        // Tools and Frameworks section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Tools and Frameworks</h2>
          <p className={styles.displayPageParagraph}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={getDisplayValue(formData.ToolsandFrameworks)}
              onChange={(e) => handleChange(e, 'ToolsandFrameworks')}
              placeholder="Enter tools and frameworks"
            />
          </p>
        </section>
      ),
    },
    {
      title: 'Databases',
      content: (
        // Databases section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Databases</h2>
          <p className={styles.displayPageParagraph}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={getDisplayValue(formData.Databases)}
              onChange={(e) => handleChange(e, 'Databases')}
              placeholder="Enter databases"
            />
          </p>
        </section>
      ),
    },
    {
      title: 'Other Skills',
      content: (
        // Other Skills section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Other Skills</h2>
          <p className={styles.displayPageParagraph}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={getDisplayValue(formData.OtherSkills)}
              onChange={(e) => handleChange(e, 'OtherSkills')}
              placeholder="Enter other skills"
            />
          </p>
        </section>
      ),
    },
    {
      title: 'Areas Of Interest',
      content: (
        // Areas Of Interest section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Areas Of Interest</h2>
          <p className={styles.displayPageParagraph}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={getDisplayValue(formData.AreasOfInterest)}
              onChange={(e) => handleChange(e, 'AreasOfInterest')}
              placeholder="Enter Areas of Interest"
            />
          </p>
        </section>
      ),
    },
    {
      title: 'LeadershipQualities',
      content: (
        // LeadershipQualities section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>LeadershipQualities</h2>
          <p className={styles.displayPageParagraph}>
            <input
              type="text"
              className={styles.displayPageInput}
              value={getDisplayValue(formData.LeadershipQualities)}
              onChange={(e) => handleChange(e, 'LeadershipQualities')}
              placeholder="Enter leaderShip Qualities"
            />
          </p>
        </section>
      ),
    },
    {
      title: 'Education',
      content: (
        // Education section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Education</h2>

          {/* Existing Education Entries */}
          {formData.Education.map((edu, index) => (
            <div key={index} className={styles.dynamicSection}>
              {['Institution', 'Year', 'Degree', 'Results'].map(field => (
                <p className={styles.displayPageParagraph} key={field}>
                  <strong>{field}:</strong>
                  <input
                    type="text"
                    className={ styles.displayPageInput}
                    value={edu[field]}
                    onChange={(e) => handleInputChange(e, field, 'Education', index)}
                    placeholder={`Enter ${field.toLowerCase()}`}
                  />
                </p>
              ))}
              <button className={styles.displayPageButton} onClick={() => handleRemoveEducation(index)} style={{width:"300px"}}>Remove Education</button>
            </div>
          ))}

          {/* Add New Education Section */}
          <div className={styles.addEducationSection}>
            {['Institution', 'Year', 'Degree', 'Results'].map(field => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={newEducation[field]}
                onChange={(e) => setNewEducation({ ...newEducation, [field]: e.target.value })}
                className={styles.displayPageInput}
              />
            ))}
            <button className={styles.displayPageButton} onClick={handleAddEducation} style={{width:"300px"}}>Add Education</button>
          </div>
        </section>
      ),
    },
    {
      title: 'Projects',
      content: (
        // Projects section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Projects</h2>
          {/* Existing Projects */}
          {formData.Projects.map((project, index) => (
            <div key={index} className={styles.dynamicSection}>
              {['ProjectName', 'Description'].map(field => (
                <p className={styles.displayPageParagraph} key={field}>
                  <strong>{field.replace(/([A-Z])/g, ' $1')}:</strong>
                  {field === 'Description' ? (
                    <textarea
                      className={styles.displayPageTextarea}
                      value={project[field]}
                      onChange={(e) => handleInputChange(e, field, 'Projects', index)}
                      placeholder={`Enter project ${field.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type="text"
                      className={styles.displayPageInput}
                      value={project[field]}
                      onChange={(e) => handleInputChange(e, field, 'Projects', index)}
                      placeholder={`Enter project ${field.toLowerCase()}`}
                    />
                  )}
                </p>
              ))}
              <button className={styles.displayPageButton} onClick={() => handleRemoveProject(index)} style={{width:"300px"}}>Remove Project</button>
            </div>
          ))}
          {/* Add New Project Section */}
          <div className={styles.addProjectSection}>
            {['ProjectName', 'Description'].map(field => (
              <p key={field} className={styles.displayPageParagraph}>
                <strong>{field.replace(/([A-Z])/g, ' $1')}:</strong>
                {field === 'Description' ? (
                  <textarea
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={newProject[field]}
                    onChange={(e) => setNewProject({ ...newProject, [field]: e.target.value })}
                    className={styles.displayPageTextarea}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={newProject[field]}
                    onChange={(e) => setNewProject({ ...newProject, [field]: e.target.value })}
                    className={styles.displayPageInput}
                  />
                )}
              </p>
            ))}
            <button className={styles.displayPageButton} onClick={handleAddProject} style={{width:"300px"}}>Add Project</button>
          </div>
        </section>
      ),
    },
    {
      title: 'Experience',
      content: (
        // Experience section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Experience</h2>
          {/* Existing Experience Entries */}
          {formData.Experience.map((exp, index) => (
            <div key={index} className={styles.dynamicSection}>
              {['Position', 'Company', 'Location', 'Dates', 'Description'].map(field => (
                <p className={styles.displayPageParagraph} key={field}>
                  <strong>{field.replace(/([A-Z])/g, ' $1')}:</strong>
                  {field === 'Description' ? (
                    <textarea
                      className={styles.displayPageTextarea}
                      value={exp[field]}
                      onChange={(e) => handleInputChange(e, field, 'Experience', index)}
                      placeholder={`Enter ${field.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type="text"
                      className={styles.displayPageInput}
                      value={exp[field]}
                      onChange={(e) => handleInputChange(e, field, 'Experience', index)}
                      placeholder={`Enter ${field.toLowerCase()}`}
                    />
                  )}
                </p>
              ))}
              <button className={styles.displayPageButton} onClick={() => handleRemoveExperience(index)} style={{width:"300px"}}>Remove Experience</button>
            </div>
          ))}

          {/* Add New Experience Section */}
          <div className={styles.addExperienceSection}>
            {['Position', 'Company', 'Location', 'Dates', ' Description'].map(field => (
              <p key={field} className={styles.displayPageParagraph}>
                <strong>{field.replace(/([A-Z])/g, ' $1')}:</strong>
                {field === 'Description' ? (
                  <textarea
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={newExperience[field]}
                    onChange={(e) => setNewExperience({ ...newExperience, [field]: e.target.value })}
                    className={styles.displayPageTextarea}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={newExperience[field]}
                    onChange={(e) => setNewExperience({ ...newExperience, [field]: e.target.value })}
                    className={styles.displayPageInput}
                  />
                )}
              </p>
            ))}
            <button className={styles.displayPageButton} onClick={handleAddExperience} style={{width:"300px"}}>Add Experience</button>
          </div>
        </section>
      ),
    },
    {
      title: 'Achievements',
      content: (
        // Achievements section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Achievements</h2>
          <ul>
            {formData.Achievements.length ? (
              formData.Achievements.map((achievement, index) => (
                <li key={index}>
                  {achievement}
                  <button className={styles.removeButton} onClick={() => handleRemoveAchievement(index)}>Remove</button>
                </li>
              ))
            ) : (
              <p>No achievements to display.</p>
            )}
          </ul>
          <div className={styles.addAchievementSection}>
            <textarea
              placeholder="Enter your achievement"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              className={styles.displayPageTextarea}
            />
            <button className={styles.displayPageButton} onClick={handleAddAchievement} style={{width:"300px"}}>Add Achievement</button>
          </div>
        </section>
      ),
    },
    {
      title: 'Certifications',
      content: (
        // Certifications section content
        <section className={styles.formSection}>
          <h2 className={styles.displayPageSubHeader}>Certifications</h2>
          <ul>
            {formData.Certifications.length ? (
              formData.Certifications.map((certification, index) => (
                <li key={index}>
                  {certification}
                  <button className={styles.removeButton} onClick={() => handleRemoveCertification(index)}>Remove</button>
                </li>
              ))
            ) : (
              <p>No certifications to display.</p>
            )}
          </ul>
          <div className={styles.addCertificationSection}>
            <input
              type="text"
              placeholder="Enter certification"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              className={styles.displayPageInput}
            />
            <button className={styles.displayPageButton} onClick={handleAddCertification} style={{width:"300px"}}>Add Certification</button>
          </div>
        </section>
      ),
    },
  ];

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };
  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };


  return (
    <div className={styles.displayPageContainer}>
     <h1 className={styles.displayPageHeader}>Resume Details</h1>
      <ProgressBar currentSection={currentSection} totalSections={sections.length} />
    
      {sections[currentSection].content}
      <section className={styles.buttonSection}>
      {
            currentSection > 0 && (
                <button className={styles.displayPageButton} onClick={handlePrevSection}>Prev</button>
            )
        }
        {currentSection < sections.length - 1 && (
          <button className={styles.displayNextButton} onClick={handleNextSection}>Next</button>
        )}

        {currentSection === sections.length - 1 && (
          <button className={styles.displayPageButton} onClick={handleGenerateResume}>Generate Resume</button>
        )}
      </section>
    </div>
  );
};

export default DisplayPage;