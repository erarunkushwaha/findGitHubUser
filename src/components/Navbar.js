import React from "react";
import styled from "styled-components";
import { FaUserCircle, FaGithubSquare } from "react-icons/fa";

const Navbar = () => {
  return (
    <Wrapper>
      <FaGithubSquare className='icon' />
      <h3>GitHub User Profile Fetcher</h3>
      <FaUserCircle className='icon' />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 2;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  h3 {
    color: var(--clr-grey-5);
    font-weight: 400;
  }

  .icon {
    font-size: 40px;

    border-radius: 5px;
    border-color: transparent;
    padding: 0.25rem 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    background: var(--clr-primary-5);
    color: var(--clr-white);
    transition: var(--transition);
    cursor: pointer;
    &:hover {
      background: var(--clr-primary-8);
      color: var(--clr-primary-1);
    }
  }
`;

export default Navbar;
