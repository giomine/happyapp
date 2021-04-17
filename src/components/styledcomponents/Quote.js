import styled from 'styled-components';

export default styled.div`
    text-align: center;
    padding: 20px 15px;
    max-width: 650px;
    margin: 0 auto;
    line-height: 1.7;
    background: #d8d5d6;
    background: #e9e6e7;
    border-radius: 10px;
    color: #3a3a38;

    @media (max-width: 767px) {
        width: 60%;
    }
    @media (max-width: 300px) {
        font-size: 12px;
    }
`