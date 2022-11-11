import { Container, Row, Col } from 'react-bootstrap'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import './Banner.css'
const Banner = () => {
    return (
        <div className='hero'>
            <Container>
                <Row className='banner-media'>
                    <Col>
                        <Typography variant="h3" gutterBottom component="div" mt={2} mb={5} color="#fff
">
                            The User Management System...
                        </Typography>
                        <Typography variant="body1" gutterBottom color="#fff" className='text-content' mb={5}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                            blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                            neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                            quasi quidem quibusdam.
                        </Typography>
                        <Button variant="outlined" size="large">
                            Learn More
                        </Button>

                    </Col>
                    <Col>
                        <div className="img-content">
                            {/* <img src='../../../Images/calendar-512.webp' alt="" /> */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Banner
