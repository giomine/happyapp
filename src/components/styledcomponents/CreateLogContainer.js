import styled from 'styled-components';

export default styled.div`
    border-radius: 10px;
    margin: 0 auto;
    ${'' /* background: ${props => (props.orange ? "rgba(295, 182, 60, 0.6)" : "rgba(53, 192, 214, 0.8)")}; */}
    ${'' /* background: ${props => (props.paleBlue ? "rgba(53, 192, 214, 0.35)" : "rgba(53, 192, 214, 0.5)")}; */}
    background: #c3d7d3;
    color: #3a3a38;
    padding: 10px 30px;

    @media(min-width: 770px) {
        max-width: 650px;
    }
`;