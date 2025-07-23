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

export const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const UserName = styled.div`
  margin-right: 1rem;
  font-weight: 500;
  color: #333;
  @media (max-width: 550px) {
    display: none;
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
  flex-direction: column;
  align-items: center;

  h1 {
    color: #333;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
`;

export const Heading = styled.h1`
  padding: 15px 0;
`;

// New wrapper for table scrolling
export const TableWrapper = styled.div`
  width: 100%;
  max-width: 80%;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  @media (max-width: 768px) {
    max-width: 95%;
  }
`;

export const Table = styled.table`
  width: 100%;
  min-width: 600px; /* Ensures table doesn't shrink too much */
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  background: white;
`;

export const Thead = styled.thead`
  background-color: #4caf50;
  color: white;
`;

export const Th = styled.th`
  width: 25%;
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  white-space: nowrap; /* Prevents header text from wrapping */
`;

export const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  white-space: nowrap; /* Prevents cell content from wrapping */

  /* Allow text wrapping for certain columns if needed */
  &:nth-child(1), /* Name column */
  &:nth-child(2) {
    /* Email column */
    white-space: normal;
    word-break: break-word;
    min-width: 150px;
  }
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  min-width: 80px; /* Ensures action column has minimum width */
`;

export const ActionButton = styled.button<{ type: 'edit' | 'delete' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => (props.type === 'edit' ? '#3498db' : '#e74c3c')};
  color: white;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background-color: ${props =>
      props.type === 'edit' ? '#2980b9' : '#c0392b'};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }
`;
