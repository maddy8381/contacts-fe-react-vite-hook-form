import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Mail, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import {
  AddContactForm,
  CloseButton,
  ErrorMessage,
  FormContainer,
  Input,
  InputContainer,
  InputGroup,
  InputIcon,
  Label,
  ModalContent,
  ModalOverlay,
  OpenButton,
  SubmitButton,
  Title
} from './style';
import { addContact, updateContact } from '../../utils/networkCalls';
import { useAuth } from '../../context/auth/useAuth';
import type { ContactFormData } from '../../utils/interfaces';

interface IContact {
  name: string;
  email: string;
  mobileNumber: string;
  _id: string;
}

interface AddContactProps {
  isEditMode?: boolean;
  contactToEdit?: IContact | null;
  onContactUpdated?: () => void;
  onOpenEdit?: (isOpen: boolean) => void;
  isEditModalOpen?: boolean;
}

const AddContact: React.FC<AddContactProps> = ({
  isEditMode = false,
  contactToEdit = null,
  onContactUpdated,
  onOpenEdit,
  isEditModalOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accessToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ContactFormData>({
    mode: 'onBlur'
  });

  useEffect(() => {
    if (isEditMode && isEditModalOpen) {
      setIsOpen(true);
      if (contactToEdit) {
        setValue('name', contactToEdit.name);
        setValue('email', contactToEdit.email);
        setValue('mobileNumber', contactToEdit.mobileNumber);
      }
    }
  }, [isEditMode, isEditModalOpen, contactToEdit, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      if (isEditMode && contactToEdit) {
        // Update existing contact
        const response = await updateContact(
          accessToken,
          contactToEdit._id,
          data
        );
        if (response?.success) {
          toast.success('Contact updated successfully!', {
            duration: 2000,
            position: 'bottom-right'
          });
          onContactUpdated?.(); // Refresh the contact list
        }
      } else {
        // Add new contact
        const response = await addContact(accessToken, data);
        if (response?.success) {
          toast.success('Contact added successfully!', {
            duration: 2000,
            position: 'bottom-right'
          });
          onContactUpdated?.(); // Refresh the contact list
        }
      }

      handleClose();
    } catch (err) {
      toast.error(
        err instanceof AxiosError
          ? err?.response?.data?.message ||
              'Error in adding or updating contact'
          : 'Error in adding or updating contact',
        {
          duration: 4000,
          position: 'bottom-right'
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
    if (isEditMode && onOpenEdit) {
      onOpenEdit(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    if (!isEditMode) {
      reset();
    }
  };

  return (
    <AddContactForm>
      {!isEditMode && (
        <OpenButton onClick={handleOpenModal}>Add contact</OpenButton>
      )}

      {isOpen && (
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContent>
            <CloseButton onClick={handleClose} type="button">
              <X size={24} />
            </CloseButton>

            <Title>{isEditMode ? 'Edit contact' : 'Add contact'}</Title>

            <FormContainer>
              <InputGroup>
                <Label htmlFor="name">Full Name</Label>
                <InputContainer>
                  <InputIcon>
                    <User size={20} />
                  </InputIcon>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter contact name"
                    hasError={!!errors.name}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                  />
                </InputContainer>
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">Email Address</Label>
                <InputContainer>
                  <InputIcon>
                    <Mail size={20} />
                  </InputIcon>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    hasError={!!errors.email}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </InputContainer>
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <InputContainer>
                  <InputIcon>
                    <Phone size={20} />
                  </InputIcon>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    placeholder="Enter mobile number"
                    hasError={!!errors.mobileNumber}
                    {...register('mobileNumber', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[+]?[\d\s\-()]+$/,
                        message: 'Invalid mobile number format'
                      },
                      minLength: {
                        value: 10,
                        message: 'Mobile number must be at least 10 digits'
                      }
                    })}
                  />
                </InputContainer>
                {errors.mobileNumber && (
                  <ErrorMessage>{errors.mobileNumber.message}</ErrorMessage>
                )}
              </InputGroup>

              <SubmitButton
                type="button"
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting
                  ? isEditMode
                    ? 'Updating contact...'
                    : 'Adding contact...'
                  : isEditMode
                    ? 'Update contact'
                    : 'Add contact'}
              </SubmitButton>
            </FormContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </AddContactForm>
  );
};

export default AddContact;
