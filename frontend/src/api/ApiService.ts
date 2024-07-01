import axios from "axios";

const baseURL = axios.create({
    baseURL: "http://127.0.0.1:8080",
});

baseURL.interceptors.request.use(
    config => {
        // Pega o usuário do localStorage (se existir)
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        // Adiciona o SessionId no cabeçalho, se disponível e se não for a requisição de login
        if (user && user.id && !config.url?.includes("/login")) {
            config.headers["SessionId"] = user.id;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

<<<<<<< HEAD
export const getUser = (id: number) => baseURL.get(`/users/${id}`);
=======
export const getUser = (id: number) =>
    baseURL.get(`/users/${id}`, {
        headers: {
            Authorization: "id",
            Teste: "teste",
        },
    });

>>>>>>> a1522b85491483baf084c6e9e35158d2bb9ac0bd
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
        status: "APROVADA",
        tipo: "EP", //TODO VER SOBRE
        genero: album.genero,
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
        url: performance.url,
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

export const getSearchAlbums = (title: string) => baseURL.get(`/albums/search/${title}`);

export const getAlbumById = (id: string) => baseURL.get(`/albums/${id}`);

export const getPerformanceById = (id: string) => baseURL.get(`/performances/${id}`);

export const postPerformanceReview = (review: any) =>
    baseURL.post(`/reviews/performance`, {
        texto: review.texto,
        nota: review.nota,
        performance: {id: review.performance},
        reviewer: {id: review.reviewer},
    });

export const postAlbumReview = (review: any) =>
    baseURL.post(`/reviews/album`, {
        texto: review.texto,
        nota: review.nota,
        obra: {id: review.obra},
        reviewer: {id: review.reviewer},
    });

export const getReviewByIdAlbum = (albumId: string | undefined) => baseURL.get(`/reviews/album/${albumId}`);
export const getReviewByIdPerformance = (performanceId: string | undefined) => baseURL.get(`/reviews/performance/${performanceId}`);

export const postComment = (comment: any) => {
    return baseURL.post("/comentarios", {
        texto: comment.texto,
        reviewer: {id: comment.usuario},
        review: {id: comment.review},
    });
};

export const validateAuthors = (nomes: string[]) => {
    const params = new URLSearchParams();
    nomes.forEach(nome => params.append("nomes", nome));
    return baseURL.get(`/users/validateAuthors`, {params});
};

export const login = (username: string, password: string) => {
    return baseURL.post(
        `/users/login`,
        {},
        {
            headers: {
                Username: username,
                Password: password,
            },
        }
    );
};

export const logout = (id: number) => baseURL.post(`/users/${id}/logout`);
<<<<<<< HEAD
=======

export const getAllGenders = () => baseURL.get("/genders");

export const getUserPerformances = (userId: number) => baseURL.get(`/users/${userId}/perfomances`);
>>>>>>> a1522b85491483baf084c6e9e35158d2bb9ac0bd
