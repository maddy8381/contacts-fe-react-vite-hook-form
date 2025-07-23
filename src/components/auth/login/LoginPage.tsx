import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import {
  FormContainer,
  Title,
  StyledField,
  ErrorMessage,
  SubmitButton,
  FieldWrapper,
  PageContainer,
  LinkedText
} from '../styles';
import { ROUTES } from '../../../constants';
import { newSignInRequest } from '../../../utils/networkCalls';
import { useAuth } from '../../../context/auth/useAuth';
import type { LoginFormData } from '../../../utils/interfaces';

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await newSignInRequest(data);
      if (response) {
        toast.success('Login successfully!', {
          duration: 2000,
          position: 'bottom-right'
        });
        const accessToken = response.accessToken;
        setAccessToken(accessToken);
        navigate(ROUTES.DASHBOARD);
      }
    } catch (err) {
      toast.error(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : 'Email id or password is incorrect',
        {
          duration: 4000,
          position: 'bottom-right'
        }
      );
    }
  };

  const handleSignupClick = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Sign In</Title>
        <Title>
          New to Contact books?
          <LinkedText onClick={handleSignupClick}> Signup here</LinkedText>
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldWrapper>
            <StyledField
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              placeholder="Email Address"
              hasError={!!errors.email}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FieldWrapper>

          <FieldWrapper>
            <StyledField
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              placeholder="Password"
              hasError={!!errors.password}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FieldWrapper>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginPage;
