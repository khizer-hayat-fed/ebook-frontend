import React from 'react'
import { Link } from 'react-router-dom'
import landingpageimge from "../Assets/Landing-page.jpg"
import roundedimg1 from "../Assets/roundedimg1.jpg"
import roundedimg2 from "../Assets/roundedimg2.jpg"
import roundedimg3 from "../Assets/roundedimg3.jpg"
import FEATURETTES1 from "../Assets/FEATURETTES-Img1.jpeg"
import FEATURETTES2 from "../Assets/FEATURETTES-Img2.jpeg"
import FEATURETTES3 from "../Assets/FEATURETTES-Img3.jpeg"

const Home = () => {
  const firstPartData = [
    {
      img: roundedimg1, 
      title: 'Novels', 
      description: 'To Kill a Mockingbird by Harper Lee is a classic novel set in the American South during the 1930s. It follows young Scout Finch as her father, lawyer Atticus Finch, defends a Black man falsely accused of raping a white woman. The story addresses themes of racial injustice, moral growth, and empathy.' 
    },
    {
      img: roundedimg2, 
      title: 'Fiction', 
      description: "Harry Potter and the Deathly Hallows by J.K. Rowling is the final book in the Harry Potter series. It follows Harry, Hermione, and Ron as they embark on a dangerous quest to destroy Voldemort's Horcruxes, leading to a climactic battle at Hogwarts. The story explores themes of sacrifice, loyalty, and the triumph of good over evil." 
    },
    {
      img: roundedimg3, 
      title: 'Adventure', 
      description: 'Rich Dad Poor Dad by Robert Kiyosaki highlights the difference between two mindsets toward money: one focused on traditional employment ("poor dad") and the other on investing and financial independence ("rich dad"). The book encourages building wealth through smart investing and financial education.' 
    },
  ]

  return (
    <div>
      <div className='image-container'>
        <img alt='' className='mb-4' src={landingpageimge} />
      </div>
      <main>
        <div className="container marketing mt-5" >
          <div className="row" >
            {firstPartData?.map((item, index)=>(
            <div key={index} className="col-lg-4 " >

              <img src={item.img} className="rounded-carousel" alt="" />

              <h2 className="fw-normal">{item.title}</h2>
              <p>{item.description}</p>
            </div>
            ))}
          </div>{/* /.row */}



          {/* START THE FEATURETTES */}

          <hr className="featurette-divider" />

          <div className="row featurette" >
            <div className="col-md-7 col-sm-12 FEATURETTES-css my-sm-4" style={{ marginTop: '20px' }}>
              <h2 className="featurette-heading fw-normal lh-1">Academic Books <span className="text-body-secondary"><br /><i>Fuel your studies</i></span></h2>
              <p className="lead">Find textbooks, research papers, and study guides across various subjects to assist with your academic pursuits.</p>
                            <Link to={'/shops'}><button type="button" class="btn btn-info btn-rounded">View Our Shops</button></Link>
            </div>

            <div className="col-md-5">
              <img src={FEATURETTES1} className="img-fluid FEATURETTES-img" alt="" />
            </div>
          </div>
          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-5">
              <img src={FEATURETTES2} className="img-fluid FEATURETTES-img" alt="" />
            </div>
            <div className="col-md-7 col-sm-12 FEATURETTES-css my-sm-4" style={{ marginTop: '20px' }}>
              <h2 className="featurette-heading fw-normal lh-1">Bestsellers <span className="text-body-secondary"><br /><i>Must-reads for everyone</i></span></h2>
              <p className="lead">Check out the hottest bestsellers that everyone is talking about and stay updated with the latest trends.</p>
                            <Link to={'/shops'}><button type="button" class="btn btn-info btn-rounded">View Our Shops</button></Link>
            </div>
          </div>
          <hr className="featurette-divider" />

          <div className="row featurette" >
            <div className="col-md-7 col-sm-12 FEATURETTES-css my-sm-4" style={{ marginTop: '20px' }}>
              <h2 className="featurette-heading fw-normal lh-1">Fiction <span className="text-body-secondary"><br/> <i>Dive into the world of imagination</i></span></h2>
              <p className="lead"> Discover an extensive collection of captivating stories, from timeless classics to contemporary novels.</p>
              <Link to={'/shops'}><button type="button" class="btn btn-info btn-rounded">View Our Shops</button></Link>
            </div>

            <div className="col-md-5">
              <img src={FEATURETTES3} className="img-fluid FEATURETTES-img" alt="" />
            </div>
          </div>
          <hr className="featurette-divider" />

        </div>
      </main>

    </div>
  )
}

export default Home
