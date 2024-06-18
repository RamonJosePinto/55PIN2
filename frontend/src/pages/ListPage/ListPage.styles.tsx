// NewPage.styles.tsx

import styled from "styled-components";

export const Container = styled.div.attrs({
    className: "container",
})`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 40px 0;
    gap: 40px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fff; // Ajuste de acordo com UserPage.styles.tsx
    border-bottom: 1px solid #ddd; // Ajuste de acordo com UserPage.styles.tsx

    button {
        background: none;
        border: none;
        color: #007bff; // Ajuste de acordo com UserPage.styles.tsx
        cursor: pointer;
    }

    label {
        margin-right: 10px;
    }

    select {
        padding: 5px;
    }
`;

export const Content = styled.div`
    display: flex;
    gap: 20px;
`;

export const AlbumList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

export const AlbumItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
`;

export const AlbumImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;

export const AlbumTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
`;

export const AlbumDate = styled.div`
    font-size: 14px;
    color: #666;
`;

export const FilterList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const FilterItem = styled.div`
    border-bottom: 1px solid #eaeaed;
    color: #3b3643;
    font-size: 18px;
    cursor: pointer;
`;

export const ListBlock = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid #eaeaed;
    border-radius: 5px;
    padding: 50px;
    flex: 1;
    user-select: none;
`;
export const FilterBlock = styled.div`
    display: flex;
    background: #fff;
    border: 1px solid #eaeaed;
    border-radius: 5px;
    gap: 50px;
    height: fit-content;
    min-width: 250px;
`;

export const ListTitle = styled.div`
    font-size: 28px;
    color: #3b3643;
`;

export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
`;

export const ListContent = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 30px;
`;

export const ListItem = styled.div`
    width: 22%;
`;
export const FilterTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
`;
export const FilterItemList = styled.div`
    padding: 0px 25px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
export const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const ItemInput = styled.input.attrs({
    type: "radio",
})``;

export const ItemLabel = styled.label.attrs<{filterFor: string}>(props => ({
    htmlFor: props?.filterFor,
}))``;

export const ListSelect = styled.select`
    border: 2px solid #9747ff;
    border-radius: 5px;
    color: #3b3643;
    padding: 0px 15px;
`;

export const ListSelectOption = styled.option``;

export const IconDown = styled.img`
    width: 25px;
    height: 12px;
`;

export const IconUp = styled.img`
    width: 25px;
    height: 12px;
`;
