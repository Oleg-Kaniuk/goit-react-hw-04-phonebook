import styled from "styled-components";

export const Contact = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    padding: 10px;
    border-bottom: 1px solid skyblue;
`;

export const ButtonRemove = styled.button`
    height: 30px;
    width: 100px;
    padding: 4px;
    border: 1px solid skyblue;
    border-radius: 10px;
    font-weight: 500px;
    background-color: skyblue;
    &:hover {
        background-color: lightblue;
    }
`;