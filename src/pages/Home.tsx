import React from "react";
import { useAuth } from "../hooks/auth-context";

const Home = () => {
  const { user } = useAuth();

  return <div>You are logged in and your email address is {user?.email}</div>;
};

export default Home;