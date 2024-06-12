import React, {useEffect, useState} from "react";
import TopBar from "../../components/HeaderBar/HeaderBar.ui";
import {
    Container,
    WorkInfoContainer,
    WorkProfile,
    WorkDetails,
    WorkStats,
    AlbumsSection,
    Album,
    WorkInfo,
    WorkName,
    WorkInfoButton,
    WorkPicture,
    ButtonProfile,
    WorkType,
    WorkStatsItem,
    WorkStatsNumber,
    FirstColumn,
    SecondColumn,
    DetailTitle,
    DividerFull,
    NormalDivider,
    DetailTable,
    DetailRow,
    DetailInfo,
    DetailValue,
    AlbumImage,
    CarouselContainer,
    CustomSlider,
    AlbumTitle,
    CarouselTitle,
    AlbumDate,
    CarouselItem,
    TabsContainer,
    Tab,
    ActiveTab,
    TabsList,
    PointsContainer,
    PointValue,
    PointLabel,
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
} from "./WorkPage.styles";
import mockData from "../../mocks/work.mock.json";
import likeIcon from "../../assets/icons/icon-like.svg";
import reviews from "../../mocks/comments.mock.json";

import ReturnToPrevPage from "../../components/Navigate/ReturnToPrevPage.ui";
import EditFormModal from "../../components/Modals/UserEditForm/EditFormModal.ui";
import ReviewModal from "../../components/Modals/Review/ReviewModal.ui";

const WorkPage: React.FC = () => {
    const [WorkData, setWorkData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("Albuns");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedReviewIndex, setExpandedReviewIndex] = useState<
        number | null
    >(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const handleReviewClick = () => {
        setIsReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    const toggleComments = (index: number) => {
        setExpandedReviewIndex(expandedReviewIndex === index ? null : index);
    };

    useEffect(() => {
        setWorkData(mockData);
    }, []);

    if (!WorkData) return <div>Loading...</div>;

    const handleNotificationClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <TopBar />
            <Container>
                <ReturnToPrevPage url="/" />
                <WorkInfoContainer>
                    <WorkProfile>
                        <WorkPicture src={WorkData.url} alt="Profile" />
                        <WorkInfo>
                            <WorkName>{WorkData?.title}</WorkName>
                            <WorkType color={"#398ecc"}>
                                {WorkData?.workType}
                            </WorkType>
                            <WorkStats>
                                <WorkStatsItem>
                                    <WorkStatsNumber>
                                        {WorkData.reviews}
                                    </WorkStatsNumber>
                                    Reviews
                                </WorkStatsItem>
                                <WorkStatsItem>
                                    <WorkStatsNumber>
                                        {WorkData.likes}
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
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>Autor: </DetailInfo>
                                    <DetailValue>{mockData.autor}</DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>Ano de Lançamento: </DetailInfo>
                                    <DetailValue>
                                        {mockData.ano_de_lancamento}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>
                                        Participações especiais:{" "}
                                    </DetailInfo>
                                    <DetailValue>
                                        {mockData.participacoes_especiais}
                                    </DetailValue>
                                </DetailRow>
                                <DetailRow>
                                    {/* TODO: fazer vir isso do mock */}
                                    <DetailInfo>
                                        Participações especiais:{" "}
                                    </DetailInfo>
                                    <DetailValue>
                                        {mockData.participacoes_especiais}
                                    </DetailValue>
                                </DetailRow>
                            </DetailTable>
                        </FirstColumn>
                    </WorkDetails>
                    <DividerFull />
                    <SecondColumn>
                        <PointsContainer>
                            <PointValue>{mockData.pontos}</PointValue>
                            <PointLabel>Pontos</PointLabel>
                        </PointsContainer>
                    </SecondColumn>
                </WorkInfoContainer>

                <CarouselContainer>
                    <CommentSection>
                        <CommentSectionTitle>
                            Reviews | {reviews.length} reviews realizadas
                        </CommentSectionTitle>
                        <CommentList>
                            {reviews.map((review, reviewIndex) => (
                                <CoomentContainer key={reviewIndex}>
                                    <Comment>
                                        <CommentHeader>
                                            <AuthorImage
                                                src={review.imageUrl}
                                            />
                                            <CommentAuthorInfo>
                                                <CommentAuthor>
                                                    {review.author}
                                                </CommentAuthor>
                                                <CommentDate>{`${review.time} - ${review.date}`}</CommentDate>
                                            </CommentAuthorInfo>
                                            <LikeButton>
                                                <LikeCount>
                                                    {review.likes}
                                                </LikeCount>
                                                <LikeIconCointainer>
                                                    <LikeIcon src={likeIcon} />
                                                </LikeIconCointainer>
                                            </LikeButton>
                                        </CommentHeader>
                                        <CommentBody>{review.body}</CommentBody>
                                        <CommentButtonContainer>
                                            {review.comments &&
                                                review.comments.length > 0 && (
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
                                        </CommentButtonContainer>
                                    </Comment>

                                    {expandedReviewIndex === reviewIndex &&
                                        review?.comments.map(
                                            (comment, commentIndex) => (
                                                <ReviewComment
                                                    className="review-comment"
                                                    key={commentIndex}
                                                >
                                                    <CommentHeader>
                                                        <AuthorImage
                                                            src={
                                                                comment.imageUrl
                                                            }
                                                        />
                                                        <CommentAuthorInfo>
                                                            <CommentAuthor>
                                                                {comment.author}
                                                            </CommentAuthor>
                                                            <CommentDate>{`${comment.time} - ${comment.date}`}</CommentDate>
                                                        </CommentAuthorInfo>
                                                        <LikeButton>
                                                            <LikeCount>
                                                                {comment.likes}
                                                            </LikeCount>
                                                            <LikeIconCointainer>
                                                                <LikeIcon
                                                                    src={
                                                                        likeIcon
                                                                    }
                                                                />
                                                            </LikeIconCointainer>
                                                        </LikeButton>
                                                    </CommentHeader>

                                                    <CommentBody>
                                                        {comment.body}
                                                    </CommentBody>
                                                </ReviewComment>
                                            )
                                        )}
                                </CoomentContainer>
                            ))}
                        </CommentList>
                    </CommentSection>
                </CarouselContainer>
            </Container>
            {isReviewModalOpen && (
                <ReviewModal onClose={handleCloseReviewModal} />
            )}
            {isModalOpen && (
                <EditFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default WorkPage;
