import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';

function renderPage(element) {
  render(
      <BrowserRouter>
        { element }
      </BrowserRouter>
  );
}

describe("Tests if the pages are rendering", ()=> {

  it("Should render login page", () => {
    renderPage(<Login />);
    const loginPage = screen.getByTestId("test-login");
    expect(loginPage).toBeInTheDocument();
  })

  it("Should render main page", () => {
    renderPage(<Main />);
    const mainPage = screen.getByTestId("test-main");
    expect(mainPage).toBeInTheDocument(); 
  })
})
