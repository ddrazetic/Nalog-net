import React, { useEffect, useState } from "react";
import Homepage from "../../homepage.jpg";
import UserService from "../../services/user.service";

const Home = (props) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      }
    );
  }, []);
  return (
    <div className="card card-containerMax containerHome">
      <div className="imageHome">
        <img src={Homepage} alt="homepage"></img>
      </div>
      <h1 className="textHome">{content}</h1>
    </div>
  );
};

export default Home;
