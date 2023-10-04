import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const defaultProps = {
  isOpen: true,
  onAccept: jest.fn(),
  onClose: jest.fn(),
  title: 'Confirmation Dialog',
  labels: {
    closeButton: 'Close',
    acceptButton: 'Accept',
  },
  children: 'Are you sure you want to proceed?',
};

describe('ConfirmationDialogComponent', () => {
  it('renders with correct title and content', () => {
    //Arrange
    //Act
    render(<ConfirmationDialogComponent {...defaultProps} />);

    const titleElement = screen.getByText('Confirmation Dialog');
    const contentElement = screen.getByText(
      'Are you sure you want to proceed?'
    );

    //Assert
    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  it('calls onAccept and onClose when clicking Accept button', async () => {
    //Arrange
    //Act
    render(<ConfirmationDialogComponent {...defaultProps} />);
    const acceptButton = screen.getByRole('button', { name: 'Accept' });

    await userEvent.click(acceptButton);

    //Assert
    expect(defaultProps.onAccept).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking Close button', async () => {
    //Arrange
    //Act
    render(<ConfirmationDialogComponent {...defaultProps} />);
    const closeButton = screen.getByRole('button', { name: 'Close' });

    await userEvent.click(closeButton);

    //Assert
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
