/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Search from "../search";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));
describe("Base Button Test", () => {
    let pushMock: unknown;

    beforeEach(() => {
        pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock })
            (usePathname as jest.Mock).mockReturnValue('/search');
        (useSearchParams as jest.Mock).mockReturnValue({
            toString: jest.fn(() => 'searchkeyword=initial'),
        });
    });

    it("renders correctly", () => {
        render(<Search />);
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

    });
    test('updates keyword state on input change', () => {
        render(<Search />);
        const input = screen.getByPlaceholderText('Search') as HTMLInputElement
        fireEvent.change(input, { target: { value: 'test' } });
        expect(input?.value).toBe('test');
    });

    test('calls push with correct URL when search button is clicked', () => {
        render(<Search />);
        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.click(screen.getByText('Search'));

        expect(pushMock).toHaveBeenCalledWith('/search?searchkeyword=test');
    });

    test('updates URL when keyword is empty', () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            toString: jest.fn(() => 'searchkeyword=test'),
        });
        render(<Search />);
        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: '' } });

        expect(pushMock).toHaveBeenCalledWith('/search?');
    });
    test('handles URL search parameters correctly', () => {
        (useSearchParams as jest.Mock).mockReturnValue({
            toString: jest.fn(() => 'param1=value1'),
        });
        render(<Search />);
        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'new' } });
        fireEvent.click(screen.getByText('Search'));

        expect(pushMock).toHaveBeenCalledWith('/search?param1=value1&searchkeyword=new');
    });
});