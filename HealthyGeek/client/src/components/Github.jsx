import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Octokit, App } from "https://cdn.skypack.dev/octokit";
function Github() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setGitHubUsername] = useState();
  const [repoData, setRepoData] = useState([]);
  const [showRepos, setShowRepos] = useState(false);
//autho






async function auth()
{
    var options = {
        method: 'POST',
        url: 'https://dev-fkzyzzay6f6jrars.us.auth0.com/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: 'd9LXHADHfiX1FSRNaJpkegmWAgz1jRtP',
          client_secret: 'h00CNOscN01joR_2EEUg6lkBoiMeRar-vtZQZWhdf90zBXRlonxx0NP--RrqIqyI',
          audience: 'https://dev-fkzyzzay6f6jrars.us.auth0.com',
          
        })
      };
      
      const accessToken= await axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
      
      const octokit = new Octokit({
          auth: accessToken
        })
        console.log(accessToken);
        if(accessToken)
        {
            console.log("hello");
        const User=await octokit.request('GET /user', {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
    }
      
      console.log(User);
}



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
    auth();
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
    if (showRepos) {
      fetchRepoData();
    }
  }, [showRepos]);

  return (
    <div className="w-100 min-vh-100 justify-content-center align-items-center flex flex-col space-y-4 p-8">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={avatarURL} />
        <Card.Body>
          <Card.Title>Welcome, {githubUsername}!</Card.Title>
          <Card.Text>
            Thank you for exploring medical research! Your contributions can make a significant impact in improving healthcare.
          </Card.Text>
          <Button variant="primary" onClick={() => setShowRepos(!showRepos)}>
            {showRepos ? "Hide Repos" : "Show Repos"}
          </Button>
        </Card.Body>
      </Card>

      {showRepos && (
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
      )}
    </div>
  );
}

export default Github;
