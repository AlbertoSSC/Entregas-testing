import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup } from 'common/models';

describe('useConfirmationDialog', () => {
  it('should initialize with isOpen as false and itemToDelete as an empty lookup', () => {
    //Arrange

    //Act
    const { result } = renderHook(useConfirmationDialog);

    //Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should set isOpen to true and update itemToDelete when onOpenDialog is called', () => {
    //Arrange
    const newItem = {
      id: '1',
      name: 'New Item updated',
    };

    //Act
    const { result } = renderHook(useConfirmationDialog);

    act(() => {
      result.current.onOpenDialog(newItem);
    });

    //Assert

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(newItem);
  });

  it('should set isOpen to false and reset itemToDelete when onClose is called', () => {
    //Arrange
    const newItem = {
      id: '1',
      name: 'New Item updated',
    };

    //Act
    const { result } = renderHook(useConfirmationDialog);

    act(() => {
      result.current.onOpenDialog(newItem);
    });

    //Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(newItem);

    //Act
    act(() => {
      result.current.onClose();
    });

    //Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should reset itemToDelete when onAccept is called', () => {
    //Arrange
    const newItem = {
      id: '1',
      name: 'New Item updated',
    };

    //Act
    const { result } = renderHook(useConfirmationDialog);

    act(() => {
      result.current.onOpenDialog(newItem);
    });

    //Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(newItem);

    //Act
    act(() => {
      result.current.onAccept();
    });

    //Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
