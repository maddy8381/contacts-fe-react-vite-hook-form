import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  ActionButton,
  ActionContainer,
  DashboardContainer,
  HeaderBar,
  Heading,
  Logo,
  LogoutButton,
  MainContent,
  Table,
  TableWrapper,
  Td,
  Th,
  Thead,
  Tr,
  UserName,
  UserNameContainer
} from './styles';
import { useAuth } from '../../context/auth/useAuth';
import {
  deleteContact,
  fetchContactList,
  fetchUserDetails
} from '../../utils/networkCalls';
import { ROUTES } from '../../constants';
import AddContact from '../contacts/AddContact';
import type { IContact, IUser } from '../../utils/interfaces';

const Dashboard: React.FC = () => {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [userContactList, setUserContactList] = useState<IContact[]>([]);
  const [editingContact, setEditingContact] = useState<IContact | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<IUser>();

  const getContactList = async () => {
    try {
      const contactList = await fetchContactList(accessToken);
      if (contactList?.length) {
        setUserContactList(contactList);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error?.response?.data?.message
          : 'Error fetching contact list',
        {
          duration: 4000,
          position: 'bottom-right'
        }
      );
    }
  };

  const getUserDetails = async () => {
    try {
      const user = await fetchUserDetails(accessToken);
      if (user) {
        setUserDetails(user);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error?.response?.data?.message
          : 'Error fetching user details',
        {
          duration: 4000,
          position: 'bottom-right'
        }
      );
    }
  };

  useEffect(() => {
    getUserDetails();
    getContactList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    setAccessToken(null);
    navigate(ROUTES.LOGIN);
    toast.success('Logout successfully!', {
      duration: 2000,
      position: 'bottom-right'
    });
  };

  const handleEdit = (contact: IContact) => {
    setEditingContact(contact);
    setIsEditModalOpen(true);
  };

  const handleContactUpdated = () => {
    getContactList(); // Refresh the contact list
    setEditingContact(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = async (contact: IContact, index: number) => {
    try {
      const response = await deleteContact(accessToken, contact._id);
      if (response) {
        const updatedList = userContactList.filter((_, i) => i !== index);
        setUserContactList(updatedList);

        toast.success('Contact deleted successfully!', {
          duration: 2000,
          position: 'bottom-right'
        });
      }
    } catch (err) {
      toast.error(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : 'Error in deleting contact',
        {
          duration: 4000,
          position: 'bottom-right'
        }
      );
    }
  };

  return (
    <DashboardContainer>
      <HeaderBar>
        <Logo>MyApp</Logo>
        <UserNameContainer>
          <UserName>{userDetails?.fullName}</UserName>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserNameContainer>
      </HeaderBar>
      <MainContent>
        {userContactList?.length > 0 && <Heading>My Contact List</Heading>}
        {userContactList?.length === 0 && <Heading>No contacts found</Heading>}

        {/* Add Contact Component */}
        <AddContact onContactUpdated={getContactList} />

        {/* Edit Contact Modal */}
        {editingContact && (
          <AddContact
            isEditMode={true}
            contactToEdit={editingContact}
            onContactUpdated={handleContactUpdated}
            onOpenEdit={setIsEditModalOpen}
            isEditModalOpen={isEditModalOpen}
          />
        )}
        {userContactList?.length > 0 && (
          <TableWrapper>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Mobile Number</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <tbody>
                {userContactList.map((contact: IContact, index) => (
                  <Tr key={contact._id || index}>
                    <Td>{contact.name}</Td>
                    <Td>{contact.email}</Td>
                    <Td>{contact.mobileNumber}</Td>
                    <Td>
                      <ActionContainer>
                        <ActionButton
                          onClick={() => handleEdit(contact)}
                          type="edit"
                          title="Edit Contact"
                        >
                          <Edit size={16} />
                        </ActionButton>
                        <ActionButton
                          onClick={() => handleDelete(contact, index)}
                          type="delete"
                          title="Delete Contact"
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </ActionContainer>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
