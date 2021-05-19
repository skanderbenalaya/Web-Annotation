import styled from "styled-components";
import { Add, Edit, Delete } from "@styled-icons/fluentui-system-filled";

export const AddIcon = styled(Add)`
  background-color: #fff;
  opacity: 60%;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    opacity: 100%;
  }
  &:active {
    -ms-transform: translateY(2px);
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }
  &:disabled,
  &[disabled] {
    opacity: 20%;
    color: #666666;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
export const EditIcon = styled(Edit)`
  background-color: #fff;
  opacity: 60%;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    opacity: 100%;
  }
  &:active {
    -ms-transform: translateY(2px);
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }
  &:disabled,
  &[disabled] {
    opacity: 20%;
    color: #666666;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
export const DeleteIcon = styled(Delete)`
  background-color: #fff;
  opacity: 60%;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    opacity: 100%;
  }
  &:active {
    -ms-transform: translateY(2px);
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }
  &:disabled,
  &[disabled] {
    opacity: 20%;
    color: #666666;
    cursor: not-allowed;
    pointer-events: none;
  }
`;