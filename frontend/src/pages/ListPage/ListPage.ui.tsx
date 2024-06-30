import React, {useEffect, useState} from "react";
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
import TopBar from "../../components/HeaderBar/HeaderBar.ui";
import ReturnToPrevPage from "../../components/Navigate/ReturnToPrevPage.ui";
import iconDownSrc from "../../assets/icons/icon-select-down.svg";
import iconUpSrc from "../../assets/icons/icon-select-up.svg";
import defaultAlbumImage from "../../assets/images/default-cover.png";
import mockAlbums from "../../mocks/list.mock.json";
import {getAllAlbum, getSearchAlbums} from "../../api/ApiService"; // Corrigido nome da função de API
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const ListPage = () => {
    const [albums, setAlbums] = useState<any[]>([]);
    const [genreOpen, setGenreOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("Mais recentes");
    const {searchTerm} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm) {
            if (searchTerm === "todos-albuns") {
                getAllAlbum()
                    .then((res: any) => setAlbums(res.data))
                    .catch((res: any) => console.log(res));
            }
            getSearchAlbums(searchTerm)
                .then((res: any) => setAlbums(res.data))
                .catch((err: any) => console.log(err));
        } else {
        }
    }, [searchTerm]);

    const toggleFilter = (filter: string) => {
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
    };

    const checkFilterDisplay = (filter: string) => {
        switch (filter) {
            case "genero":
                return genreOpen;
            case "anoLancamento":
                return yearOpen;
            default:
                break;
        }
    };

    const filtrosList = Object.keys(mockAlbums.filtros);
    const filtros: any = mockAlbums.filtros;

    const sortedAlbums = [...albums].sort((a, b) => {
        const dateA = new Date(a.dataLancamento);
        const dateB = new Date(b.dataLancamento);
        if (sortOrder === "Mais recentes") {
            return dateB.getTime() - dateA.getTime();
        } else {
            return dateA.getTime() - dateB.getTime();
        }
    });

    const filterMapper: any = {
        genero: "Gênero",
        anoLancamento: "Ano Lançamento",
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
    };

    return (
        <>
            <TopBar />
            <Container>
                <ReturnToPrevPage />
                <Content>
                    <FilterBlock>
                        <FilterList>
                            {filtrosList &&
                                filtrosList.map((filtro: any, index: number) => (
                                    <FilterItem key={index}>
                                        <FilterTitle onClick={() => toggleFilter(filtro)}>
                                            {filterMapper[filtro]}
                                            {checkFilterDisplay(filtro) ? <IconUp src={iconUpSrc} /> : <IconDown src={iconDownSrc} />}
                                        </FilterTitle>
                                        {checkFilterDisplay(filtro) && (
                                            <FilterItemList>
                                                {filtros[filtro].map((item: any, index: number) => (
                                                    <Item key={index}>
                                                        <ItemLabel filterFor={item}>{item}</ItemLabel>
                                                        <ItemInput id={item} />
                                                    </Item>
                                                ))}
                                            </FilterItemList>
                                        )}
                                    </FilterItem>
                                ))}
                        </FilterList>
                    </FilterBlock>
                    <ListBlock>
                        <ListHeader>
                            <ListTitle>{searchTerm === "todos-albuns" ? "Todos Albuns" : searchTerm}</ListTitle>
                            <ListSelect value={sortOrder} onChange={handleSortChange}>
                                <ListSelectOption value="Mais recentes">Mais recentes</ListSelectOption>
                                <ListSelectOption value="Mais antigos">Mais antigos</ListSelectOption>
                            </ListSelect>
                        </ListHeader>
                        <ListContent>
                            {sortedAlbums.map((album: any, index: number) => (
                                <ListItem key={index} onClick={() => navigate(`/obra/${album.id}`)}>
                                    <AlbumImage src={album.urlImagemCapa ? `/${album.urlImagemCapa}` : defaultAlbumImage} alt={album.titulo} />
                                    <AlbumTitle>{album.titulo}</AlbumTitle>
                                    <AlbumDate>{album.dataLancamento}</AlbumDate>
                                </ListItem>
                            ))}
                        </ListContent>
                    </ListBlock>
                </Content>
            </Container>
        </>
    );
};

export default ListPage;
