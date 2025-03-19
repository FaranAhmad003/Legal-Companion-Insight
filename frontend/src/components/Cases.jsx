import React from 'react';
import "../styles/Cases.css"; // Import the separate CSS file
import TopBar from "./TopBar";

const citations = [
  {
    title: "EHTSHAM ALI VS PROVINCE OF PUNJAB ETC",
    date: "29/10/2024",
    summary: "Case Summary: The petitioner was working as Constable when he applied for the post of Sub-Inspector and was recommended by the Punjab Public Service Commission and appointment order dated 03.08.2023 was issued which was later on withdrawn through impugned order dated 30.04.2024...",
    judge: "Judge: Justice Anwaar Hussain",
    jurisdiction: "Lahore High Court",
    caseNo: "WP No. 1802/24",
    citation: "2024 LHC 5025",
    pdfLink: "https://www.paklegaldatabase.com/wp-content/uploads/LahoreHighCourt/2024LHC5025.pdf",
    categories: ["249 CrPC", "392 PPC", "Appointment", "Constitutional Law", "Criminal Law", "FIR", "Service Law"]
  },
  {
    title: "Commissioner Inland Revenue Vs MS Sarwaq Traders and another",
    date: "06-11-2024",
    summary: "Case Summary: This case concerns the interpretation of the first and second provisos of section 45B(2) of the Sales Tax Act, 1990, regarding the time limit for the Commissioner (Appeals) to decide appeals...",
    judge: "Judge: Justice Syed Mansoor Ali Shah",
    jurisdiction: "Supreme Court",
    caseNo: "C.R.P.275/2022",
    citation: "2024 SCP 377",
    pdfLink: "https://www.paklegaldatabase.com/wp-content/uploads/supremecourt/c.r.p._275_2022.pdf",
    categories: ["Sales Tax", "Tax"]
  },
  {
    title: "Kaniz Haider & 1 other Vs Khaliq Dad etc",
    date: "06-11-2024",
    summary: "Case Summary: Writ jurisdiction under Article 199 of Constitution of Islamic Republic of Pakistan, 1973--Para 66 of Muhammaden Law--- Principle of Return (Radd)...",
    judge: "Judge: Justice Ch. Muhammad Iqbal",
    jurisdiction: "Lahore High Court",
    caseNo: "W.P.No.80553/2023",
    citation: "2024 LHC 5013",
    pdfLink: "https://www.paklegaldatabase.com/wp-content/uploads/LahoreHighCourt/2024LHC5013.pdf",
    categories: ["Civil Law", "Constitutional Law", "Inheritance", "Land/Property Law", "Validity of Mutation"]
  }
];

function Cases() {
  return (
    <>
    <TopBar />
    <div className="cases-container">
      <div className="cases-content">
        <h1 className="cases-title">Legal Citations</h1>
        <div className="cases-grid">
          {citations.map((citation, index) => (
            <div key={index} className="case-card">
              <div className="case-card-body">
                <h2 className="case-title">{citation.title}</h2>
                <div className="case-summary">{citation.summary}</div>
                <div className="case-details">
                  <div>
                    <span className="case-label">Date:</span>
                    <p>{citation.date}</p>
                  </div>
                  <div>
                    <span className="case-label">Judge:</span>
                    <p>{citation.judge}</p>
                  </div>
                  <div>
                    <span className="case-label">Jurisdiction:</span>
                    <p>{citation.jurisdiction}</p>
                  </div>
                  <div>
                    <span className="case-label">Case No:</span>
                    <p>{citation.caseNo}</p>
                  </div>
                </div>
                <div className="case-categories">
                  {citation.categories.map((category, idx) => (
                    <span key={idx} className="case-category">{category}</span>
                  ))}
                </div>
                <div className="case-footer">
                  <a href={citation.pdfLink} target="_blank" rel="noopener noreferrer" className="case-link">
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Cases;
