import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Message  from "../components/Message/Message";

function renderPage(element) {
    render(
        <BrowserRouter>
            { element }
        </BrowserRouter>
    );
}

describe("Tests message component ", () => {
    it("Should render message component on screen", ()=> {
        renderPage(<Message />)
        const message = screen.getByTestId("test-message")
        expect(message).toBeInTheDocument();
    })
    it("Should span message on screen", ()=> {
        renderPage(<Message>Teste</Message>)
        const message = screen.getByTestId("test-message")
        expect(message).toBeInTheDocument();
        expect(message).toHaveTextContent("Teste")
    })
})