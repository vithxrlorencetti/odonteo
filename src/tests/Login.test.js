import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';

function renderPage(element) {
    render(
        <BrowserRouter>
            { element }
        </BrowserRouter>
    );
}

describe("Tests the login page", () => {

    it("Verify if email exists", ()=> {
        renderPage(<Login />)
        const emailInput = screen.getByTestId("test-email")
        expect(emailInput).toBeInTheDocument();
    })

    it("Verify if password exists", ()=> {
        renderPage(<Login />)
        const passwordInput = screen.getByTestId("test-password")
        expect(passwordInput).toBeInTheDocument();
    })

    it("Should render email error message on screen", ()=> {
        renderPage(<Login />)

        const emailInput = screen.getByTestId("test-email")
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByTestId("test-password")
        expect(passwordInput).toBeInTheDocument();

        const loginButton = screen.getByTestId("test-loginButton")
        expect(loginButton).toBeInTheDocument()

        fireEvent.change(emailInput, {
            target: {
                value: "vithorlorencetti"
            }
        })
        expect(emailInput).toHaveValue("vithorlorencetti")

        fireEvent.change(passwordInput, {
            target: {
                value: "Safzon#$98ff6"
            }
        })
        expect(passwordInput).toHaveValue("Safzon#$98ff6")

        fireEvent.click(loginButton)
        const errorMessage = screen.getByText("Email ou senha em formato incorreto.")
        expect(errorMessage).toBeInTheDocument()
    })

    it("Should render password error message on screen", ()=> {
        renderPage(<Login />)

        const emailInput = screen.getByTestId("test-email")
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByTestId("test-password")
        expect(passwordInput).toBeInTheDocument();

        const loginButton = screen.getByTestId("test-loginButton")
        expect(loginButton).toBeInTheDocument()

        fireEvent.change(emailInput, {
            target: {
                value: "vithorlorencetti@gmail.com"
            }
        })
        expect(emailInput).toHaveValue("vithorlorencetti@gmail.com")

        fireEvent.change(passwordInput, {
            target: {
                value: "098765"
            }
        })
        expect(passwordInput).toHaveValue("098765")

        fireEvent.click(loginButton)
        const errorMessage = screen.getByText("Email ou senha em formato incorreto.")
        expect(errorMessage).toBeInTheDocument()
    })
})

describe("Verify if can login", () => {

    it("Should login", async () => {

        global.fetch(jest.fn(
            async () => ({
                json: async () => Promise.resolve({ user: null, message: {show: false, text: 'Login efetuado com sucesso!', status: '' }, token: null })
            })
        ));
        renderPage(<Login />)

        const emailInput = screen.getByTestId("test-email")
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByTestId("test-password")
        expect(passwordInput).toBeInTheDocument();

        const loginButton = screen.getByTestId("test-loginButton")
        expect(loginButton).toBeInTheDocument()

        fireEvent.change(emailInput, {
            target: {
                value: "vithorlorencetti@gmail.com"
            }
        })
        fireEvent.change(passwordInput, {
            target: {
                value: "Safzon#$98ff6"
            }
        })
        fireEvent.click(loginButton)
        expect(window.location.pathname).toBe("/")
    })
})