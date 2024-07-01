import React, {useContext, useEffect, useState} from "react";
import TopBar from "../../components/HeaderBar/HeaderBar.ui";
import {
    Container,
    WorkInfoContainer,
    WorkProfile,
    WorkDetails,
    WorkStats,
    CommentSection,
    CommentAuthor,
    CommentHeader,
    CommentDate,
    CommentBody,
    Comment,
    ToggleCommentsButton,
    ReviewComment,
    CommentButtonContainer,
    CommentSectionTitle,
    CommentList,
    CommentAuthorInfo,
    AuthorImage,
    CoomentContainer,
    WorkInfo,
    WorkName,
    WorkType,
    WorkStatsItem,
    WorkStatsNumber,
    ButtonProfile,
    WorkPicture,
    DividerFull,
    FirstColumn,
    DetailTable,
    DetailRow,
    DetailInfo,
    DetailValue,
    SecondColumn,
    PointsContainer,
    PointValue,
    PointLabel,
    CarouselContainer,
    LaunchCommentButton,
    WorkInfoButton,
    ReviewPoints,
    ReviewNota,
    ReviewNotaText,
    DefaultProfileIcon,
    ReviewSelect,
    ReviewSelectOption,
    CommentTitleSection,
    LinkVideo,
} from "./WorkPage.styles";
import {format} from "date-fns";
import ReturnToPrevPage from "../../components/Navigate/ReturnToPrevPage.ui";
import ReviewModal from "../../components/Modals/Review/ReviewModal.ui";
import CommentModal from "../../components/Modals/CommentModal/CommentModal.ui";
import {useLocation, useParams} from "react-router-dom";
import {getAlbumById, getPerformanceById, getReviewByIdAlbum, getReviewByIdPerformance} from "../../api/ApiService";
import {UserContext} from "../../hooks/UserContext";
import defaultUserIcon from "../../assets/images/default-user.jfif";
import defaultAlbumImage from "../../assets/images/default-cover.png";

