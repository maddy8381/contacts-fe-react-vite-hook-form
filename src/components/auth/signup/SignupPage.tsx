import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { newSignUpRequest } from '../../../utils/networkCalls';
import { useAuth } from '../../../context/auth/useAuth';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
}

const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();
  const { setAccessToken } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await newSignUpRequest(data);
      if (response) {
        const accessToken = response.accessToken;
        setAccessToken(accessToken);
        toast.success('Signup successful!', {
          duration: 2000,
          position: 'bottom-right'
        });
      }
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      toast.error(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : 'Something went wrong',
        {
          duration: 4000,
          position: 'bottom-right'
        }
      );
    }
  };

  const handleSigninClick = () => {
    navigate(ROUTES.LOGIN);
  };
  return (
    <PageContainer>
      <FormContainer>
        <Title>Sign Up</Title>
        <Title>
          Already a user?
          <LinkedText onClick={handleSigninClick}> Signin here</LinkedText>
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldWrapper>
            <StyledField
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Full name must be at least 2 characters'
                }
              })}
              type="text"
              placeholder="Full Name"
              hasError={!!errors.fullName}
            />
            {errors.fullName && (
              <ErrorMessage>{errors.fullName.message}</ErrorMessage>
            )}
          </FieldWrapper>

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
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
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

          <FieldWrapper>
            <StyledField
              {...register('mobileNumber', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: 'Invalid mobile number format'
                }
              })}
              type="tel"
              placeholder="Mobile Number"
              hasError={!!errors.mobileNumber}
            />
            {errors.mobileNumber && (
              <ErrorMessage>{errors.mobileNumber.message}</ErrorMessage>
            )}
          </FieldWrapper>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default SignupPage;
