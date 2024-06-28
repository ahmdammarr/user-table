import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UsersList, NormUser } from '..';

describe('UsersList Component', () => {
  const users: NormUser[] = [
    {
      id: '1',
      fullName: 'John Doe',
      gender: 'Male',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
      role: 'Admin',
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      gender: 'Female',
      birthDate: '1985-05-15',
      email: 'jane.smith@example.com',
      role: 'Moderator',
    },
  ];

  test('renders the component correctly', () => {
    render(<UsersList users={users} />);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Date Of Birth')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('renders user data correctly', () => {
    render(<UsersList users={users} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('1990-01-01')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('1985-05-15')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('Moderator')).toBeInTheDocument();
  });

  test('applies correct styles based on user role', () => {
    render(<UsersList users={users} />);

    const adminRole = screen.getByText('Admin');
    const moderatorRole = screen.getByText('Moderator');

    expect(adminRole).toHaveClass('bg-red-100 text-red-800');
    expect(moderatorRole).toHaveClass('bg-green-100 text-green-800');
  });
});
