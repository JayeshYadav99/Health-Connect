import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Github() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setGitHubUsername] = useState();
  const [repoData, setRepoData] = useState([]);

  async function fetchRepoData() {
    try {
      const response = await fetch("https://api.github.com/users/Flawlessintrovert/repos");
      const data = await response.json();
      setRepoData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetch("https://api.github.com/users/Flawlessintrovert")
      .then((res) => res.json())
      .then(
        (result) => {
          setAvatarURL(result.avatar_url);
          setGitHubUsername(result.login);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    fetchRepoData();
  }, []);

  return (
    <div className="w-100 min-vh-100 justify-content-center align-items-center flex flex-col space-y-4 p-8">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={avatarURL} />
        <Card.Body>
          <Card.Title>{githubUsername}</Card.Title>
          <Button variant="primary" onClick={fetchRepoData}>
            List my public repos!
          </Button>
        </Card.Body>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {repoData.map((repo) => (
          <Card key={repo.id}>
            <Card.Body>
              <Card.Title>{repo.name}</Card.Title>
              <Card.Text>{repo.description}</Card.Text>
              <Button variant="primary" href={repo.html_url} target="_blank">
                View Repository
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Github;