const WorkPage = () => {
    const [workData, setWorkData] = useState<any>(null);
    const [reviewData, setReviewData] = useState<any[]>([]);
    const [isModalOpen] = useState(false);
    const [expandedReviewIndex, setExpandedReviewIndex] = useState<number | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [currentCommentReviewId, setCurrentCommentReviewId] = useState<number | null>(null);
    const [sortOption, setSortOption] = useState("most_recent");
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const location = useLocation();

    const type = location.state.type;

    console.log({type});

    const handleReviewClick = () => {
        setIsReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    const handleCommentClick = (reviewId: number) => {
        setCurrentCommentReviewId(reviewId);
    };

    const handleCloseCommentModal = () => {
        setCurrentCommentReviewId(null);
    };

    const toggleComments = (index: number) => {
        setExpandedReviewIndex(expandedReviewIndex === index ? null : index);
    };

    const sortReviews = (reviews: any[], option: string) => {
        let sortedReviews;
        switch (option) {
            case "most_recent":
                sortedReviews = [...reviews].sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime());
                break;
            case "oldest":
                sortedReviews = [...reviews].sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
                break;
            case "highest_rating":
                sortedReviews = [...reviews].sort((a, b) => b.nota - a.nota);
                break;
            case "lowest_rating":
                sortedReviews = [...reviews].sort((a, b) => a.nota - b.nota);
                break;
            default:
                sortedReviews = reviews;
        }
        return sortedReviews;
    };

    useEffect(() => {
        if (id) {
            if (type === "Albuns") {
                getAlbumById(id)
                    .then(res => {
                        setWorkData(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                getReviewByIdAlbum(id)
                    .then(res => {
                        const sortedReviews = sortReviews(res.data, "most_recent");
                        setReviewData(sortedReviews);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                getPerformanceById(id)
                    .then(res => {
                        setWorkData(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                getReviewByIdPerformance(id)
                    .then(res => {
                        const sortedReviews = sortReviews(res.data, "most_recent");
                        setReviewData(sortedReviews);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }, [id]);

    useEffect(() => {
        const sortedReviews = sortReviews(reviewData, sortOption);
        setReviewData(sortedReviews);
    }, [sortOption]);

    if (!workData) return <div>Loading...</div>;

    const formatDateTime = (timestamp: any) => {
        const date = new Date(timestamp);
        return format(date, "dd/MM/yyyy - HH:mm");
    };

    const calculateAverageScore = () => {
        if (reviewData.length === 0) return "N/A";
        const totalScore = reviewData.reduce((acc: number, review: any) => acc + review.nota, 0);
        return (totalScore / reviewData.length).toFixed(2);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    return (
        <>
            <TopBar />
            <Container>
                <ReturnToPrevPage />
                <WorkInfoContainer>
                    <WorkProfile>
                        <WorkPicture src={workData.urlImagemCapa && workData.urlImagemCapa !== null ? "/" + workData.urlImagemCapa : defaultAlbumImage} alt="Profile" />
                        <WorkInfo>
                            <WorkName>{workData?.titulo}</WorkName>
                            <WorkType color={"#398ecc"}>{workData?.tipo || "Performance"}</WorkType>
                            <WorkStats>
                                <WorkStatsItem>
                                    <WorkStatsNumber>{reviewData?.length}</WorkStatsNumber>
                                    Reviews
                                </WorkStatsItem>
                            </WorkStats>
                            <WorkInfoButton>
                                <ButtonProfile onClick={handleReviewClick}>Fazer Review</ButtonProfile>
                            </WorkInfoButton>
                        </WorkInfo>
                    </WorkProfile>
                    <DividerFull />
                    <WorkDetails>
                        <FirstColumn>
                            <DetailTable>
                                <DetailRow>
                                    <DetailInfo>Autor: </DetailInfo>
                                    <DetailValue>{workData?.autores.map((autor: any) => autor.username).join(", ")}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailInfo>Ano de Lançamento: </DetailInfo>
                                    <DetailValue>{workData.dataLancamento}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailInfo>{workData?.tipo === "EP" ? "Quantidade de Faixas:" : "Link para Vídeo:"}</DetailInfo>
                                    {workData?.tipo === "EP" ? <DetailValue>{workData?.faixas.length}</DetailValue> : <LinkVideo href={workData?.url}>{workData?.url}</LinkVideo>}
                                </DetailRow>
                            </DetailTable>
                        </FirstColumn>
                    </WorkDetails>
                    <DividerFull />
                    <SecondColumn>
                        <PointsContainer>
                            <PointValue>{calculateAverageScore()}</PointValue>
                            <PointLabel>Pontos</PointLabel>
                        </PointsContainer>
                    </SecondColumn>
                </WorkInfoContainer>

                <CarouselContainer>
                    <CommentSection>
                        <CommentTitleSection>
                            <CommentSectionTitle>Reviews | {reviewData?.length} reviews realizadas</CommentSectionTitle>
                            <ReviewSelect value={sortOption} onChange={handleSortChange}>
                                <ReviewSelectOption value="most_recent">Mais recente</ReviewSelectOption>
                                <ReviewSelectOption value="oldest">Mais antigo</ReviewSelectOption>
                                <ReviewSelectOption value="highest_rating">Melhor avaliado</ReviewSelectOption>
                                <ReviewSelectOption value="lowest_rating">Pior avaliado</ReviewSelectOption>
                            </ReviewSelect>
                        </CommentTitleSection>
                        <CommentList>
                            {reviewData?.map((review: any, reviewIndex: any) => (
                                <CoomentContainer key={reviewIndex}>
                                    <Comment>
                                        <CommentHeader>
                                            {review.reviewer.caminhoImagem ? (
                                                <AuthorImage src={`../../assets/userImages/${review.reviewer.caminhoImagem}`} />
                                            ) : (
                                                <DefaultProfileIcon src={defaultUserIcon} />
                                            )}
                                            <CommentAuthorInfo>
                                                <CommentAuthor>{review.reviewer.nome}</CommentAuthor>
                                                <CommentDate>{`${formatDateTime(review.dataHora)}`}</CommentDate>
                                            </CommentAuthorInfo>
                                            <ReviewPoints>
                                                <ReviewNota>{review.nota}</ReviewNota>
                                                <ReviewNotaText>Pontos</ReviewNotaText>
                                            </ReviewPoints>
                                        </CommentHeader>
                                        <CommentBody>{review.texto}</CommentBody>
                                        <CommentButtonContainer>
                                            <LaunchCommentButton onClick={() => handleCommentClick(review.id)}>Fazer Comentário</LaunchCommentButton>
                                            {review.comentarios && review.comentarios.length > 0 && (
                                                <ToggleCommentsButton onClick={() => toggleComments(reviewIndex)}>
                                                    {expandedReviewIndex === reviewIndex ? "Esconder comentários" : "Ver comentários"}
                                                </ToggleCommentsButton>
                                            )}
                                            {currentCommentReviewId === review.id && (
                                                <CommentModal onClose={handleCloseCommentModal} reviewId={review.id} userId={user.usuario.id} />
                                            )}
                                        </CommentButtonContainer>
                                    </Comment>

                                    {expandedReviewIndex === reviewIndex &&
                                        review.comentarios.map((comment: any, commentIndex: any) => (
                                            <ReviewComment className="review-comment" key={commentIndex}>
                                                <CommentHeader>
                                                    <AuthorImage src={comment.reviewer?.imageUrl || defaultUserIcon} />
                                                    <CommentAuthorInfo>
                                                        <CommentAuthor>{comment.reviewer?.nome}</CommentAuthor>
                                                        <CommentDate>{`${formatDateTime(comment.dataHora)}`}</CommentDate>
                                                    </CommentAuthorInfo>
                                                </CommentHeader>

                                                <CommentBody>{comment.texto}</CommentBody>
                                            </ReviewComment>
                                        ))}
                                </CoomentContainer>
                            ))}
                        </CommentList>
                    </CommentSection>
                </CarouselContainer>
            </Container>
            {isReviewModalOpen && <ReviewModal albumId={Number(id)} userId={user?.usuario.id} onClose={handleCloseReviewModal} />}
            {isModalOpen && "Curtir"}
        </>
    );
};

export default WorkPage;
