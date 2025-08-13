import type { User } from '../App';

const baseURL =
  'https://crud-backend-nestjs-production-3676.up.railway.app/users';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${baseURL}`);
  return response.json();
};

export const addUser = async (user: Partial<User>): Promise<User> => {
  const response = await fetch(`${baseURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const fetchUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${baseURL}/${id}`);
  return response.json();
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await fetch(`${baseURL}/${user.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  console.log('Deleting user with ID:', id);
  await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
};
