import React from 'react';
import '../styles/Contact.css';

export default function Contact() {
  const teamMembers = [
    {
      id: 1,
      name: 'Aryan Tuwar',
      role: 'Team Leader',
      email: 'aryan.tuwar@example.com',
      phone: '(123) 456-7890',
    },
    {
      id: 2,
      name: 'Haroon Ahmed Bajwa',
      role: 'Developer',
      email: 'haroon.bajwa@example.com',
      phone: '(123) 456-7891',
    },
    {
      id: 3,
      name: 'Vivian Zhonghui Liu',
      role: 'Designer',
      email: 'vivian.liu@example.com',
      phone: '(123) 456-7892',
    },
    {
      id: 4,
      name: 'Mrinaal Nagpal',
      role: 'Marketing Specialist',
      email: 'mrinaal.nagpal@example.com',
      phone: '(123) 456-7893',
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Meet Our Team</h1>
        <p className="contact-intro">
          We're passionate about pets and dedicated to creating the best experience for pet owners and service providers.
          Feel free to reach out to any of our team members with questions or feedback!
        </p>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="member-avatar">
                <div className="avatar-circle">
                  {member.name.charAt(0)}
                </div>
                {member.role === 'Team Leader' && (
                  <span className="leader-badge">Leader</span>
                )}
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <div className="member-contact">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>{member.email}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>{member.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}