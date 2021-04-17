import styled from "styled-components";

export default styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
    color: #3a3a38;
    text-align: center;
    h1 {
        font-size: 50px;
    }
    h3 {
        margin-top: 4%;
        margin-bottom: 10%;
    }
    h5 {
        max-width: 650px;   
    }

    @media (max-width: 767px) {
        h1 {
            font-size: 40px;
        }
        h3 {
            font-size: 25px;
        }
        h5 {
            font-size: 18px;
        }
    }

    @media (max-width: 509px) {
        h1 {
            font-size: 35px;
        }
    }

    @media (max-width: 300px) {
        height: 60vh;
        h1 {
            margin-top: 20px;
            font-size: 40px;
        }
        h3 {
            margin-top: 30px;
            margin-bottom: 80px;
            font-size: 20px;
        }
        h5 {
            font-size: 15px;
        }
    }
`