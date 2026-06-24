import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { IconLogo } from '@components/icons';
import { loaderDelay } from '@utils';

const drawHexagon = keyframes`
  from {
    stroke-dashoffset: 270;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const revealLetter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.75);
    transform-origin: center;
  }
  to {
    opacity: 1;
    transform: scale(1);
    transform-origin: center;
  }
`;

const fadeLoader = keyframes`
  0%, 75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  inset: 0;
  z-index: 99;
  background-color: var(--dark-navy);
  animation: ${fadeLoader} ${loaderDelay}ms ease forwards;

  svg {
    width: 100px;
    height: 115px;
    color: var(--green);
    fill: none;
  }

  #Shape {
    stroke-dasharray: 270;
    stroke-dashoffset: 270;
    animation: ${drawHexagon} 1.2s ease-in-out forwards;
  }

  path {
    opacity: 0;
    animation: ${revealLetter} 0.5s ease 0.9s forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 0.01ms;

    #Shape,
    path {
      animation: none;
      opacity: 1;
      stroke-dashoffset: 0;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  useEffect(() => {
    document.body.classList.add('hidden');
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const timeout = window.setTimeout(
      finishLoading,
      prefersReducedMotion ? 50 : loaderDelay,
    );

    return () => {
      document.body.classList.remove('hidden');
      window.clearTimeout(timeout);
    };
  }, [finishLoading]);

  return (
    <StyledLoader aria-label="Loading">
      <IconLogo />
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
