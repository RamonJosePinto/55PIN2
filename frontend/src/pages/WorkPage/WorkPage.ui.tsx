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
    LikeButton,
    LikeCount,
    Comment,
    ToggleCommentsButton,
    ReviewComment,
    CommentButtonContainer,
    CommentSectionTitle,
    CommentList,
    CommentAuthorInfo,
    AuthorImage,
    LikeIcon,
    LikeIconCointainer,
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
} from "./WorkPage.styles";
import likeIcon from "../../assets/icons/icon-like.svg";
import {format} from "date-fns";
import ReturnToPrevPage from "../../components/Navigate/ReturnToPrevPage.ui";
import ReviewModal from "../../components/Modals/Review/ReviewModal.ui";
import CommentModal from "../../components/Modals/CommentModal/CommentModal.ui";
import {useParams} from "react-router-dom";
import {
    getAlbumById,
    getReviewByIdAlbum,
    postComment,
} from "../../api/ApiService";
import {UserContext} from "../../hooks/UserContext";

const WorkPage: React.FC = () => {
    const [workData, setWorkData] = useState<any>(null);
    const [reviewData, setReviewData] = useState<any>([]);
    const [activeTab, setActiveTab] = useState("Albuns");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedReviewIndex, setExpandedReviewIndex] = useState<
        number | null
    >(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [currentCommentReviewId, setCurrentCommentReviewId] = useState<
        number | null
    >(null);
    const {id} = useParams();
    const {user} = useContext(UserContext);

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

    useEffect(() => {
        if (id) {
            getAlbumById(id)
                .then(res => {
                    setWorkData(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

            getReviewByIdAlbum(id)
                .then(res => {
                    setReviewData(res.data);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [id]);

    if (!workData) return <div>Loading...</div>;

    const handleNotificationClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const formatDateTime = (timestamp: any) => {
        const date = new Date(timestamp);
        return format(date, "dd/MM/yyyy - HH:mm");
    };

    const calculateAverageScore = () => {
        if (reviewData.length === 0) return "N/A";
        const totalScore = reviewData.reduce(
            (acc: number, review: any) => acc + review.nota,
            0
        );
        return totalScore / reviewData.length;
    };

    return (
        <>
            <TopBar />
            <Container>
                <ReturnToPrevPage url="/" />
                <WorkInfoContainer>
                    <WorkProfile>
                        <WorkPicture src={workData.url} alt="Profile" />
                        <WorkInfo>
                            <WorkName>{workData?.titulo}</WorkName>
                            <WorkType color={"#398ecc"}>
                                {workData?.tipo}
                            </WorkType>
                            <WorkStats>
                                <WorkStatsItem>
                                    <WorkStatsNumber>
                                        {reviewData?.length}
                                    </WorkStatsNumber>
                                    Reviews
                                </WorkStatsItem>
                                <WorkStatsItem>
                                    <WorkStatsNumber>
                                        {workData.likes}
                                    </WorkStatsNumber>{" "}
                                    Curtidas
                                </WorkStatsItem>
                            </WorkStats>
                            <WorkInfoButton>
                                <ButtonProfile
                                    onClick={handleNotificationClick}
                                >
                                    Curtir
                                </ButtonProfile>
                                <ButtonProfile onClick={handleReviewClick}>
                                    Fazer Review
                                </ButtonProfile>
                            </WorkInfoButton>
                        </WorkInfo>
                    </WorkProfile>
                    <DividerFull />
                    <WorkDetails>
                        <FirstColumn>
                            <DetailTable>
                                <DetailRow>
                                    <DetailInfo>Autor: </DetailInfo>
                                    <DetailValue>
                                        {workData?.autores[0]?.username}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailInfo>Ano de Lançamento: </DetailInfo>
                                    <DetailValue>
                                        {workData.dataLancamento}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailInfo>
                                        {workData?.tipo === "EP"
                                            ? "Quantidade de Faixas:"
                                            : "Participações especiais:"}
                                    </DetailInfo>
                                    <DetailValue>
                                        {workData?.tipo === "EP"
                                            ? workData?.faixas.length
                                            : "N/A"}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    <DetailInfo>
                                        Participações especiais:{" "}
                                    </DetailInfo>
                                    <DetailValue>{"N/A"}</DetailValue>
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
                        <CommentSectionTitle>
                            Reviews | {reviewData?.length} reviews realizadas
                        </CommentSectionTitle>
                        <CommentList>
                            {reviewData?.map(
                                (review: any, reviewIndex: any) => (
                                    <CoomentContainer key={reviewIndex}>
                                        <Comment>
                                            <CommentHeader>
                                                <AuthorImage
                                                    src={
                                                        review.reviewer
                                                            .imageUrl || ""
                                                    }
                                                />
                                                <CommentAuthorInfo>
                                                    <CommentAuthor>
                                                        {review.reviewer.nome}
                                                    </CommentAuthor>
                                                    <CommentDate>{`${formatDateTime(
                                                        review.dataHora
                                                    )}`}</CommentDate>
                                                </CommentAuthorInfo>
                                                <ReviewPoints>
                                                    <ReviewNota>
                                                        {review.nota}
                                                    </ReviewNota>
                                                    <ReviewNotaText>
                                                        Pontos
                                                    </ReviewNotaText>
                                                </ReviewPoints>
                                            </CommentHeader>
                                            <CommentBody>
                                                {review.texto}
                                            </CommentBody>
                                            <CommentButtonContainer>
                                                <LaunchCommentButton
                                                    onClick={() =>
                                                        handleCommentClick(
                                                            review.id
                                                        )
                                                    }
                                                >
                                                    Fazer Comentário
                                                </LaunchCommentButton>
                                                {review.comentarios &&
                                                    review.comentarios.length >
                                                        0 && (
                                                        <ToggleCommentsButton
                                                            onClick={() =>
                                                                toggleComments(
                                                                    reviewIndex
                                                                )
                                                            }
                                                        >
                                                            {expandedReviewIndex ===
                                                            reviewIndex
                                                                ? "Esconder comentários"
                                                                : "Ver comentários"}
                                                        </ToggleCommentsButton>
                                                    )}
                                                {currentCommentReviewId ===
                                                    review.id && (
                                                    <CommentModal
                                                        onClose={
                                                            handleCloseCommentModal
                                                        }
                                                        reviewId={review.id}
                                                        userId={user.id}
                                                    />
                                                )}
                                            </CommentButtonContainer>
                                        </Comment>

                                        {expandedReviewIndex === reviewIndex &&
                                            review.comentarios.map(
                                                (
                                                    comment: any,
                                                    commentIndex: any
                                                ) => (
                                                    <ReviewComment
                                                        className="review-comment"
                                                        key={commentIndex}
                                                    >
                                                        <CommentHeader>
                                                            <AuthorImage
                                                                src={
                                                                    comment
                                                                        .reviewer
                                                                        ?.imageUrl ||
                                                                    ""
                                                                }
                                                            />
                                                            <CommentAuthorInfo>
                                                                <CommentAuthor>
                                                                    {
                                                                        comment
                                                                            .reviewer
                                                                            ?.nome
                                                                    }
                                                                </CommentAuthor>
                                                                <CommentDate>{`${formatDateTime(
                                                                    comment.dataHora
                                                                )}`}</CommentDate>
                                                            </CommentAuthorInfo>
                                                        </CommentHeader>

                                                        <CommentBody>
                                                            {comment.texto}
                                                        </CommentBody>
                                                    </ReviewComment>
                                                )
                                            )}
                                    </CoomentContainer>
                                )
                            )}
                        </CommentList>
                    </CommentSection>
                </CarouselContainer>
            </Container>
            {isReviewModalOpen && (
                <ReviewModal
                    albumId={Number(id)}
                    userId={user?.id}
                    onClose={handleCloseReviewModal}
                />
            )}
            {isModalOpen && "Curtir"}
        </>
    );
};

export default WorkPage;
