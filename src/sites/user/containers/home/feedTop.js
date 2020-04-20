import React from 'react'
import productCategory from '../../../../data-access/product-category-provider'
import Project from '../project/project-top'
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import SlideProject from '../project/project-slide'
class CardTop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lstProject: []
        }
    }

    componentDidMount() {
        this.getAllProject()
    }

    getAllProject() {
        productCategory.getAll().then(res => {
            console.log(res.Data.filter(x => x.ParentProductCategoryId == "DUAN"))
            if (res.Code == 200) {
                this.setState({
                    lstProject: res.Data.filter(x => x.ParentProductCategoryId == "DUAN")
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        // const options = {
        //     // items:3,
        //     loop: false,
        //     margin: 0,
        //     autoplay: true,
        //     nav: false,
        //     dots: false,
        //     rewind: true,
        //     responsive: {
        //         576: {
        //             items: 2
        //         },
        //         992: {
        //             items: 3
        //         },
        //         1200: {
        //             items: 3
        //         }

        //     }
            
        // };
        return (
            <div className="card-top">
                <div className="container">
                    {/* <div className='row'>
                    <div className="box-title-hot"><span className="icon-house" /><h2><a className style={{fontWeight: 600}}>Những dự án mới nhất</a></h2></div>
                    </div> */}
                    <div className="row row-item-card ">
                        <SlideProject
                            slideItems = {this.state.lstProject}
                        />
                        {/* <OwlCarousel ref="slide" options={options}>
                            {this.state.lstProject.map((item, index) => {
                                return (
                                    <Project
                                        key={index}
                                        data={item}
                                    />
                                )

                            })}
                        </OwlCarousel> */}
                        {/* <div className="owl-nav owl-intro-page">
                            <button className="owl-prev" onClick={() => this.refs.slide.prev()}><NavigateBeforeIcon></NavigateBeforeIcon> </button>
                            <button className="owl-next" onClick={() => this.refs.slide.next()} ><NavigateNextIcon></NavigateNextIcon></button>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default CardTop