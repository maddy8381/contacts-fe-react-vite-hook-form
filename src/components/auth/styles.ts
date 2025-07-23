// styles.ts
import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem;
  background: #f8f9fa;
  box-sizing: border-box;
`;

export const FormContainer = styled.div`
  width: 500px;
  max-width: 500px;
  margin-right: 4rem;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-right: 0;
    width: 100%;
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  text-align: left;
  color: #333;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const LinkedText = styled.span`
  color: blue;
  text-align: left;
  cursor: pointer;
`;

export const StyledField = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => (props.hasError ? '#e74c3c' : '#ddd')};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  background-color: #fff;
  color: black;

  /* Override autofill styles */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
    -webkit-text-fill-color: #333 !important;
    background-color: #ffffff !important;
  }

  &:-webkit-autofill:hover {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
    -webkit-text-fill-color: #333 !important;
  }

  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
    -webkit-text-fill-color: #333 !important;
  }

  /* For other browsers */
  &:autofill {
    background-color: #ffffff !important;
    color: #333 !important;
  }

  &:focus {
    outline: none;
    border-color: ${props => (props.hasError ? '#e74c3c' : '#3498db')};
  }

  &::placeholder {
    color: black;
  }
`;

export const FieldWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;
