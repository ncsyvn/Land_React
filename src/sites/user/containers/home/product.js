import React from 'react'
import {
    Card, CardImg, CardText, CardBody, Button,
    CardTitle, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption
} from 'reactstrap'

import Product from '../../containers/product/product'


const NUM_NEW_PER_SLIDE = 4

class SlideNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            animating: false,
            newsCarouselIndex: 0,
        }
    }

    getNewSlides = () => {
        let numSlides = this.getNumberNewsSlides()
        let items = []
        for (let i = 0; i < numSlides; i++) {
            let news = []
            let startIndex = i * NUM_NEW_PER_SLIDE
            for (let j = 0; j < NUM_NEW_PER_SLIDE; j++) {
                if (startIndex + j < this.props.slideItems.length) {
                    news.push(this.props.slideItems[startIndex + j])
                }
                // if (startIndex + j < 8) {
                //      news.push(this.props.slideItems[startIndex + j])
                // }
            }
            items.push(
                <CarouselItem key={i + 1} onExiting={() => { }} onExited={() => { }}>
                    <Row>
                        {news.map((d, index) => {
                            return (
                                <div key={index}  className="one-new col-sm-6 col-md-3" >
                                <Product
                                   
                                    ProductThumbnail={d.ProductThumbnail}
                                    ProductPrice={d.ProductPrice}
                                    ProductName= {d.ProductName}
                                    ProductSummary={d.ProductSummary}
                                    ProductCreateDTime={d.ProductCreateDTime}
                                    data={d}
                                />
                                </div>
                      
                                // <div  key={index} className="one-new col-sm-6 col-md-3">
                                //     <Card>
                                //         <div className='card-img-wrapper'>
                                //             <CardImg className="img-thumbnail" top width="100%" src={resource_url+d.ProductThumbnail} alt="" />
                                //         </div>
                                //         <CardBody>
                                //             <span style={{fontWeight:600,fontSize:20}}>{d.ProductPrice.formatMoney()}đ</span>
                                //             <span style={{marginTop:3, float:'right',fontSize:14, color:'#8796ac'}}>{moment(d.CreateDtime).format("DD-MM-YYYY")}</span>
                                //             <CardTitle><a>{d.ProductName}</a></CardTitle>
                                //             <CardText>{d.ProductSummary}</CardText>
                                //             <div style={{ textAlign: 'right' }}>

                                //                 <Link to={{pathname:'/tin-dang',state:{product:d},}}  className='read-more'>Xem thêm</Link>

                                //             </div>
                                //         </CardBody>
                                //     </Card>
                                // </div>
                            )
                        })}
                    </Row>
                </CarouselItem>
            )
        }
        return items
    }

    getNumberNewsSlides = () => {
        let totalNews = this.props.slideItems.length
        return totalNews % NUM_NEW_PER_SLIDE ? parseInt(totalNews / NUM_NEW_PER_SLIDE) + 1 : totalNews / NUM_NEW_PER_SLIDE
    }

    nextNewSlide = () => {
        let numberSlides = this.getNumberNewsSlides()
        let newsCarouselIndex = this.state.newsCarouselIndex
        if ((newsCarouselIndex + 1) < numberSlides) {
            newsCarouselIndex++
            this.setState({ newsCarouselIndex })
        }
    }

    prevNewSlide = () => {
        let newsCarouselIndex = this.state.newsCarouselIndex
        if ((newsCarouselIndex - 1) >= 0) {
            newsCarouselIndex--
            this.setState({ newsCarouselIndex })
        }
    }


    onClickDetail(){
        this.props.history.push({
            pathname:"/tin-dang",
            state:{product:this.props.slideItems}
        })
    }

    render() {
        return (
            <div className='container product-news-sold'>
                 <div className="box-title-hot">
                     {this.props.dataTitle?"": 
                     <span className="icon-house"></span>
                     }
                    
                <h2><a className={this.props.dataClasses?this.props.dataClasses:""} style={{fontWeight:600}} >{this.props.dataTitle? this.props.dataTitle:"Tin cho thuê dành cho bạn"}</a></h2>
                </div>

                <Carousel activeIndex={this.state.newsCarouselIndex} next={this.nextNewSlide} previous={this.prevNewSlide}>
                    {this.getNewSlides()}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.prevNewSlide} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.nextNewSlide} />
                </Carousel>
            </div>
        )
    }

}
export default SlideNews