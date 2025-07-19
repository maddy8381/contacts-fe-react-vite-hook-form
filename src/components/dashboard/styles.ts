import styled from 'styled-components';

export const DashboardContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

export const HeaderBar = styled.header`
  width: 100%;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
  cursor: pointer;
  
  &:hover {
    color: #2980b9;
  }
`;

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  h1 {
    color: #333;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
`;