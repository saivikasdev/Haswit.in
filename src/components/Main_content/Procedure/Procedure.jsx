import React from "react";
import "./Procedure.css";
export const Procedure = () => {
  return (
    <div className="Procedure">
      <div className="Procedure_title">HASWIT PROCEDURE FOR JOB</div>
      <div className="Procedure_row">
        <div className="Step">
          <div className="Step_no">#1</div>
          <div className="Step_title">🎥View Record</div>
          <div className="Step_desc">
            View live or recorded session and understand the topic.
          </div>
        </div>

        <div className="Step">
          <div className="Step_no">#2</div>
          <div className="Step_title">📜Attempt Tests</div>
          <div className="Step_desc">
            Once you are good at the session write test that will be posted
          </div>
        </div>

        <div className="Step">
          <div className="Step_no">#3</div>
          <div className="Step_title">⭐Earn Skill Stars</div>
          <div className="Step_desc">
            Complete tests upto date and earn skill stars in tests and projects.
          </div>
        </div>
      </div>
      <div className="Procedure_row">
        <div className="Step">
          <div className="Step_no">#4</div>
          <div className="Step_title">🏆Rank Top</div>
          <div className="Step_desc">
            Be top in the ranking page other than all. 
          </div>
        </div>

        <div className="Step">
          <div className="Step_no">#5</div>
          <div className="Step_title">🧑‍💼Get job</div>
          <div className="Step_desc">
            Ranking top on board will give you job opportunities.
          </div>
        </div>

        <div className="Step">
          <div className="Step_no">#6</div>
          <div className="Step_title">📰Earn certificate</div>
          <div className="Step_desc">
            Students who cannot able to get jobs can be given with digital certificate.
          </div>
        </div>
      </div>
    </div>
  );
};
