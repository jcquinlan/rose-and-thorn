import styled from 'styled-components';
import {devices} from './screens';

export const Paragraph = styled.p`
    margin-top: 5px;
    font-size: 14px;
    line-height: 26px;
    text-align: justify;
    text-justify: inter-word;

    @media ${devices.tablet} {
        font-size: 16px;
    }
`;
