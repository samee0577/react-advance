import { describe, it, expect, vi } from "vitest"
import { Counter } from "./Counter"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("Counter", () => {

    it("should render counter with initial count 0", () => {
        render(<Counter />)
        expect(screen.getByText("count: 0")).toBeInTheDocument();
    });

    it("should increment count when button is clicked", async () => {
        const user = userEvent.setup()
        render(<Counter />)

        const Increment = screen.getByRole("button", { name: "Increment" });
        await user.click(Increment);

        expect(screen.getByText("count: 3")).toBeInTheDocument();
    })

    it("renders the component with the function passed as prop", async () => {
        const onIncrementMock = vi.fn();
        const user = userEvent.setup()

        render(<Counter onIncrement={onIncrementMock} />)
        await user.click(screen.getByRole("button", { name: "Increment" }))
        
        expect(onIncrementMock).toHaveBeenCalledWith(3)
    })

});