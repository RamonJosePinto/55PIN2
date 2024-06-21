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

export const UserInfoContainer = styled.div`
    display: flex;
    padding: 40px 20px;
    background: #fff;
    border: 1px solid #eaeaed;
    border-radius: 5px;
    gap: 50px;
`;

export const UserProfile = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const UserDetails = styled.div`
    display: flex;
    gap: 50px;
`;

export const UserStats = styled.div`
    display: flex;
    gap: 15px;
    font-size: 14px;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const UserInfoButton = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
`;

export const UserName = styled.h2`
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

export const UserPicture = styled.img`
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

export const SecondColumn = styled(Column)``;

export const DetailTitle = styled.h6`
    color: #363843;
    font-size: 14px;
    font-weight: 600;
`;

export const ButtonProfile = styled(OutlineButton).attrs({})`
    font-weight: 600;
    padding: 0px 15px;
`;

export const UserStatsItem = styled.div`
    font-size: 14px;
    display: flex;
    gap: 3px;
    font-weight: 500;
`;

export const UserStatsNumber = styled.div`
    color: #29b56b;
    font-weight: bold;
`;

export const AlbumImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
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

export const UserType = styled.div.attrs((props: {color?: string}) => ({
    className: "user-page-user-type",
}))`
    color: ${props => props.color};
    font-size: 16px;
    font-weight: 600;
`;
