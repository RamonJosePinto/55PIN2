import axios from "axios";

const baseURL = axios.create({
    baseURL: "http://localhost:8080",
});

export const getUser = (id: number) => baseURL.get(`/users/${id}`);
export const getUserAlbuns = (id: number) => baseURL.get(`/users/${id}/albums`);
export const postUser = (userData: any) =>
    baseURL.post(`/users`, {
        nome: userData.fullName,
        email: userData.email,
        pais: userData.country,
        username: userData.username,
        senha: userData.password,
        biografia: userData.biography,
        tipo: userData.userType,
    });
export const postAlbum = (album: any) =>
    baseURL.post(`/albums`, {
        titulo: album.name,
        dataLancamento: album.releaseYear,
        status: "APROVADA", //TODO VER SOBRE ISSO,
        tipo: "EP", //TODO VER SOBRE
        autores: album.autores.map((autor: any) => ({
            id: autor.id,
        })),
        faixas: album.faixas.map((faixa: any) => ({
            titulo: faixa.titulo,
            numero: faixa.numero,
            segundos: faixa.segundos,
        })),
    });

export const getAllAlbum = () => baseURL.get("/albums");

export const postPerformance = (performance: any) =>
    baseURL.post(`/performances`, {
        titulo: performance.titulo,
        dataLancamento: performance.dataLancamento,
        status: performance.status,
        autores: performance.autores,
    });

export const putUser = (id: number, userData: any) =>
    baseURL.put(`/users/${id}`, {
        username: userData.username,
        nome: userData.nome,
        email: userData.email,
        pais: userData.pais,
        senha: userData.senha,
        biografia: userData.biografia,
        tipo: userData.tipo,
    });

export const getSearchAlbums = (title: string) =>
    baseURL.get(`/albums/search/${title}`);

export const getAlbumById = (id: string) => baseURL.get(`/albums/${id}`);

export const postReview = (review: any) =>
    baseURL.post(`/reviews`, {
        texto: review.texto,
        nota: review.nota,
        obra: {id: review.obra},
        reviewer: {id: review.reviewer},
    });

export const getReviewByIdAlbum = (albumId: string | undefined) =>
    baseURL.get(`/reviews/album/${albumId}`);

export const postComment = (comment: any) => {
    return baseURL.post("/comentarios", {
        texto: comment.texto,
        reviewer: {id: comment.usuario},
        review: {id: comment.review},
    });
};
