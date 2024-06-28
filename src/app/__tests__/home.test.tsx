import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../page'; // Adjust the import path according to your file structure
import { getUsers } from '@/services/users/getUsers';
import {  NormUser } from '@/ui/users-list';

jest.mock('@/services/users/getUsers');
jest.mock('@/ui/search', () => () => <div>Search Component</div>);
jest.mock('@/ui/users-list', () => ({
    UsersList: ({ users }: { users: NormUser[] }) => (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    {user.fullName} - {user.gender} - {user.birthDate} - {user.email} - {user.role}
                </div>
            ))}
        </div>
    )
}));

describe('Home Component', () => {
    const mockUsers: NormUser[] = [
        {
            id: '1',
            fullName: 'John Doe',
            gender: 'Male',
            birthDate: '1990-01-01',
            email: 'john.doe@example.com',
            role: 'Admin'
        },
        {
            id: '2',
            fullName: 'Jane Smith',
            gender: 'Female',
            birthDate: '1985-05-15',
            email: 'jane.smith@example.com',
            role: 'Moderator'
        }
    ];

    beforeEach(() => {
        (getUsers as jest.Mock).mockResolvedValue(mockUsers);
    });

    test('renders the Home component correctly with users data', async () => {
        render(<Home searchParams={{ searchkeyword: '' }} />);

        // Await for the mockUsers to be rendered
        expect(await screen.findByText('John Doe - Male - 1990-01-01 - john.doe@example.com - Admin')).toBeInTheDocument();
        expect(await screen.findByText('Jane Smith - Female - 1985-05-15 - jane.smith@example.com - Moderator')).toBeInTheDocument();

        expect(screen.getByText('My Users')).toBeInTheDocument();
        expect(screen.getByText('Manage your users here')).toBeInTheDocument();
        expect(screen.getByText('Search Component')).toBeInTheDocument();
    });

    test('filters users based on search keyword', async () => {
        (getUsers as jest.Mock).mockImplementation((keyword) => {
            if (keyword === 'john') {
                return mockUsers.filter(user => user.fullName.toLowerCase().includes(keyword));
            }
            return mockUsers;
        });

        render(<Home searchParams={{ searchkeyword: 'john' }} />);

        expect(await screen.findByText('John Doe - Male - 1990-01-01 - john.doe@example.com - Admin')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith - Female - 1985-05-15 - jane.smith@example.com - Moderator')).not.toBeInTheDocument();
    });

    test('handles empty users data', async () => {
        (getUsers as jest.Mock).mockResolvedValue([]);

        render(<Home searchParams={{ searchkeyword: '' }} />);

        expect(await screen.findByText('Search Component')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    test('handles fetch error gracefully', async () => {
        (getUsers as jest.Mock).mockRejectedValue(new Error('Fetch error'));

        render(<Home searchParams={{ searchkeyword: '' }} />);

        // Ensure component still renders correctly even if getUsers fails
        expect(await screen.findByText('My Users')).toBeInTheDocument();
        expect(screen.getByText('Manage your users here')).toBeInTheDocument();
        expect(screen.getByText('Search Component')).toBeInTheDocument();
    });
});
