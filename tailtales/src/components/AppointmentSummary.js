import React from 'react';
import "../styles/AppointmentSummary.css";

const AppointmentSummary = () => {
  return (
    <div className="appointment-summary-container">
      <h2 className="summary-title">Appointment Summary</h2>
      
      <div className="summary-content">
        <div className="summary-row">
          <span className="summary-label">Service:</span>
          <span className="summary-value">Full Grooming Package</span>
        </div>
        
        <div className="summary-row">
          <span className="summary-label">Pet:</span>
          <span className="summary-value">Lily (dog)</span>
        </div>
        
        <div className="summary-row">
          <span className="summary-label">Date:</span>
          <span className="summary-value">Thursday, April 17, 2025</span>
        </div>
        
        <div className="summary-row">
          <span className="summary-label">Time:</span>
          <span className="summary-value">10:00 AM</span>
        </div>
        
        <div className="summary-row">
          <span className="summary-label">Price:</span>
          <span className="summary-value price">$45-60</span>
        </div>
      </div>
      
      <style jsx>{`
        .appointment-summary-container {
          background-color: #FFF4F2;
          border-radius: 15px;
          padding: 25px;
          margin-top: 30px;
          border: 1px solid #e0e0e0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
        }
        
        .appointment-summary-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background: #FFF4F2;
          border-radius: 3px;
        }
        
        .summary-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #333;
          padding-left: 10px;
        }
        
        .summary-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dashed #ffcaca;
        }
        
        .summary-row:last-child {
          border-bottom: none;
        }
        
        .summary-label {
          font-weight: 500;
          color: #555;
        }
        
        .summary-value {
          color: #333;
          font-weight: 600;
        }
        
        .price {
          color: #ff6b6b;
          font-size: 18px;
        }
        
        @media (max-width: 768px) {
          .appointment-summary-container {
            padding: 20px 15px;
          }
          
          .summary-title {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default AppointmentSummary;