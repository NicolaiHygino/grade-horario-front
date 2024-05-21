import styled from "styled-components";

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  width: 100%;
  margin: 15px 0;
`;

export const Button = styled.button`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 1.5rem;
  padding: calc(0.7rem - 1px) calc(1.1rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

  &:hover,
  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }
  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    background-color: #f0f0f1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
`;
