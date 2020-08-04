import React from 'react';
import styled from 'styled-components';
import {Paragraph} from '../components/styled';
import TextImage from '../images/text.jpg';
import TextImage2 from '../images/text2.jpg';
import RoseImage from '../images/rose_gif.gif';
import {devices} from '../components/styled/screens';

const jamesInsta = 'https://www.instagram.com/jcquinlan';
const danInsta = 'https://www.instagram.com/dhtorraca';

const CenterWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 50px 0;

    @media ${devices.tablet} {
        padding: 200px 0;
    }
`;

interface IBoxProps {
    readonly centered?: boolean;
    readonly maxWidth?: string;
    readonly padding?: string;
};

const Box = styled.div<IBoxProps>`
    display: flex;
    flex-direction: column;
    padding: 40px 65px;
    ${props => props.centered ? 'align-items: center;' : ''}
    ${props => props.maxWidth ? `max-width: ${props.maxWidth};` : ''}

    @media ${devices.tablet} {
        padding: ${props => props.padding || '20px;'}
        padding-top: 0px;
    }
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 300;
    margin-bottom: 0px;

    @media ${devices.tablet} {
        font-size: 50px;
    }
`;

const PhoneNumber = styled.a`
    color: #666;
    text-decoration: none;
    font-size: 24px;
    font-family: 'Lato', serif;
    font-weight: 900;
    padding: 20px 0;
`;

interface IHelpText {
    readonly margin?: string;
};

const HelpText = styled.span<IHelpText>`
    font-size: 10px;
    color: #999;
    margin-top: -10px;
    text-align: center;
    ${props => `margin: ${props.margin};` || ''}


    @media ${devices.tablet} {
        font-size: 14px;
    }
`;

const Image = styled.img`
    max-width: 270px;

    @media ${devices.tablet} {
        max-width: 350px;
    }
`;

const RoseImageWrapper = styled(Image)`
    max-width: 90px;
    margin-bottom: 30px;

    @media ${devices.tablet} {
        max-width: 120px;
    }
`;

const TextImageWrapper = styled(Image)`
    margin-top: 50px;
`;

const TextImageWrapper2 = styled(Image)`
    margin-top: 0px;
`;

const PhoneBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 0;
    align-items: center;

    @media ${devices.tablet} {
        padding: 10px 0;
    }
`;

export default () => {
    return (
        <CenterWrapper>
            <Box centered maxWidth="500px">
                <RoseImageWrapper src={RoseImage} />
                <Title>~ rose & thorn ~</Title>
                <Paragraph>
                    a single exchange between two strangers. text the number below with your rose (the best part of your day)
                    and your thorn (the worst part of your day). we'll share what you wrote with a stranger, whose own rose and thorn will
                    be shared with you.
                </Paragraph>

                <PhoneBox>
                    <PhoneNumber href="sms:+12564144677">+1 256 414 4677</PhoneNumber>
                    <HelpText>Your phone number is encrypted at rest, never logged, and fully deleted once used.</HelpText>
                </PhoneBox>

                <TextImageWrapper src={TextImage} />
                <TextImageWrapper2 src={TextImage2} />

                <HelpText margin="70px 0 0 0">
                    a lil collaboration between <a href={jamesInsta}>james quinlan</a> and <a href={danInsta}>daniel torraca</a>
                </HelpText>
            </Box>
        </CenterWrapper>
    )
};
