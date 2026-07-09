import { describe, expect, it, vi } from "vitest";
import { ProjectsContext } from '../context/projectContext';
import MyForm from './MyForm';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("myForm integration testing", () => {

  it("returns all  the field in the form", () => {

    const mockDispacth = vi.fn();

    render(
      <ProjectsContext.Provider value={{ state: { projects: [] }, dispatch: mockDispacth }}>
        <MyForm />
      </ProjectsContext.Provider>
    );

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Summary")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Domain")).toBeInTheDocument();
  })

  it('type into the name field', async () => {
    const mockDispacth = vi.fn();
    const user = userEvent.setup();
    render(
      <ProjectsContext.Provider value={{ state: { projects: [] }, dispatch: mockDispacth }}>
        <MyForm />
      </ProjectsContext.Provider>
    )

    const nameInput = screen.getByPlaceholderText("Name");
    await user.type(nameInput, "hello world");

    const domainInput = screen.getByPlaceholderText("Domain");
    await user.type(domainInput, "example.com");
    
    const summaryInput = screen.getByPlaceholderText("Summary");
    await user.type(summaryInput, "This is summary");

    const techStackInput = screen.getByPlaceholderText("e.g. React");
    await user.type(techStackInput, "React");

    const featureTitleInput = screen.getByPlaceholderText("Feature Title");
    await user.type(featureTitleInput, "Login");

    const taskInput = screen.getByPlaceholderText("Enter task");
    await user.type(taskInput, "Build form");

    const submitButton = screen.getByRole("button", { name: "Create Project" });
    await user.click(submitButton);
    
    console.log("mockDispacth", mockDispacth.mock.calls);
    
    expect(mockDispacth).toHaveBeenCalledWith({
      type: "ADD_PROJECT",
      payload: {
        id: expect.any(String),
        name: expect.any(String),
        summary: expect.any(String),
        domain: expect.any(String),
        completion: expect.any(Number),
        techStack: ["React"],
        features: expect.any(Array),
      }
    })

  });
});