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
