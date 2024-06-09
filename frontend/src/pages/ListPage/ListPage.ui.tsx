// NewPage.ui.tsx

import React, {useState} from "react";
import {
    Container,
    Header,
    Content,
    AlbumList,
    AlbumItem,
    AlbumImage,
    AlbumTitle,
    AlbumDate,
    FilterBlock,
    ListBlock,
    FilterList,
    FilterItem,
    ListTitle,
    ListHeader,
    ListSelect,
    ListSelectOption,
    ListContent,
    ListItem,
    FilterTitle,
    FilterItemList,
    Item,
    IconDown,
    IconUp,
    ItemInput,
    ItemLabel,
} from "./ListPage.styles";
import TopBar from "../../components/HeaderBar/HeaderBar.ui"; // Reutilizando a TopBar da UserPage
import ReturnToPrevPage from "../../components/Navigate/ReturnToPrevPage.ui";
import iconDownSrc from "../../assets/icons/icon-select-down.svg";
import iconUpSrc from "../../assets/icons/icon-select-up.svg";

import mockAlbums from "../../mocks/list.mock.json";

const ListPage = () => {
    const [genreOpen, setGenreOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);

    function toggleFilter(filter: string) {
        switch (filter) {
            case "genero":
                setGenreOpen(!genreOpen);
                break;
            case "anoLancamento":
                setYearOpen(!yearOpen);
                break;

            default:
                break;
        }
    }

    function checkFilterDisplay(filter: string) {
        switch (filter) {
            case "genero":
                return genreOpen;
            case "anoLancamento":
                return yearOpen;

            default:
                break;
        }
    }

    const filtrosList = Object.keys(mockAlbums.filtros);

    console.log(filtrosList);

    const filtros: any = mockAlbums.filtros;

    return (
        <>
            <TopBar />
            <Container>
                <ReturnToPrevPage url="/" />
                <Content>
                    <FilterBlock>
                        <FilterList>
                            {filtrosList &&
                                filtrosList.map(
                                    (filtro: any, index: number) => (
                                        <FilterItem>
                                            <FilterTitle
                                                onClick={() =>
                                                    toggleFilter(filtro)
                                                }
                                            >
                                                {filtro}
                                                {checkFilterDisplay(filtro) ? (
                                                    <IconUp src={iconUpSrc} />
                                                ) : (
                                                    <IconDown
                                                        src={iconDownSrc}
                                                    />
                                                )}
                                            </FilterTitle>
                                            {checkFilterDisplay(filtro) && (
                                                <FilterItemList>
                                                    {filtros[filtro].map(
                                                        (
                                                            item: any,
                                                            index: number
                                                        ) => (
                                                            <Item>
                                                                <ItemLabel
                                                                    filterFor={
                                                                        item
                                                                    }
                                                                >
                                                                    {item}
                                                                </ItemLabel>
                                                                <ItemInput
                                                                    id={item}
                                                                />
                                                            </Item>
                                                        )
                                                    )}
                                                </FilterItemList>
                                            )}
                                        </FilterItem>
                                    )
                                )}
                        </FilterList>
                    </FilterBlock>
                    <ListBlock>
                        <ListHeader>
                            <ListTitle>{mockAlbums.listName}</ListTitle>
                            <ListSelect>
                                <ListSelectOption>
                                    Mais recentes
                                </ListSelectOption>
                                <ListSelectOption>
                                    Mais curtidos
                                </ListSelectOption>
                            </ListSelect>
                        </ListHeader>
                        <ListContent>
                            {mockAlbums.list.map(
                                (album: any, index: number) => (
                                    <ListItem key={index}>
                                        <AlbumImage
                                            src={album.cover}
                                            alt={album.title}
                                        />
                                        <AlbumTitle>{album.title}</AlbumTitle>
                                        <AlbumDate>
                                            {album.releaseDate}
                                        </AlbumDate>
                                    </ListItem>
                                )
                            )}
                        </ListContent>
                    </ListBlock>
                </Content>
            </Container>
        </>
    );
};

export default ListPage;
