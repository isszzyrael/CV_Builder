import React, { useState } from 'react';
import { Download, User, Briefcase, GraduationCap, Award, Settings } from 'lucide-react';

export default function ITAdminCVBuilder() {
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    
    // Professional Summary
    summary: '',
    
    // Work Experience
    experiences: [{
      title: '',
      company: '',
      period: '',
      responsibilities: ['']
    }],
    
    // Skills
    technicalSkills: {
      platforms: [],
      security: [],
      databases: [],
      other: []
    },
    
    // Education
    education: [{
      degree: '',
      institution: '',
      year: ''
    }],
    
    // Certifications
    certifications: ['']
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' && !Array.isArray(prev[section])
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  const handleArrayChange = (section, index, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === index ? value : item)
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { title: '', company: '', period: '', responsibilities: [''] }]
    }));
  };

  const addResponsibility = (expIndex) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === expIndex ? { ...exp, responsibilities: [...exp.responsibilities, ''] } : exp
      )
    }));
  };

  const updateResponsibility = (expIndex, respIndex, value) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          responsibilities: exp.responsibilities.map((r, j) => j === respIndex ? value : r)
        } : exp
      )
    }));
  };

  const addSkill = (category) => {
    const skill = prompt(`Add a skill to ${category}:`);
    if (skill) {
      setFormData(prev => ({
        ...prev,
        technicalSkills: {
          ...prev.technicalSkills,
          [category]: [...prev.technicalSkills[category], skill]
        }
      }));
    }
  };

  const removeSkill = (category, index) => {
    setFormData(prev => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [category]: prev.technicalSkills[category].filter((_, i) => i !== index)
      }
    }));
  };

  const generateCV = () => {
    const cvContent = `
${formData.fullName.toUpperCase()}
${formData.email} | ${formData.phone} | ${formData.location}
${formData.linkedin ? `LinkedIn: ${formData.linkedin}` : ''} ${formData.github ? `| GitHub: ${formData.github}` : ''}

PROFESSIONAL SUMMARY
${formData.summary || 'Experienced IT Administrator with 3+ years specializing in systems administration, user access management, and technical support for remote-first organizations. Proven expertise in Google Workspace administration, SaaS platform integration, and security protocol implementation.'}

TECHNICAL SKILLS

Platforms & Tools:
${formData.technicalSkills.platforms.length > 0 ? formData.technicalSkills.platforms.join(', ') : 'Google Workspace Admin, HubSpot, Deel, ClickUp, Ashby, Slack'}

Security & Access Control:
${formData.technicalSkills.security.length > 0 ? formData.technicalSkills.security.join(', ') : '2FA/MFA Implementation, VPN Configuration, MDM Practices, Password Policies, Access Control'}

Database & Systems:
${formData.technicalSkills.databases.length > 0 ? formData.technicalSkills.databases.join(', ') : 'Database Administration, CSV Data Management, System Auditing, Backup Procedures'}

Additional:
${formData.technicalSkills.other.length > 0 ? formData.technicalSkills.other.join(', ') : 'DNS/Domain Management, SPF/DKIM Configuration, Basic Scripting, Process Documentation'}

PROFESSIONAL EXPERIENCE

${formData.experiences.map(exp => `
${exp.title}${exp.company ? ` | ${exp.company}` : ''}
${exp.period}
${exp.responsibilities.filter(r => r.trim()).map(r => `• ${r}`).join('\n')}
`).join('\n')}

EDUCATION

${formData.education.map(edu => `
${edu.degree}${edu.institution ? ` | ${edu.institution}` : ''}
${edu.year}
`).join('\n')}

${formData.certifications.filter(c => c.trim()).length > 0 ? `
CERTIFICATIONS
${formData.certifications.filter(c => c.trim()).map(c => `• ${c}`).join('\n')}
` : ''}
    `.trim();

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName.replace(/\s+/g, '_')}_IT_Admin_CV.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">IT Admin Specialist CV Builder</h1>
          </div>
          <p className="text-gray-600 mb-6">Create a tailored CV for the remote-first IT Admin role</p>

          {/* Personal Information */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Location (City, Country)"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
              <input
                type="text"
                placeholder="LinkedIn URL (optional)"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.linkedin}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
              />
              <input
                type="text"
                placeholder="GitHub URL (optional)"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.github}
                onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
              />
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional Summary</h2>
            <textarea
              placeholder="Brief overview of your IT admin experience (leave blank for default summary)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
            />
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
            </div>
            {formData.experiences.map((exp, expIndex) => (
              <div key={expIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={exp.title}
                    onChange={(e) => {
                      const newExps = [...formData.experiences];
                      newExps[expIndex].title = e.target.value;
                      setFormData(prev => ({ ...prev, experiences: newExps }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={exp.company}
                    onChange={(e) => {
                      const newExps = [...formData.experiences];
                      newExps[expIndex].company = e.target.value;
                      setFormData(prev => ({ ...prev, experiences: newExps }));
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Period (e.g., Jan 2022 - Present)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={exp.period}
                  onChange={(e) => {
                    const newExps = [...formData.experiences];
                    newExps[expIndex].period = e.target.value;
                    setFormData(prev => ({ ...prev, experiences: newExps }));
                  }}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Key Responsibilities:</label>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <input
                      key={respIndex}
                      type="text"
                      placeholder="Responsibility or achievement"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={resp}
                      onChange={(e) => updateResponsibility(expIndex, respIndex, e.target.value)}
                    />
                  ))}
                  <button
                    onClick={() => addResponsibility(expIndex)}
                    className="text-blue-600 text-sm hover:text-blue-700"
                  >
                    + Add Responsibility
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Experience
            </button>
          </div>

          {/* Technical Skills */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Technical Skills</h2>
            </div>
            {Object.entries({
              platforms: 'Platforms & Tools',
              security: 'Security & Access Control',
              databases: 'Database & Systems',
              other: 'Additional Skills'
            }).map(([key, label]) => (
              <div key={key} className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">{label}</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.technicalSkills[key].map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(key, index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => addSkill(key)}
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  + Add Skill
                </button>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Education</h2>
            </div>
            {formData.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Degree"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].degree = e.target.value;
                    setFormData(prev => ({ ...prev, education: newEdu }));
                  }}
                />
                <input
                  type="text"
                  placeholder="Institution"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={edu.institution}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].institution = e.target.value;
                    setFormData(prev => ({ ...prev, education: newEdu }));
                  }}
                />
                <input
                  type="text"
                  placeholder="Year"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={edu.year}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].year = e.target.value;
                    setFormData(prev => ({ ...prev, education: newEdu }));
                  }}
                />
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Certifications (Optional)</h2>
            {formData.certifications.map((cert, index) => (
              <input
                key={index}
                type="text"
                placeholder="Certification name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={cert}
                onChange={(e) => handleArrayChange('certifications', index, e.target.value)}
              />
            ))}
            <button
              onClick={() => setFormData(prev => ({ ...prev, certifications: [...prev.certifications, ''] }))}
              className="text-blue-600 text-sm hover:text-blue-700"
            >
              + Add Certification
            </button>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCV}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg font-semibold"
          >
            <Download className="w-5 h-5" />
            Download CV
          </button>
        </div>

        {/* Application Process Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Process Guide</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Step 1: Fill Application Form</h3>
              <p className="text-gray-600">Complete the company's application form with your details from the CV you just created.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Step 2: Record Video Showcase</h3>
              <p className="text-gray-600 mb-2">Create a 2-3 minute video highlighting:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Your experience with Google Workspace administration</li>
                <li>Examples of user provisioning/offboarding processes you've managed</li>
                <li>Your approach to security (2FA, VPN, MDM)</li>
                <li>A walkthrough of a technical problem you solved</li>
                <li>Why you're interested in this remote-first role</li>
              </ul>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Tips for Success</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Emphasize your remote work experience and self-management skills</li>
                <li>Highlight specific tools mentioned in the job posting</li>
                <li>Demonstrate your proactive approach to IT security</li>
                <li>Show examples of documentation or process improvements you've created</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}