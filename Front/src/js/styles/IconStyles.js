import styled from "styled-components";
import { Edit, Delete } from "@styled-icons/fluentui-system-filled";
import { Cross } from "@styled-icons/entypo";
import { PlusOutline } from "@styled-icons/evaicons-outline";

export const AddIcon = styled(PlusOutline)`
  background-color: #00000000;
  opacity: 60%;
  transition: 0.1s;
  cursor: pointer;
  transform: scale(1.15);
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
    cursor: default;
    pointer-events: none;
  }
`;

export const EditIcon = styled(Edit)`
  background-color: #00000000;
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
    cursor: default;
    pointer-events: none;
  }
`;

export const DeleteIcon = styled(Delete)`
  background-color: #00000000;
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
    cursor: default;
    pointer-events: none;
  }
`;

export const CancelIcon = styled(Cross)`
  background-color: #00000000;
  opacity: 60%;
  transition: 0.1s;
  transform: scale(1.25);
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
    cursor: default;
    pointer-events: none;
  }
`;
