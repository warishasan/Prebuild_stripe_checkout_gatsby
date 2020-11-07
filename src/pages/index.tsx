import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { graphql, useStaticQuery } from "gatsby"
import NavBar from "../components/navBar"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Jumbotron from "react-bootstrap/Jumbotron"

export default function Home({ location }) {
  const staticData = useStaticQuery(graphql`
    query {
      allStripePrice {
        edges {
          node {
            product {
              name
              id
              object
              description
              images
            }
            unit_amount
            id
            currency
          }
        }
      }
    }
  `)

  let stripePromise
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
  }

  console.log(location)

  const redirectToCheckout = async price_id => {
    const stripe = await getStripe()
    const response = await fetch("/.netlify/functions/checkout", {
      method: "post",
      body: JSON.stringify({
        id: price_id,
        success_url: `${location.origin}/purchaseSuccess`,
        cancel_url: location.href,
      }),
    })
    const data = await response.json()

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    })
  }

  console.log(staticData.allStripePrice.edges)
  return (
    <div>
      <NavBar />
      <Jumbotron className="jumbotron">
        <h1>Stark Store - Buy today to live in the future</h1>
        <p>
          We deal with all sorts of robotics hardware and electronic components
          at wholesale prices...
        </p>
      </Jumbotron>

      <Container className="container">
        <Row className="row">
          {staticData.allStripePrice.edges.map((edge, i) => (
            <Col className="col" key={i} sm>
              <Card className="card">
                <Card.Img
                  className="cardImg"
                  variant="top"
                  src={edge.node.product.images[0]}
                />
                <Card.Body>
                  <Card.Title>{edge.node.product.name}</Card.Title>
                  <Card.Text>{edge.node.product.description}</Card.Text>
                  <Button
                    onClick={() => {
                      redirectToCheckout(edge.node.id)
                    }}
                    variant="primary"
                  >
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
