import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (
      (authentication && authStatus !== authentication) ||
      (!authentication && authStatus === authentication)
    ) {
      navigate(authentication ? "/login" : "/");
    } else {
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
    </div>
  ) : (
    { children }
  );
}

// Define prop types
Protected.propTypes = {
  children: PropTypes.node.isRequired,
  authentication: PropTypes.bool,
};
