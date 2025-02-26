import React from "react";

const IndexPage = (props) => {
  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (!token) {
      props.history.push("/login");
    } else {
      props.history.push("/register");
    }
  }, [0]);
  return <div></div>;
};

export default IndexPage;
