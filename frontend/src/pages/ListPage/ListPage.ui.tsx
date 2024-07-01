import React, {useEffect, useState} from "react";
import {
    Container,
    Content,
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
    AlbumImage,
    AlbumTitle,
    AlbumDate,
    FilterBlock,
} from "./ListPage.styles";
import TopBar from "../../components/HeaderBar/HeaderBar.ui";
import ReturnToPrevPage from "../../components/Navigate/ReturnToPrevPage.ui";
import iconDownSrc from "../../assets/icons/icon-select-down.svg";
import iconUpSrc from "../../assets/icons/icon-select-up.svg";
import defaultAlbumImage from "../../assets/images/default-cover.png";
import {getAllAlbum, getSearchAlbums, getAllGenders} from "../../api/ApiService";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const ListPage = () => {
    const [albums, setAlbums] = useState<any[]>([]);
    const [originalAlbums, setOriginalAlbums] = useState<any[]>([]);
    const [genres, setGenres] = useState<any[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [genreOpen, setGenreOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("Mais recentes");
    const {searchTerm} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchGenres();
        setSelectedGenre(null);
        if (searchTerm) {
            if (searchTerm === "todos-albuns") {
                getAllAlbum()
                    .then((res: any) => {
                        setAlbums(res.data);
                        setOriginalAlbums(res.data);
                    })
                    .catch((res: any) => console.log(res));
            }
            getSearchAlbums(searchTerm)
                .then((res: any) => {
                    setAlbums(res.data);
                    setOriginalAlbums(res.data);
                })
                .catch((err: any) => console.log(err));
        } else {
            getAllAlbum()
                .then((res: any) => {
                    setAlbums(res.data);
                    setOriginalAlbums(res.data);
                })
                .catch((err: any) => console.log(err));
        }
    }, [searchTerm]);

    const fetchGenres = async () => {
        const response = await getAllGenders();
        setGenres(response.data);
    };

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

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);

        if (genre) {
            const filteredAlbums = originalAlbums.filter(album => album.genero.some((g: any) => g.nome === genre));
            setAlbums(filteredAlbums);
        } else {
            setAlbums(originalAlbums);
        }
    };

    const sortedAlbums = [...albums].sort((a, b) => {
        const dateA = new Date(a.dataLancamento);
        const dateB = new Date(b.dataLancamento);
        if (sortOrder === "Mais recentes") {
            return dateB.getTime() - dateA.getTime();
        } else {
            return dateA.getTime() - dateB.getTime();
        }
    });

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
                            <FilterItem>
                                <FilterTitle onClick={() => toggleFilter("genero")}>
                                    Gênero
                                    {checkFilterDisplay("genero") ? <IconUp src={iconUpSrc} /> : <IconDown src={iconDownSrc} />}
                                </FilterTitle>
                                {checkFilterDisplay("genero") && (
                                    <FilterItemList>
                                        {genres.map((genre: any, index: number) => (
                                            <Item key={index}>
                                                <ItemLabel filterFor={genre.nome}>{genre.nome}</ItemLabel>
                                                <ItemInput
                                                    id={genre.nome}
                                                    type="radio"
                                                    name="genre"
                                                    checked={selectedGenre === genre.nome}
                                                    onChange={() => handleGenreChange(genre.nome)}
                                                />
                                            </Item>
                                        ))}
                                    </FilterItemList>
                                )}
                            </FilterItem>
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
