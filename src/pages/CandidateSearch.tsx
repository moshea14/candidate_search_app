import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithub, searchGithubUser } from "../api/API";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState<Candidate | null>(null);
  const [start, setStart] = useState(true);
  const { onSaveCandidate } = useOutletContext<{ onSaveCandidate: (candidate: Candidate) => void }>();

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (candidates[currentCandidateIndex]) {
      fetchCandidateDetails(candidates[currentCandidateIndex].login);
    } else if (currentCandidateIndex >= candidates.length) {
      
      setStart(false);
    }
  }, [currentCandidateIndex, candidates]);

  const fetchCandidates = async () => {
    const data = await searchGithub();
    setCandidates(data);
    setCurrentCandidateIndex(0);
    setStart(true);
  };

  const fetchCandidateDetails = async (username: string) => {
    const data = await searchGithubUser(username);
    setCurrentCandidateDetails(data);
  };

  const handleAccept = () => {
    if (currentCandidateDetails) {
      onSaveCandidate(currentCandidateDetails);
      setCurrentCandidateIndex(currentCandidateIndex + 1);
      if (currentCandidateIndex + 1 >= candidates.length) {
        setStart(false);
      }
    }
  };

  const handleReject = () => {
    setCurrentCandidateIndex(currentCandidateIndex + 1);
    if (currentCandidateIndex + 1 >= candidates.length) {
      setStart(false);
    }
  };

  return (
    <>
      <h1>Candidate Search</h1>
      {currentCandidateDetails && start ? (
        <div className="card-div-one">
          <div className="card-div-two">
            <img className="avatar" src={currentCandidateDetails.avatar_url} alt={currentCandidateDetails.login} />
            <h2 className="card-text">{currentCandidateDetails.login} ({currentCandidateDetails.name})</h2>
            <p className="card-text">Location: {currentCandidateDetails.location}</p>
            <p className="card-text">Email: <a href={`mailto:${currentCandidateDetails.email}`}>{currentCandidateDetails.email}</a></p>
            <p className="card-text company">Company: {currentCandidateDetails.company}</p>
            <p className="card-text bio">Bio: {currentCandidateDetails.bio}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="save-profile" onClick={handleAccept}>&#43;</button>
            <button className="remove-profile" onClick={handleReject}>&#45;</button>
          </div>
        </div>
      ) : start ? (
        <p>Loading candidates...</p>
      ) : (
        <p>No more candidates are available</p>
      )}
    </>

  );
};

export default CandidateSearch;