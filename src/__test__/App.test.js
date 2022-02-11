import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe("Input box", () => {
  test('Attempts to find the input box for adding/editing entries to the list.', () => {
    render(<App/>);
    const linkElement = screen.getAllByPlaceholderText("Task name")[0];
    expect(linkElement).toBeInTheDocument();
  });
});


describe("Submit button", () => {
  test("Submit button is in the document.", () => {
    render(<App/>);
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  test("Submit button adds a task to the list", () => {
    render(<App/>);
    const taskInput = screen.getAllByPlaceholderText("Task name")[0];
    const button = screen.getByText("+");

    fireEvent.change(taskInput, {target: {value: 'I have created a task'}})
    fireEvent.click(button);

    const archiveButtons = screen.getAllByText("Archive");
    expect(archiveButtons.length).toBe(1);
  });

  test("Submitting 3 tasks and archiving one task should result in 2 tasks remaining.", () => {
    render(<App/>);
    const taskInput = screen.getAllByPlaceholderText("Task name")[0];
    const button = screen.getByText("+");

    fireEvent.change(taskInput, {target: {value: 'Test 1'}})
    fireEvent.click(button);

    fireEvent.change(taskInput, {target: {value: 'Test 2'}})
    fireEvent.click(button);

    fireEvent.change(taskInput, {target: {value: 'Test 3'}})
    fireEvent.click(button);

    let archiveButtons = screen.getAllByText("Archive");
    fireEvent.click(archiveButtons[1]);

    archiveButtons = screen.getAllByText("Archive");
    console.log(archiveButtons);
    expect(archiveButtons.length).toBe(2);
  });

})