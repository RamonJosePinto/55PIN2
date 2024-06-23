import styled from "styled-components";
import OutlineButton from "../../components/Buttons/OutlineButton.ui";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.div.attrs({
    className: "container",
})`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 40px 0;
    gap: 40px;
`;

export const WorkInfoContainer = styled.div`
    display: flex;
    padding: 40px 20px;
    background: #fff;
    border: 1px solid #eaeaed;
    border-radius: 5px;
    gap: 50px;
`;

export const WorkProfile = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const WorkDetails = styled.div`
    display: flex;
    gap: 50px;
`;

export const WorkStats = styled.div`
    display: flex;
    gap: 15px;
    font-size: 14px;
`;

export const WorkInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const WorkInfoButton = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
`;

export const WorkName = styled.h2`
    font-weight: bold;
    margin: 0;
    color: #3b3643;
`;

export const NormalDivider = styled.div`
    height: 100%;
    width: 1px;
    border: 1px solid #eaeaed;
`;

export const DividerFull = styled(NormalDivider)`
    height: 120%;
    margin-top: -15px;
`;

export const AlbumsSection = styled.div`
    display: flex;
    overflow-x: auto;
    background: #fff;
    border: 1px solid #eaeaed;
    border-radius: 5px;
`;

export const Album = styled.div`
    margin: 10px;
`;

export const WorkPicture = styled.img`
    width: 140px;
    height: 140px;
`;

export const Column = styled.div``;

export const DetailTable = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const DetailValue = styled.div``;

export const DetailInfo = styled.div``;

export const DetailRow = styled.div`
    display: flex;
    font-size: 14px;
    gap: 15px;
    justify-content: space-between;
`;

export const FirstColumn = styled(Column)``;

export const SecondColumn = styled(Column)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DetailTitle = styled.h6`
    color: #363843;
    font-size: 14px;
    font-weight: 600;
`;

export const ButtonProfile = styled(OutlineButton)`
    font-weight: 600;
    padding: 0px 15px;
`;

export const WorkStatsItem = styled.div`
    font-size: 14px;
    display: flex;
    gap: 3px;
    font-weight: 500;
`;

export const WorkStatsNumber = styled.div`
    color: #29b56b;
    font-weight: bold;
`;

export const AlbumImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const CarouselContainer = styled.div`
    width: 100%;
    padding: 40px 80px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #eaeaed;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

export const AlbumTitle = styled.p`
    margin-top: 10px;
    color: #3b3643;
    text-align: start;
    margin-bottom: 5px;
`;

export const CarouselTitle = styled.h6`
    color: #3b3643;
    font-weight: 600;
    margin-bottom: 20px;
`;

export const CustomSlider = styled(Slider)`
    .slick-slide {
        padding: 0 35px;
    }

    .slick-list {
        margin: 0 -35px;
    }

    .slick-prev:before,
    .slick-next:before {
        color: black;
    }
`;

export const AlbumDate = styled.div`
    color: #3b3643;
    font-weight: 600;
    font-size: 14px;
`;

export const CarouselItem = styled.div``;

export const TabsContainer = styled.div`
    display: flex;
    gap: 20px;
    padding-bottom: 20px;
    justify-content: center;
`;

export const TabsList = styled.div`
    display: flex;
    border: 1px solid #eaeaed;
    border-radius: 50px;
`;

export const Tab = styled.div.attrs({})<{active: boolean}>`
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${props => (props.active ? "#EAEAED" : "transparent")};
    border-radius: 50px;
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #9747ff;
`;

export const ActiveTab = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #29b56b;
    margin-right: 10px;
`;

export const WorkType = styled.div.attrs((props: {color?: string}) => ({
    className: "Work-page-Work-type",
}))`
    color: ${props => props.color};
    font-size: 16px;
    font-weight: 600;
`;
export const PointsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    gap: 5px;
`;
export const PointValue = styled.div`
    color: #29b56b;
`;
export const PointLabel = styled.div``;

export const CommentSection = styled.div`
    margin-top: 20px;
`;

export const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const CommentSectionTitle = styled.h2`
    color: #3b3643;
    margin-bottom: 50px;
`;

export const Comment = styled.div`
    border-bottom: 1px solid #e0e0e0;
    padding: 40px;
    border: 1px solid #eaeaed;
    border-radius: 10px;
`;

export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
`;

export const AuthorImage = styled.img`
    width: 70px;
    height: 70px;
    margin-right: 15px;
`;

export const CommentAuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1px;
`;

export const CommentAuthor = styled.div`
    font-weight: bold;
    color: #3b3643;
`;

export const CommentDate = styled.div`
    font-size: 0.9em;
    color: #3b3643;
`;

export const CommentBody = styled.div`
    margin-top: 5px;
    color: #3b3643;
    line-break: anywhere;
`;

export const LikeButton = styled.button`
    background: none;
    border: none;
    color: #6200ea;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

export const LikeCount = styled.span`
    margin-left: 5px;
`;

export const ReviewComment = styled.div`
    border-bottom: 1px solid #e0e0e0;
    padding: 40px;
    border: 1px solid #eaeaed;
    border-radius: 10px;
`;

export const ToggleCommentsButton = styled(OutlineButton)``;

export const CommentButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

export const LikeIcon = styled.img`
    width: 30px;
    height: 30px;
`;

export const LikeIconCointainer = styled.div`
    border-radius: 50%;
    padding: 10px;
    border: 1px solid #9747ff;
    margin-left: 10px;
`;

export const CoomentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    > .review-comment {
        margin-left: 30px;
    }
`;

export const LaunchCommentButton = styled(OutlineButton).attrs({})``;

export const ReviewPoints = styled.div.attrs({})`
    display: flex;
    gap: 5px;
`;

export const ReviewNota = styled.div.attrs({})`
    color: rgb(41, 181, 107);
    font-size: 18px;
`;

export const ReviewNotaText = styled.div.attrs({})`
    font-size: 18px;
`;
