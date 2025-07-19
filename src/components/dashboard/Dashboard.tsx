import React, { useEffect, useState } from "react";
import {
  DashboardContainer,
  HeaderBar,
  Logo,
  LogoutButton,
  MainContent,
} from "./styles";
import { useAuth } from "../../context/auth/useAuth";
import { fetchUserDetails } from "../../utils/networkCalls";

const Dashboard: React.FC = () => {
  const { accessToken } = useAuth();
  const [userContactList, setUserContactList] = useState([]);

  const getUserDetails = async () => {
    const contactList = await fetchUserDetails(accessToken);
    if (contactList?.length) {
      setUserContactList(contactList);
    }
  };

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Handle logout logic here
    // e.g., clear tokens, redirect to login, etc.
  };

  return (
    <DashboardContainer>
      <HeaderBar>
        <Logo>MyApp</Logo>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </HeaderBar>
      <MainContent>
        {userContactList?.map((item: { mobileNumber: string }) => {
          return <h1>{item.mobileNumber}</h1>;
        })}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
