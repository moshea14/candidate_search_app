import { useOutletContext } from 'react-router-dom';
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const { savedCandidates, onRemoveCandidate } = useOutletContext<{ savedCandidates: Candidate[], onRemoveCandidate: (login: string) => void }>();

  return (
    <div className="potential-candidates">
      <h1>Potential Candidates</h1>
      <div>
        {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Github URL</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={`${candidate.login}-${index}`}>
                <td><img src={candidate.avatar_url} alt={candidate.login} width="50" /></td>
                <td>{candidate.login} ({candidate.name})</td>
                <td>{candidate.location}</td>
                <td><a href={`mailto:${candidate.email}`}>{candidate.email}</a></td>
                <td>{candidate.html_url}</td>
                <td>{candidate.company}</td>
                <td>{candidate.bio}</td>
                <td>
                  <button onClick={() => onRemoveCandidate(candidate.login)} className="remove-profile">&#45;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have been accepted</p>
      )}
      </div>
    </div>
  );
};

export default SavedCandidates;